import { Link } from "@tanstack/react-router";
import { LangToggle, useT } from "./lang";
import { waLink } from "./constants";

export function Nav() {
  const { t } = useT();
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl italic tracking-tight">
            Amanda <span className="text-primary">&amp;</span> Co.
          </span>
          <span className="mb-1 hidden items-center gap-1 sm:inline-flex" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-[#009C3B]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFDF00]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#002776]" />
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <Link to="/sobre" className="hover:text-foreground transition-colors">{t.nav.about}</Link>
          <a href="#servicos" className="hover:text-foreground transition-colors">{t.nav.services}</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">{t.nav.pricing}</a>
          <a href="#gallery" className="hover:text-foreground transition-colors">{t.nav.gallery}</a>
          <a href="#quote" className="hover:text-foreground transition-colors">{t.nav.quote}</a>
        </nav>
        <div className="flex items-center gap-4">
          <LangToggle />
          <a
            href={waLink("Hi Amanda!")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[11px] uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-60 sm:inline-block"
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </header>
  );
}
