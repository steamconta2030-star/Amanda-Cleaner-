import { Link } from "@tanstack/react-router";
import { useT } from "./lang";

const VOLUMES = ["Vol. I", "Vol. II", "Vol. III"];
const CADENCES: Record<string, { en: string; pt: string }> = {
  0: { en: "Weekly · Bi-weekly", pt: "Semanal · Quinzenal" },
  1: { en: "Monthly · Seasonal", pt: "Mensal · Sazonal" },
  2: { en: "One-time transition", pt: "Transição pontual" },
};

export function Pricing() {
  const { t, lang } = useT();
  return (
    <section id="pricing" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-40">
        <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-md">
            <span className="mb-4 block text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
              {t.pricing.tag}
            </span>
            <h2 className="font-serif text-3xl italic leading-tight md:text-4xl">
              {t.pricing.title1} <em className="not-italic text-primary">{t.pricing.title2}</em>{" "}
              {t.pricing.title3}
            </h2>
          </div>
          <p className="max-w-sm text-[10px] uppercase tracking-[0.3em] text-primary md:text-right">
            {t.pricing.note}
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {t.pricing.plans.map((p, i) => {
            const featured = i === 1;
            const cadence = CADENCES[i]?.[lang] ?? "";
            return (
              <a
                key={p.name}
                href="#quote"
                className={`group grid grid-cols-12 items-center gap-4 px-2 py-10 transition-colors duration-500 hover:bg-primary/5 md:px-6 md:py-14 ${
                  featured ? "bg-primary/[0.03]" : ""
                }`}
              >
                <div className="col-span-12 md:col-span-6">
                  <span className="mb-3 block text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
                    {VOLUMES[i]}
                    {featured ? ` · ${t.pricing.popular}` : ""}
                  </span>
                  <h3 className="font-serif text-3xl italic leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {p.name}
                  </h3>
                </div>
                <div className="col-span-8 md:col-span-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {cadence}
                  </p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
                <div className="col-span-4 flex flex-col items-end md:col-span-3">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    {t.pricing.startingAt}
                  </span>
                  <span className="mt-2 font-serif text-3xl italic">{p.price}</span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            to="/servicos"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground hover:text-primary"
          >
            Full pricing &amp; services
            <span
              aria-hidden
              className="inline-block h-px w-8 bg-current transition-all duration-300 group-hover:w-14"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
