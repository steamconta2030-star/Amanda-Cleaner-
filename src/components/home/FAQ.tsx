import { Link } from "@tanstack/react-router";
import { useT } from "./lang";

export function FAQ() {
  const { t } = useT();
  const items = t.faq.items.slice(0, 3);
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.faq.tag}</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.faq.title1} <em className="italic text-primary">{t.faq.title2}</em>{t.faq.title3}
          </h2>
        </div>
        <div className="divide-y divide-border border-t border-b border-border">
          {items.map((it, i) => (
            <details key={i} className="group py-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-serif text-lg leading-snug md:text-xl">{it.q}</span>
                <span aria-hidden className="mt-1 shrink-0 text-2xl leading-none text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {it.a}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/perguntas-frequentes"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground underline underline-offset-4 hover:text-primary"
          >
            {t.common.seeAllQuestions} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
