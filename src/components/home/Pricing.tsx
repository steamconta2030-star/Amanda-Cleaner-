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
          {t.pricing.plans.map((p, i) => {
            const featured = i === 1;
            return (
              <div
                key={p.name}
                className={`group relative flex flex-col justify-between rounded-sm border p-8 transition-all duration-300 ${
                  featured
                    ? "border-primary/50 bg-primary/[0.04] shadow-[0_1px_0_0_rgba(0,0,0,0.02)] md:-translate-y-2 md:p-10"
                    : "border-border bg-background hover:border-foreground/30"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-2 border border-primary/40 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
                    <span className="h-px w-3 bg-primary" aria-hidden />
                    {t.pricing.popular}
                  </span>
                )}
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
                  className={`mt-10 inline-flex items-center gap-2 text-sm underline underline-offset-4 transition-opacity ${
                    featured
                      ? "text-primary opacity-100 hover:opacity-80"
                      : "text-foreground opacity-80 hover:opacity-100"
                  }`}
                >
                  {t.pricing.request} <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            );
          })}
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
