import { useT } from "./lang";
import aboutImage from "../../assets/amanda.jpg.asset.json";

export function About() {
  const { t } = useT();
  return (
    <section id="about" className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <span className="mb-6 inline-flex items-center gap-1.5" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[#009C3B]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFDF00]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#002776]" />
            </span>
            <div className="mb-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.about.tag}
            </div>
            <h2 className="font-serif text-4xl italic leading-[1.05] tracking-tight md:text-5xl">
              {t.about.title1} <em className="not-italic">{t.about.title2}</em>{t.about.title3}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-6 text-base font-light leading-relaxed text-foreground/80">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#servicos"
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground"
              >
                {t.about.tag === "About" ? "Explore services" : "Ver serviços"}
              </a>
              <div className="h-px w-12 bg-foreground transition-all duration-500 hover:w-20" />
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-24">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary md:aspect-[21/9]">
            <img
              src={aboutImage.url}
              alt={t.about.alt}
              width={1600}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
