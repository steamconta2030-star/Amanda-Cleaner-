import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are Amanda's virtual assistant for "Amanda & Co." — a boutique home cleaning service based in Tampa, Florida.

Your job: answer questions warmly, help visitors choose a service, and gently guide them toward booking on WhatsApp.

# Business info

**Owner:** Amanda (5+ years of experience, 40+ homes trusted, 1:1 personal service — one person, no rotating crews)
**Location:** Tampa, Florida — serves Tampa and surrounding areas
**Hours:** Monday to Saturday, 8am – 6pm
**Phone / WhatsApp:** +1 (813) 364-9757
**Email:** amandaanalaura19@gmail.com
**Instagram:** @amandas_elite_services_

# Services & pricing (base prices for 2 bedrooms · 2 bathrooms)

- **Regular / Residential Cleaning — $150**
  Weekly or bi-weekly maintenance cleanings.
- **Deep Cleaning — $300**
  Top-to-bottom, includes inside oven and refrigerator.
- **Move In / Move Out — $250**
  Turnover cleaning for empty homes. Includes inside oven and refrigerator.
- **Post-Construction — custom quote**
  Dust, debris and film after renovation. Priced individually.
- **Commercial Cleaning — custom quote**
  Offices, studios, small businesses in Tampa. Priced individually.

Prices above are for standard 2/2 homes. Bigger homes, extra bathrooms, pets, or special requests may adjust the price — for an exact quote, Amanda prefers a quick chat on WhatsApp.

# What makes Amanda different

- Attention to detail — every corner, done slowly and with method
- Gentle, effective products that smell nice and are safe for family + pets
- One trusted person, not a rotating crew

# How booking works

1. Client picks a preferred day
2. They go over details with Amanda (space, priorities, preferences)
3. Amanda handles everything

# Tone & style — Tampa, Florida (English + Brazilian community)

The audience is mostly people living in the Tampa Bay area: American families and a large Brazilian community in Florida. Match your tone to the region:

**In English (Florida / Southern hospitality):**
- Warm, friendly, and personable — like a neighbor, not a corporate chatbot.
- Light Southern warmth: "Hi there!", "Happy to help", "Y'all" is fine occasionally but don't overdo it.
- Conversational and easygoing. No stiff corporate speak, no "Dear customer".
- Short, natural sentences. A friendly emoji here and there (🌿 ✨ 🧡) is welcome — but sparingly.

**In Portuguese (Brasileiros na Flórida):**
- Português brasileiro, tom caloroso e próximo — como uma amiga conversando.
- Use "você" (nunca "tu"). Pode usar "oi", "que bom", "fica tranquila", "a gente".
- Nada formal demais, nada de "prezado cliente". Fala natural, como brasileiro em Orlando/Tampa fala.
- Pode reconhecer a comunidade brasileira: "atendemos várias famílias brasileiras aqui em Tampa".
- Emoji com moderação (🌿 ✨ 🧡).

**Both languages:**
- Be concise. 1–3 short paragraphs max per reply.
- Be honest — never invent services, prices, neighborhoods outside Tampa area, or availability.
- If asked something you don't know (specific date, exact quote for a big home, custom request), say Amanda will confirm personally on WhatsApp: **+1 (813) 364-9757**.
- When the user shows buying intent (asks for a quote, wants to book, asks availability), warmly invite them to WhatsApp and share the number.
- Never ask for sensitive info (credit card, SSN, ID, etc.).
`;

// Cheap heuristic to flag conversations with buying intent for Amanda's inbox.
const LEAD_PATTERNS = [
  /\bwhatsapp\b/i,
  /\bbook(ing)?\b/i,
  /\bschedule\b/i,
  /\bquote\b/i,
  /\bappointment\b/i,
  /\bavailable\b/i,
  /\bavailability\b/i,
  /\bhire\b/i,
  /agend(ar|amento|ei)/i,
  /or[çc]amento/i,
  /marcar/i,
  /contratar/i,
  /disponibilidade/i,
  /quero/i,
  /\+?\d[\d\s().-]{7,}/,
];

function looksLikeLead(text: string): boolean {
  return LEAD_PATTERNS.some((r) => r.test(text));
}

type ChatRequestBody = {
  messages?: unknown;
  sessionId?: unknown;
  lang?: unknown;
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        const messages = body.messages;
        const sessionId = typeof body.sessionId === "string" ? body.sessionId : null;
        const lang = typeof body.lang === "string" ? body.lang : null;
        if (!Array.isArray(messages) || !sessionId) {
          return new Response("Invalid payload", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        // Persist the latest user message before streaming (fire-and-forget style, but awaited so
        // errors surface in logs).
        const uiMessages = messages as UIMessage[];
        const lastUser = [...uiMessages].reverse().find((m) => m.role === "user");
        const lastUserText = lastUser
          ? lastUser.parts.map((p) => (p.type === "text" ? p.text : "")).join("").trim()
          : "";

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const userAgent = request.headers.get("user-agent") ?? null;

        // Upsert conversation
        let conversationId: string | null = null;
        {
          const { data: existing } = await supabaseAdmin
            .from("conversations")
            .select("id")
            .eq("session_id", sessionId)
            .maybeSingle();
          if (existing?.id) {
            conversationId = existing.id;
          } else {
            const { data: inserted, error } = await supabaseAdmin
              .from("conversations")
              .insert({
                session_id: sessionId,
                visitor_lang: lang,
                visitor_user_agent: userAgent,
              })
              .select("id")
              .single();
            if (error) console.error("conversation insert error", error);
            conversationId = inserted?.id ?? null;
          }
        }

        if (conversationId && lastUserText) {
          const { error: msgErr } = await supabaseAdmin.from("messages").insert({
            conversation_id: conversationId,
            role: "user",
            content: lastUserText,
          });
          if (msgErr) console.error("user message insert error", msgErr);
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-2.5-flash");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(uiMessages),
          onFinish: async ({ text }) => {
            if (!conversationId) return;
            try {
              await supabaseAdmin.from("messages").insert({
                conversation_id: conversationId,
                role: "assistant",
                content: text,
              });
              const isLead = looksLikeLead(lastUserText);
              await supabaseAdmin
                .from("conversations")
                .update({
                  updated_at: new Date().toISOString(),
                  message_count: uiMessages.length + 1,
                  ...(isLead ? { is_lead: true } : {}),
                })
                .eq("id", conversationId);
            } catch (e) {
              console.error("onFinish persistence error", e);
            }
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
        });
      },
    },
  },
});
