import { Link } from "@tanstack/react-router";

export const TESTIMONIALS = [
  {
    name: "Marisol R.",
    area: "Westchase, Tampa",
    quote:
      "Booked a bi-weekly by chat in under two minutes. Cleaner showed up on time and left a photo checklist — my kids' rooms have never looked better.",
    tag: "Home",
    rating: 5,
  },
  {
    name: "Daniel P.",
    area: "Airbnb host · South Tampa",
    quote:
      "Turnovers are on autopilot. I get pings when the property is ready and a full photo report. Guest reviews jumped after switching to Tidly.",
    tag: "Rental",
    rating: 5,
  },
  {
    name: "Ana C.",
    area: "Move-out · Carrollwood",
    quote:
      "Needed a deposit-ready clean on 48 hours notice. Got a fair price by chat and got the full deposit back. Would use again in a heartbeat.",
    tag: "Move",
    rating: 5,
  },
] as const;

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-primary" aria-label={`${n} out of 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Loved by Tampa
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              4.9 stars across homes, rentals, and moves.
            </h2>
          </div>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Read all reviews →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <Stars n={t.rating} />
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.tag}
                </span>
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{t.name}</span> ·{" "}
                {t.area}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
