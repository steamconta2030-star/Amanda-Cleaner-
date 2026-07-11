import { Link } from "@tanstack/react-router";
import { useT } from "./lang";

export function Services() {
  const { t } = useT();
  return (
    <section id="servicos">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.services.tag}</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              {t.services.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.services.sub}
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-b border-border">
          {t.services.items.map((s, i) => (
            <li key={s.name} className="group grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
                0{i + 1}
              </div>
              <h3 className="font-serif text-2xl md:col-span-4 md:text-3xl">{s.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{s.desc}</p>
              <div className="md:col-span-1 md:text-right">
                <a
                  href="#quote"
                  className="text-sm text-foreground underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
                >
                  {t.services.request}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground underline underline-offset-4 hover:text-primary"
          >
            {t.common.seeAllServices} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
