import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="text-xl">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1.5 sm:gap-3">
          <a
            href="#how-it-works"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-block"
          >
            How it works
          </a>
          <a
            href="#services"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-block"
          >
            Services
          </a>
          <Link
            to="/auth"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/85"
          >
            Get a quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
