import { Link } from "@tanstack/react-router";
import { useT } from "./lang";

export function FAQ() {
  const { t } = useT();
  const items = t.faq.items.slice(0, 3);
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              — {t.faq.tag}
            </span>
            <h2 className="mt-6 font-serif text-4xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              {t.faq.title1}{" "}
              <em className="italic text-primary">{t.faq.title2}</em>
              {t.faq.title3}
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="border-t border-border">
              {items.map((it, i) => (
                <details key={i} className="group border-b border-border py-6" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                    <span className="flex items-baseline gap-4">
                      <span className="font-serif text-sm italic text-muted-foreground">
                        / 0{i + 1}
                      </span>
                      <span className="font-serif text-xl leading-snug tracking-tight md:text-2xl">
                        {it.q}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-2xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:text-primary"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl pl-0 text-sm leading-relaxed text-muted-foreground md:pl-10 md:text-base">
                    {it.a}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/perguntas-frequentes"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foreground underline underline-offset-[6px] hover:text-primary"
              >
                {t.common.seeAllQuestions} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
