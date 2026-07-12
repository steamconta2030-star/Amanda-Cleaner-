import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  streamText,
  tool,
  stepCountIs,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import type { Database } from "@/integrations/supabase/types";

type Service = {
  slug: string;
  name: string;
  audience: string;
  description: string;
  base_price_cents: number;
  duration_minutes: number;
};

async function loadCatalog(): Promise<Service[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  const supabase = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { data } = await supabase
    .from("services_catalog")
    .select("slug,name,audience,description,base_price_cents,duration_minutes")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []) as Service[];
}

function buildSystem(catalog: Service[], audience?: string) {
  const catalogText = catalog
    .map(
      (s) =>
        `- ${s.slug} (${s.audience}) "${s.name}" — $${(s.base_price_cents / 100).toFixed(0)} base · ${s.duration_minutes}m — ${s.description}`,
    )
    .join("\n");

  return `You are Tidly, an AI concierge for a boutique cleaning service in Tampa, Florida (Hillsborough County). Warm, brief, conversational, one question at a time. Mirror the visitor's language (English / Español / Português).

${audience ? `The visitor started from the "${audience}" flow.` : ""}

CATALOG (use these slugs and base prices):
${catalogText}

FLOW (adapt, don't robot-march):
1. Confirm audience: home / rental / move.
2. Bedrooms, bathrooms, approx sqft.
3. Neighborhood / zip in Tampa Bay.
4. Cadence: one-time / weekly / bi-weekly / monthly.
5. Preferred day/time window.

Once you have enough:
- Call the tool "estimate_quote" with your best estimate (adjust from base by size and cadence). This shows a nice quote card.
- Then propose 2–3 concrete open slots in natural language.
- When the visitor picks a slot, call "propose_booking" with the full booking. The UI will render a Confirm button; the user must be signed in to finalize.

Rules:
- Currency USD. Never below $99 for residential.
- Say plainly when something isn't offered (carpet steam extraction, exterior windows) and suggest an alternative.
- Never invent slugs outside the catalog.
- Keep replies short: 1–3 short lines.`;
}

const estimateQuoteTool = tool({
  description:
    "Show a price quote card to the user with an estimated total, duration, and 2-3 open time slots. Call once you have enough info.",
  inputSchema: z.object({
    service_slug: z.string().describe("Matching slug from catalog"),
    audience: z.enum(["home", "rental", "move"]),
    bedrooms: z.number().int().min(0).nullable(),
    bathrooms: z.number().int().min(0).nullable(),
    square_feet: z.number().int().min(0).nullable(),
    cadence: z.enum(["one_time", "weekly", "biweekly", "monthly"]),
    price_low_cents: z.number().int(),
    price_high_cents: z.number().int(),
    duration_minutes: z.number().int(),
    suggested_slots_iso: z
      .array(z.string())
      .max(3)
      .describe("2-3 ISO datetimes in America/New_York"),
    summary: z.string().describe("One-line human summary of what's included"),
  }),
  execute: async (input) => input,
});

const proposeBookingTool = tool({
  description:
    "Emit a proposed booking for the user to confirm. Call after they pick a slot. The UI shows a Confirm button; user must sign in to save.",
  inputSchema: z.object({
    service_slug: z.string(),
    audience: z.enum(["home", "rental", "move"]),
    scheduled_at_iso: z.string().describe("ISO datetime, America/New_York"),
    duration_minutes: z.number().int(),
    price_cents: z.number().int(),
    address_line1: z.string(),
    city: z.string().default("Tampa"),
    state: z.string().default("FL"),
    zip: z.string(),
    bedrooms: z.number().int().min(0).nullable(),
    bathrooms: z.number().int().min(0).nullable(),
    square_feet: z.number().int().min(0).nullable(),
    customer_name: z.string(),
    customer_email: z.string().email(),
    customer_phone: z.string().nullable(),
    notes: z.string().nullable(),
  }),
  execute: async (input) => input,
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          messages?: unknown;
          audience?: string;
        };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const catalog = await loadCatalog();
        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-2.5-flash");

        const result = streamText({
          model,
          system: buildSystem(catalog, body.audience),
          messages: await convertToModelMessages(body.messages as UIMessage[]),
          tools: {
            estimate_quote: estimateQuoteTool,
            propose_booking: proposeBookingTool,
          },
          stopWhen: stepCountIs(5),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: body.messages as UIMessage[],
        });
      },
    },
  },
});
