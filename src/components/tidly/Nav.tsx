import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { supabase } from "@/integrations/supabase/client";
import { LANGS, detectLang, setLang, type Lang } from "@/lib/i18n";


export function Nav() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLangState] = useState<Lang>("en");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setLangState(detectLang());
    if (typeof document !== "undefined") {
      setDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  function changeLang(next: Lang) {
    setLang(next);
    setLangState(next);
    if (typeof window !== "undefined") window.location.reload();
  }

  function toggleTheme() {
    if (typeof document === "undefined") return;
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("tidly_theme", next ? "dark" : "light");
    } catch {
      // ignore
    }
    setDark(next);
  }


  useEffect(() => {
    let cancelled = false;
    async function check() {
      const { data: userRes } = await supabase.auth.getUser();
      if (cancelled || !userRes.user) {
        if (!cancelled) setIsAdmin(false);
        return;
      }
      const { data } = await supabase.rpc("has_role", {
        _user_id: userRes.user.id,
        _role: "admin",
      });
      if (!cancelled) setIsAdmin(!!data);
    }
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="text-xl">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1.5 sm:gap-3">
          <Link
            to="/services"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-block"
          >
            Services
          </Link>
          <Link
            to="/faq"
            className="hidden text-sm text-muted-foreground hover:text-foreground md:inline-block"
          >
            FAQ
          </Link>
          <Link
            to="/about"
            className="hidden text-sm text-muted-foreground hover:text-foreground md:inline-block"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hidden text-sm text-muted-foreground hover:text-foreground md:inline-block"
          >
            Contact
          </Link>
          <Link
            to="/host"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-block"
          >
            For hosts
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground hover:bg-secondary/80 sm:inline-block"
            >
              Admin
            </Link>
          )}
          <button
            type="button"
            aria-label="Toggle theme"
            title={dark ? "Switch to light" : "Switch to dark"}
            onClick={toggleTheme}
            className="rounded-full border border-border bg-background px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {dark ? "☀︎" : "☾"}
          </button>
          <select
            aria-label="Language"
            value={lang}
            onChange={(e) => changeLang(e.target.value as Lang)}
            className="rounded-full border border-border bg-background px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
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
