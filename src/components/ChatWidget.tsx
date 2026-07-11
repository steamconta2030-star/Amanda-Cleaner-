import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "amandaChatSessionId";
  let id = window.localStorage.getItem(KEY);
  if (!id) {
    id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    window.localStorage.setItem(KEY, id);
  }
  return id;
}

const WHATSAPP_NUMBER = "18133649757";
// When Amanda provides her Stripe/PayPal/Zelle link, set this in .env as
// VITE_AMANDA_PAY_LINK=https://... — the "Pay now" button becomes active.
const PAY_LINK: string =
  (typeof import.meta !== "undefined" && (import.meta as { env?: Record<string, string> }).env?.VITE_AMANDA_PAY_LINK) || "";

type QuoteBreakdown = {
  base?: number;
  extra_bedrooms?: number;
  extra_bathrooms?: number;
  pets_fee?: number;
};
type QuoteOutput = {
  custom_quote?: boolean;
  currency?: string;
  total?: number;
  breakdown?: QuoteBreakdown;
  message?: string;
};

type LeadContext = {
  service?: string;
  bedrooms?: number;
  bathrooms?: number;
  has_pets?: boolean;
  name?: string;
  address?: string;
};

const SERVICE_LABEL: Record<string, { en: string; pt: string }> = {
  regular: { en: "Regular cleaning", pt: "Limpeza regular" },
  deep: { en: "Deep cleaning", pt: "Deep cleaning" },
  move_in_out: { en: "Move in/out cleaning", pt: "Limpeza de mudança" },
  post_construction: { en: "Post-construction", pt: "Pós-obra" },
  commercial: { en: "Commercial", pt: "Comercial" },
};

