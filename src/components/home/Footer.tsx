import { Link } from "@tanstack/react-router";
import { useT } from "./lang";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "./constants";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
        <p className="font-serif text-lg">
          Amanda <span className="italic text-primary">&amp;</span> Co.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          {INSTAGRAM_HANDLE}
        </a>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} — {t.footer.line}
          </p>
          <a
            href="/auth"
            className="inline-flex rounded-full border border-foreground/20 px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:border-0 sm:p-0"
          >
            Staff
          </a>
        </div>
      </div>
    </footer>
  );
}
