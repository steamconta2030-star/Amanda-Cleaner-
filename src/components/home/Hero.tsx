import { useT } from "./lang";
import { waLink } from "./constants";
import heroImage from "../../assets/hero.jpg.asset.json";

export function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <span className="mb-10 inline-block border-b border-primary pb-1 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {t.hero.tag}
            </span>
            <h1
              className="mb-14 font-serif italic tracking-tight text-foreground"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)", lineHeight: 0.88 }}
            >
              {t.hero.title1} <em className="not-italic">{t.hero.title2}</em>
            </h1>
            <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-12">
              <p className="max-w-xs text-base font-light leading-relaxed text-muted-foreground">
                {t.hero.sub}
              </p>
              <a
                href={waLink(t.quote.msgTitle)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-5 whitespace-nowrap bg-foreground px-8 py-4 text-[10px] font-medium uppercase tracking-[0.25em] text-background transition-colors duration-500 hover:bg-primary"
              >
                {t.hero.book}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
              <img
                src={heroImage.url}
                alt="Calm, sunlit interior"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
                {t.hero.provenanceLabel}
              </div>
              <div className="h-px w-8 bg-primary" />
              <p className="font-serif text-lg italic leading-none">
                {t.hero.provenance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
