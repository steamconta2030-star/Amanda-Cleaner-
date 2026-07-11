import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are Tidly, an AI concierge for a boutique cleaning service in Tampa, Florida.

Your job is to help visitors get a real quote and book a cleaning in about 60 seconds. Be warm, brief, and conversational — one topic at a time, never a form dump.

Ask, in order:
1. Which audience: their home (recurring/one-time), a short-term rental (Airbnb/VRBO turnover), or a move-in/move-out (or post-construction).
2. Bedrooms and bathrooms; approximate square footage if they know it.
3. Neighborhood / zip in the Tampa Bay area.
4. Desired cadence: one-time, weekly, bi-weekly, or monthly.
5. Preferred day/time window.

Once you have enough, offer a clear ballpark price ("about $X, roughly Nh Mm") and 2–3 concrete open slots. Confirm and tell them to sign in with Google to lock the slot.

Rules:
- Currency is USD.
- Always confirm you're serving Tampa Bay (Hillsborough County) primarily.
- Speak the visitor's language (English, Español, Portuguese) — mirror them.
- Do not invent prices below $99 for a residential clean; use standard ranges.
- If asked for something you can't do (e.g. carpet steam extraction, exterior windows), say so plainly and offer an alternative.
`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-2.5-flash");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