function formatUSD(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = useMemo(getSessionId, []);
  const lang = typeof document !== "undefined"
    ? (document.documentElement.lang || (navigator.language?.startsWith("pt") ? "pt" : "en"))
    : "en";
  const isPt = lang.startsWith("pt");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { sessionId, lang },
    }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  };

  // Extract latest tool calls across the whole conversation.
  const { latestQuote, latestQuoteInput, latestLead } = useMemo(() => {
    let quote: QuoteOutput | null = null;
    let quoteInput: LeadContext | null = null;
    let lead: LeadContext | null = null;
    for (const m of messages) {
      for (const p of m.parts as Array<{ type: string; state?: string; input?: unknown; output?: unknown }>) {
        if (p.type === "tool-estimate_quote" && p.state === "output-available") {
          quote = p.output as QuoteOutput;
          quoteInput = (p.input as LeadContext) ?? null;
        }
        if (p.type === "tool-save_lead_details" && p.input) {
          lead = { ...(lead ?? {}), ...(p.input as LeadContext) };
        }
      }
    }
    return { latestQuote: quote, latestQuoteInput: quoteInput, latestLead: lead };
  }, [messages]);

  const quoteContext: LeadContext = { ...(latestQuoteInput ?? {}), ...(latestLead ?? {}) };
  const serviceKey = quoteContext.service ?? "";
  const serviceLabel = SERVICE_LABEL[serviceKey]?.[isPt ? "pt" : "en"] ?? serviceKey;

  // Build WhatsApp summary
  const whatsappHref = useMemo(() => {
    const lines: string[] = [];
    lines.push(isPt ? "Oi Amanda! Vim pelo site 🌿" : "Hi Amanda! Coming from your website 🌿");
    if (quoteContext.name) lines.push((isPt ? "Nome: " : "Name: ") + quoteContext.name);
    if (serviceLabel) lines.push((isPt ? "Serviço: " : "Service: ") + serviceLabel);
    if (quoteContext.bedrooms != null || quoteContext.bathrooms != null) {
      lines.push(
        (isPt ? "Casa: " : "Home: ") +
          `${quoteContext.bedrooms ?? "?"} ${isPt ? "quartos" : "bed"} · ${quoteContext.bathrooms ?? "?"} ${isPt ? "banheiros" : "bath"}` +
          (quoteContext.has_pets ? (isPt ? " · com pets" : " · with pets") : ""),
      );
    }
    if (quoteContext.address) lines.push((isPt ? "Endereço: " : "Address: ") + quoteContext.address);
    if (latestQuote && !latestQuote.custom_quote && typeof latestQuote.total === "number") {
      lines.push((isPt ? "Estimativa: " : "Estimate: ") + formatUSD(latestQuote.total));
    }
    const msg = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }, [isPt, latestQuote, quoteContext, serviceLabel]);

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:bottom-8 md:right-8"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[70vh] max-h-[620px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:bottom-28 md:right-8">
          {/* Header */}
          <div className="border-b border-border bg-secondary/40 px-4 py-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Amanda & Co.</p>
            <p className="font-serif text-lg">{isPt ? "Fale com a gente" : "Chat with us"}</p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
                {isPt
                  ? "Oi! Sou a assistente da Amanda. Me conta que tipo de limpeza você precisa que eu te passo um orçamento na hora 🌿"
                  : "Hi! I'm Amanda's assistant. Tell me what kind of cleaning you need and I'll get you a quick estimate 🌿"}
              </div>
            )}
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              if (!text && !isUser) return null;
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {text || (isUser ? "" : "…")}
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}

            {/* Quote card */}
            {latestQuote && (
              <QuoteCard
                quote={latestQuote}
                serviceLabel={serviceLabel}
                bedrooms={quoteContext.bedrooms}
                bathrooms={quoteContext.bathrooms}
                hasPets={quoteContext.has_pets}
                isPt={isPt}
                whatsappHref={whatsappHref}
                payLink={PAY_LINK}
              />
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-border bg-background p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e as unknown as React.FormEvent);
                  }
                }}
                rows={1}
                placeholder={isPt ? "Digite sua mensagem…" : "Type your message…"}
                className="max-h-32 min-h-[40px] flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function QuoteCard({
  quote,
  serviceLabel,
  bedrooms,
  bathrooms,
  hasPets,
  isPt,
  whatsappHref,
  payLink,
}: {
  quote: QuoteOutput;
  serviceLabel: string;
  bedrooms?: number;
  bathrooms?: number;
  hasPets?: boolean;
  isPt: boolean;
  whatsappHref: string;
  payLink: string;
}) {
  // Custom quote (post-construction, >3000 sqft, etc.)
  if (quote.custom_quote || typeof quote.total !== "number") {
    return (
      <div className="animate-fade-in rounded-xl border border-primary/30 bg-primary/5 p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
          {isPt ? "Orçamento personalizado" : "Custom quote"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          {quote.message ??
            (isPt
              ? "A Amanda vai confirmar o preço exato no WhatsApp."
              : "Amanda will confirm the exact price on WhatsApp.")}
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {isPt ? "Continuar no WhatsApp" : "Continue on WhatsApp"}
        </a>
      </div>
    );
  }

  const total = quote.total;
  const b = quote.breakdown ?? {};
  const rows: { label: string; value: number }[] = [];
  if (b.base) rows.push({ label: isPt ? "Base" : "Base", value: b.base });
  if (b.extra_bedrooms) rows.push({ label: isPt ? "Quartos extras" : "Extra bedrooms", value: b.extra_bedrooms });
  if (b.extra_bathrooms) rows.push({ label: isPt ? "Banheiros extras" : "Extra bathrooms", value: b.extra_bathrooms });
  if (b.pets_fee) rows.push({ label: isPt ? "Pets" : "Pets", value: b.pets_fee });

  return (
    <div className="animate-fade-in rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 shadow-sm">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
        {isPt ? "Seu orçamento" : "Your estimate"}
      </p>

      {/* Line 1: service + specs */}
      <p className="mt-2 text-sm text-muted-foreground">
        {[
          serviceLabel,
          bedrooms != null || bathrooms != null
            ? `${bedrooms ?? "?"} ${isPt ? "quartos" : "bed"} · ${bathrooms ?? "?"} ${isPt ? "banh" : "bath"}`
            : null,
          hasPets ? (isPt ? "com pets" : "with pets") : null,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>

      {/* Big price */}
      <p className="mt-1 font-serif text-4xl leading-none text-foreground">
        {formatUSD(total)}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {isPt
          ? "Estimativa — preço final após a Amanda confirmar."
          : "Estimate — final price after Amanda confirms."}
      </p>

      {/* Breakdown */}
      {rows.length > 0 && (
        <div className="mt-3 space-y-0.5 border-t border-border/50 pt-2 text-[11px]">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between text-muted-foreground">
              <span>{r.label}</span>
              <span>{formatUSD(r.value)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex flex-col gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1s-1.2-.4-2.3-1.4c-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5H7c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.4 2.9 1.2 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z" />
          </svg>
          {isPt ? "Fechar no WhatsApp" : "Confirm on WhatsApp"}
        </a>
        {payLink ? (
          <a
            href={payLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-primary/40 bg-background px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            {isPt ? `Pagar ${formatUSD(total)} agora` : `Pay ${formatUSD(total)} now`}
          </a>
        ) : (
          <p className="text-center text-[10px] text-muted-foreground">
            {isPt
              ? "Pagamento online disponível em breve"
              : "Online payment coming soon"}
          </p>
        )}
      </div>
    </div>
  );
}
