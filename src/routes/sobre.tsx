import { createFileRoute, Link } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/SubPageHeader";
import aboutImage from "../assets/amanda.jpg.asset.json";

const SITE_URL = "https://amanda-cleaning.lovable.app";
const WHATSAPP_URL = "https://wa.me/18133649757";

export const Route = createFileRoute("/sobre")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Amanda — Brazilian-owned Home Cleaning in Tampa | Amanda & Co." },
      {
        name: "description",
        content:
          "Meet Amanda — the Brazilian founder behind Amanda & Co. Boutique home cleaning in Tampa, FL, with the Brazilian standard of capricho: slow, methodical, honest care.",
      },
      { property: "og:title", content: "About Amanda — Brazilian care in Tampa, FL" },
      {
        property: "og:description",
        content:
          "Meet Amanda — Brazilian-owned boutique cleaning in Tampa. One trusted person, capricho standard, homes treated like her own.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE_URL}/sobre` },
      { property: "og:image", content: aboutImage.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: aboutImage.url },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/sobre` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/sobre` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE_URL}/sobre`,
          mainEntity: {
            "@type": "Person",
            name: "Amanda",
            jobTitle: "Founder",
            worksFor: {
              "@type": "HouseCleaningService",
              name: "Amanda & Co. Boutique Home Cleaning",
              url: SITE_URL,
              areaServed: { "@type": "City", name: "Tampa" },
            },
            nationality: { "@type": "Country", name: "Brazil" },
            image: aboutImage.url,
          },
        }),
      },
    ],
  }),
});

const VALUES = [
  {
    kicker: "01",
    title: "Capricho",
    body: "A Brazilian word with no direct translation — doing things slowly, with method, and honest care. Every corner, every finish, every detail treated as if it were my own home.",
  },
  {
    kicker: "02",
    title: "One trusted person",
    body: "No rotating crews, no strangers walking through your door. It's always me — the same person, learning your space, your preferences and your routines over time.",
  },
  {
    kicker: "03",
    title: "Small, on purpose",
    body: "I work with a small handful of families. That's what lets me keep the standard high and the relationship personal — the opposite of a big cleaning company.",
  },
  {
    kicker: "04",
    title: "Safe products",
    body: "Gentle, effective products that smell fresh and are safe for family and pets. If you have preferences or sensitivities, we adjust before the first visit.",
  },
];

const CREDENTIALS = [
  { label: "Based in", value: "Tampa, FL" },
  { label: "Since", value: "2020" },
  { label: "Serving", value: "West Tampa, Westchase, Carrollwood, South Tampa & nearby" },
  { label: "Languages", value: "English & Portuguese" },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SubPageHeader />


      {/* Hero */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12 md:gap-16 md:py-24">
          <div className="md:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Tampa, Florida — About
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
              I'm <em className="italic text-primary">Amanda</em>.
              <br />
              Nice to meet you.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Brazilian-born, Tampa-based. I'm the person you message on WhatsApp, the person who
              walks into your home, and the person who leaves it exactly the way you deserve to
              find it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
              >
                Say hi on WhatsApp
              </a>
              <Link
                to="/servicos"
                className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-muted"
              >
                See services
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
              <img
                src={aboutImage.url}
                alt="Amanda, founder of Amanda & Co."
                width={1200}
                height={1500}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            The story
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            A home is cared for like <em className="italic text-primary">family</em>.
          </h2>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/80">
            <p>
              I grew up in Brazil, where cleaning a home isn't a chore to rush through — it's a
              small act of care. You take your time. You do it right. You leave a space feeling
              calmer than you found it. In Portuguese we call it <em>capricho</em>, and it's the
              standard I was raised on.
            </p>
            <p>
              When I moved to Tampa, I noticed how much of American cleaning had become a rush —
              big companies, rotating crews, an hour in and out. Nothing wrong with fast, but it
              was never how I wanted to work. So I built something different: a small, personal
              service where the same person shows up every time and actually knows your home.
            </p>
            <p>
              Amanda & Co. is that idea, made simple. I take on a small number of families, learn
              their spaces and preferences, and treat every visit as if I were cleaning for my own
              parents. That's it. No apps, no scripts, no shortcuts. Just care.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              What makes it different
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              Four things I <em className="italic text-primary">never</em> compromise on.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {VALUES.map((v) => (
              <article key={v.title} className="border-t border-border pt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {v.kicker}
                </p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 border-t border-border pt-10 md:grid-cols-4">
            {CREDENTIALS.map((c) => (
              <div key={c.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {c.label}
                </p>
                <p className="mt-3 font-serif text-lg leading-snug md:text-xl">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Ready when you are
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
            Let's talk about <em className="italic text-primary">your home</em>.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Send me a quick message on WhatsApp — a few details about your space and I'll come back
            with an honest quote, personally.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
            >
              Message Amanda
            </a>
            <Link
              to="/contato"
              className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-muted"
            >
              All contact options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
