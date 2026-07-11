import { useT } from "./lang";
import aboutImage from "../../assets/amanda.jpg.asset.json";

export function About() {
  const { t } = useT();
  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
              <img
                src={aboutImage.url}
                alt={t.about.alt}
                width={800}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
          </div>
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <span className="mb-8 block text-[10px] uppercase tracking-[0.5em] text-primary">
              {t.about.tag}
            </span>
            <h2 className="mb-10 font-serif text-4xl italic leading-[1.1] tracking-tight text-foreground md:text-5xl">
              {t.about.title1} <em className="not-italic">{t.about.title2}</em>
              {t.about.title3}
            </h2>
            <div className="space-y-6 font-light leading-loose text-muted-foreground">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#servicos"
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground"
              >
                {t.common.exploreServices}
              </a>
              <div className="h-px w-20 bg-foreground transition-all duration-500 hover:w-28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
