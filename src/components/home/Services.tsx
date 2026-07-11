import { Link } from "@tanstack/react-router";
import { useT } from "./lang";

export function Services() {
  const { t } = useT();
  return (
    <section id="servicos" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              — {t.services.tag}
            </span>
            <h2 className="mt-6 font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              {t.services.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-4">
            {t.services.sub}
          </p>
        </div>

        <ul className="border-t border-border">
          {t.services.items.map((s, i) => (
            <li
              key={s.name}
              className="group grid grid-cols-1 items-baseline gap-3 border-b border-border py-8 transition-colors hover:bg-primary/[0.02] md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="font-serif text-sm italic text-muted-foreground md:col-span-1">
                / 0{i + 1}
              </div>
              <h3 className="font-serif text-3xl leading-tight tracking-tight md:col-span-5 md:text-4xl">
                {s.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-5">
                {s.desc}
              </p>
              <div className="md:col-span-1 md:text-right">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.25em] text-foreground opacity-60 transition-all group-hover:opacity-100"
                >
                  {t.services.request}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foreground underline underline-offset-[6px] hover:text-primary"
          >
            {t.common.seeAllServices} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
