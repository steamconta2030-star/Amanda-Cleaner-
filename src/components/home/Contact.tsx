import { Link } from "@tanstack/react-router";
import { useT } from "./lang";
import { PHONE_DISPLAY, INSTAGRAM_HANDLE, INSTAGRAM_URL, waLink } from "./constants";

export function Contact() {
  const { t } = useT();
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.contact.tag}</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              {t.contact.title1} <em className="italic text-primary">{t.contact.title2}</em>{t.contact.title3}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {t.contact.sub}
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="border-t border-foreground/20 pt-6">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{t.contact.wa}</span>
                <p className="mt-3 font-serif text-xl leading-snug">{PHONE_DISPLAY}</p>
                <a
                  href={waLink(t.quote.msgTitle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-background hover:-translate-y-0.5 transition-transform"
                >
                  {t.contact.waBtn} <span aria-hidden>→</span>
                </a>
              </div>
              <div className="border-t border-foreground/20 pt-6">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</span>
                <p className="mt-3 font-serif text-xl leading-snug break-all">{INSTAGRAM_HANDLE}</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-foreground/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
                >
                  Follow <span aria-hidden>→</span>
                </a>
              </div>
            </div>
            <div className="mt-10 border-t border-foreground/15 pt-6">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground underline underline-offset-4 hover:text-primary"
              >
                Phone, email &amp; hours <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
