import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, stepCountIs, tool, type UIMessage } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are Amanda's virtual concierge for "Amanda & Co." — a boutique home cleaning service in Tampa, Florida.

Your job is to warmly QUALIFY visitors and hand a well-briefed lead to Amanda on WhatsApp. You have two tools you MUST use when appropriate:

1. \`estimate_quote\` — computes a real price estimate from service type + bedrooms + bathrooms.
2. \`save_lead_details\` — persists the visitor's contact info and job details so Amanda has everything before replying.

# Qualification playbook (follow this order, one topic at a time — do not dump a form on the user)

1. Greet warmly and ask which type of cleaning they need (regular, deep, move in/out, post-construction, commercial).
2. Ask how many bedrooms and bathrooms.
3. Ask for the neighborhood / city (Tampa area) and any pets or special needs.
4. Call \`estimate_quote\` and share the number naturally ("For a 3 bed / 2 bath deep cleaning, we're looking at around $350"). Say clearly it's an estimate — final price after Amanda confirms details.
5. If the visitor wants to book, ask for name, phone (WhatsApp), address, and preferred day/time — ONE at a time, conversationally.
6. As soon as you have at least name + phone (or WhatsApp), call \`save_lead_details\` with everything you know so Amanda has it. You can call it again later to update.
7. Then invite them to continue on WhatsApp: **+1 (813) 364-9757**.

# Business info (confirmed by Amanda — never invent anything not listed)

**Owner:** Amanda — one trusted person, no rotating crews
**Serves:** Tampa and surrounding areas (Westchase, Carrollwood, Citrus Park, Town 'N' Country, Odessa, Lutz, Brandon…)
**Hours:** Monday–Saturday, 8am–6pm
**Phone / WhatsApp:** +1 (813) 364-9757
**Email:** amandaanalaura19@gmail.com
**Instagram:** @amandas_elite_services_
**Licensed & insured · 48h re-clean guarantee**

# Services

- Residential (regular) cleaning
- Deep cleaning (includes inside oven and refrigerator)
- Move in / Move out cleaning (includes inside oven and refrigerator)
- Post-construction / Post-renovation cleaning — custom quote only
- Commercial cleaning — custom quote only

# Pricing (confirmed base, USD — for a 2 bedroom · 2 bathroom home)

- Regular / Residential — from $150
- Deep cleaning — $300
- Move in / Move out — $250
- Post-construction / commercial — custom quote (do NOT invent a number; route to WhatsApp)

Extras / adjustments — apply through the \`estimate_quote\` tool:
- Each extra bedroom: +$25
- Each extra bathroom: +$25
- Homes with pets: +$20
- Very large homes (>3000 sqft): custom quote
- These are estimates — final price depends on Amanda's visit.

# What makes Amanda different (mention lightly, don't oversell)

- Attention to detail — every corner, done slowly and with method
- Gentle, effective products safe for family and pets
- One trusted person, not a rotating crew
- Brazilian-owned boutique service — capricho e cuidado

# Tone

**English (Tampa / Florida):** warm, friendly, easygoing — like a neighbor, not a corporate bot. Short sentences. Sparing emoji (🌿 ✨ 🧡).

**Portuguese (brasileiros na Flórida):** português brasileiro, tom próximo, "você" (nunca "tu"). "Oi", "que bom", "a gente" à vontade. Sem "prezado cliente". Nada formal.

Both languages: be concise (1–3 short paragraphs max), be honest, never invent services/prices/neighborhoods, never ask for credit card/SSN/ID. If asked something you don't know, say Amanda will confirm on WhatsApp.
`;

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

        // --- Tools ---
        const estimateQuote = tool({
          description:
            "Compute a price estimate in USD for a residential cleaning job. Use only when you know service type, bedrooms and bathrooms. For post-construction or commercial, do NOT call this — route the visitor to WhatsApp.",
          inputSchema: z.object({
            service: z.enum(["regular", "deep", "move_in_out"]),
            bedrooms: z.number().int(),
            bathrooms: z.number().int(),
            has_pets: z.boolean().optional(),
            sqft: z.number().optional(),
          }),
          execute: async ({ service, bedrooms, bathrooms, has_pets, sqft }) => {
            if (sqft && sqft > 3000) {
              return {
                custom_quote: true,
                message:
                  "Home is larger than 3000 sqft — Amanda will confirm the exact price on WhatsApp.",
              };
            }
            const baseByService = { regular: 150, deep: 300, move_in_out: 250 } as const;
            const base = baseByService[service];
            const extraBedrooms = Math.max(0, bedrooms - 2) * 25;
            const extraBathrooms = Math.max(0, bathrooms - 2) * 25;
            const petsFee = has_pets ? 20 : 0;
            const total = base + extraBedrooms + extraBathrooms + petsFee;

            // Persist the quote on the conversation
            if (conversationId) {
              try {
                await supabaseAdmin
                  .from("conversations")
                  .update({
                    quoted_value: total,
                    status: "quoted",
                    is_lead: true,
                    updated_at: new Date().toISOString(),
                  } as never)
                  .eq("id", conversationId);
              } catch (e) {
                console.error("estimate_quote persist error", e);
              }
            }

            return {
              custom_quote: false,
              currency: "USD",
              total,
              breakdown: {
                base,
                extra_bedrooms: extraBedrooms,
                extra_bathrooms: extraBathrooms,
                pets_fee: petsFee,
              },
              note: "Estimate — final price after Amanda confirms details.",
            };
          },
        });

        const saveLeadDetails = tool({
          description:
            "Save the visitor's contact info and job details so Amanda has everything before replying. Call this as soon as you have at least a name and a phone/WhatsApp number. You can call it again to update fields.",
          inputSchema: z.object({
            name: z.string().optional(),
            phone: z.string().optional(),
            address: z.string().optional(),
            city: z.string().optional(),
            service: z
              .enum(["regular", "deep", "move_in_out", "post_construction", "commercial"])
              .optional(),
            bedrooms: z.number().int().optional(),
            bathrooms: z.number().int().optional(),
            sqft: z.number().optional(),
            has_pets: z.boolean().optional(),
            preferred_date: z.string().optional(),
            notes: z.string().optional(),
          }),
          execute: async (input) => {
            if (!conversationId) return { ok: false };
            try {
              // Merge with existing lead_data so calling this again updates rather than overwrites
              const { data: current } = await (supabaseAdmin as never as {
                from: (t: string) => {
                  select: (c: string) => {
                    eq: (
                      k: string,
                      v: string,
                    ) => { maybeSingle: () => Promise<{ data: { lead_data: unknown } | null }> };
                  };
                };
              })
                .from("conversations")
                .select("lead_data")
                .eq("id", conversationId)
                .maybeSingle();

              const previous = (current?.lead_data ?? {}) as Record<string, unknown>;
              const merged: Record<string, unknown> = { ...previous };
              for (const [k, v] of Object.entries(input)) {
                if (v !== undefined && v !== null && v !== "") merged[k] = v;
              }

              await supabaseAdmin
                .from("conversations")
                .update({
                  lead_data: merged,
                  is_lead: true,
                  updated_at: new Date().toISOString(),
                } as never)
                .eq("id", conversationId);
              return { ok: true, saved: Object.keys(merged) };
            } catch (e) {
              console.error("save_lead_details persist error", e);
              return { ok: false };
            }
          },
        });

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(uiMessages),
          tools: { estimate_quote: estimateQuote, save_lead_details: saveLeadDetails },
          stopWhen: stepCountIs(6),
          onFinish: async ({ text }) => {
            if (!conversationId) return;
            try {
              if (text && text.trim()) {
                await supabaseAdmin.from("messages").insert({
                  conversation_id: conversationId,
                  role: "assistant",
                  content: text,
                });
              }
              await supabaseAdmin
                .from("conversations")
                .update({
                  updated_at: new Date().toISOString(),
                  message_count: uiMessages.length + 1,
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
