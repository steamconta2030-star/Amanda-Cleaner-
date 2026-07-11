import { useT } from "./lang";
import { waLink } from "./constants";

export function MobileCta() {
  const { t } = useT();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-2 pb-[env(safe-area-inset-bottom)]">
        <a
          href="#quote"
          className="flex-1 rounded-full border border-foreground/25 px-4 py-3 text-center text-sm font-medium"
        >
          {t.stickyCta.quote}
        </a>
        <a
          href={waLink(t.quote.msgTitle)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-foreground px-4 py-3 text-center text-sm font-medium text-background"
        >
          {t.stickyCta.wa}
        </a>
      </div>
    </div>
  );
}
