import { Link } from "@tanstack/react-router";
import { useT } from "./lang";

export function Pricing() {
  const { t } = useT();
  return (
    <section id="pricing" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.pricing.tag}</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              {t.pricing.title1} <em className="italic text-primary">{t.pricing.title2}</em> {t.pricing.title3}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.pricing.sub}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {t.pricing.plans.map((p, i) => (
            <div
              key={p.name}
              className={`flex flex-col justify-between rounded-sm border p-8 transition-colors ${
                i === 1 ? "border-primary/40 bg-primary/5" : "border-border bg-background"
              }`}
            >
              <div>
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-5xl">{p.price}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.pricing.startingAt}
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
              <a
                href="#quote"
                className="mt-10 inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 opacity-80 hover:opacity-100"
              >
                {t.pricing.request} <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {t.pricing.note}
          </p>
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground underline underline-offset-4 hover:text-primary"
          >
            Full pricing &amp; services <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
