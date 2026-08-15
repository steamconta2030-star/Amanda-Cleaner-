import { Link } from "@tanstack/react-router";

// Recovered from the earlier Tampa version of the project.
// Keep these as legacy testimonial content until each quote is re-verified.
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
      "Turnovers are on autopilot. I get pings when the property is ready and a full photo report.",
    tag: "Rental",
    rating: 5,
  },
  {
    name: "Ana C.",
    area: "Move-out · Carrollwood",
    quote:
      "Needed a deposit-ready clean on short notice. Got a fair price by chat and would use the service again.",
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
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tampa stories</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">What clients say about the experience.</h2>
          </div>
          <Link to="/reviews" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">Read reviews →</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card p-8 pt-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <span aria-hidden className="pointer-events-none absolute -left-2 -top-6 select-none font-serif text-[9rem] italic leading-none text-primary/10">&ldquo;</span>
              <div className="relative flex items-center justify-between"><Stars n={t.rating} /><span className="rounded-full border border-border/70 bg-secondary/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t.tag}</span></div>
              <blockquote className="relative mt-6 flex-1 font-serif text-lg italic leading-relaxed text-foreground">{t.quote}</blockquote>
              <figcaption className="relative mt-8 flex items-center gap-3 pt-5 text-xs text-muted-foreground"><span className="h-8 w-px bg-primary/60" aria-hidden /><span><span className="block text-sm font-semibold tracking-tight text-foreground">{t.name}</span><span className="mt-1 block uppercase tracking-[0.15em]">{t.area}</span></span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
