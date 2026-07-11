import { Link } from "@tanstack/react-router";

const WHATSAPP_URL = "https://wa.me/18133649757";

export function SubPageHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5">
        <Link
          to="/"
          className="min-w-0 truncate text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Amanda &amp; Co.
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-muted"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
