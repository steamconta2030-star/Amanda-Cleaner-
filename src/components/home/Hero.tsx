import { useT } from "./lang";
import { waLink } from "./constants";
import heroImage from "../../assets/hero.jpg.asset.json";

export function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-24 pb-24 md:grid-cols-12 md:gap-16 md:px-10 md:pt-32 md:pb-40">
        <div className="flex flex-col justify-start md:col-span-7">
          <span className="mb-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {t.hero.tag}
          </span>
          <h1
            className="font-serif italic leading-[0.85] tracking-tight text-foreground"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
          >
            {t.hero.title1} <em className="not-italic">{t.hero.title2}</em>
          </h1>
          <div className="mt-14 flex flex-col items-start gap-10 md:flex-row md:items-start md:gap-12">
            <a
              href={waLink(t.quote.msgTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center whitespace-nowrap bg-foreground px-10 py-4 text-[10px] font-medium uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-85"
            >
              {t.hero.book}
            </a>
            <p className="max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              {t.hero.sub}
            </p>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
            <img
              src={heroImage.url}
              alt="Calm, sunlit interior"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 border border-border bg-background p-6 md:-bottom-10 md:-left-10 md:p-10">
            <div className="mb-3 text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
              {t.hero.provenanceLabel}
            </div>
            <p className="font-serif text-xl italic leading-none md:text-2xl">
              {t.hero.provenance}
            </p>
            <div className="mt-4 h-px w-8 bg-[#009C3B]" />
          </div>
        </div>
      </div>
    </section>
  );
}
