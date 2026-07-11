import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://amanda-cleaning.lovable.app";
const WHATSAPP = "https://wa.me/18133649757";

type Service = {
  slug: string;
  name: string;
  tag: string;
  headline: string;
  from: number | null;
  fromLabel: string;
  intro: string;
  includes: string[];
  ideal: string;
  meta: { title: string; description: string };
};

const SERVICES: Service[] = [
  {
    slug: "residential",
    name: "Residential cleaning",
    tag: "Weekly · Bi-weekly · Monthly",
    headline: "The everyday reset your home deserves.",
    from: 150,
    fromLabel: "From $150 · 2 bed / 2 bath",
    intro:
      "A thorough, unhurried clean for occupied homes — dusted, wiped, vacuumed, mopped and detailed by the same trusted person, every visit.",
    includes: [
      "Kitchen: counters, cooktop, exterior of appliances, sink",
      "Bathrooms: toilets, showers, mirrors, fixtures",
      "All floors vacuumed and mopped",
      "Dusting of surfaces, baseboards on rotation",
      "Beds made, general tidy-up",
      "Trash out, fresh towels folded",
    ],
    ideal: "Best for busy families and professionals who want a home that feels cared for — consistently.",
    meta: {
      title: "Residential Cleaning in Tampa, FL — from $150 | Amanda & Co.",
      description:
        "Weekly, bi-weekly and monthly home cleaning in Tampa. Detailed, personal service by Amanda — from $150 for a 2 bed / 2 bath home.",
    },
  },
  {
    slug: "deep-cleaning",
    name: "Deep cleaning",
    tag: "The full reset",
    headline: "Every corner, every crevice, done slowly and with method.",
    from: 300,
    fromLabel: "From $300 · 2 bed / 2 bath",
    intro:
      "A top-to-bottom deep clean for homes that need a real reset — inside oven, inside refrigerator, baseboards, cabinet fronts, and every detail a regular clean skips.",
    includes: [
      "Everything in a residential clean, plus:",
      "Inside oven, cleaned by hand",
      "Inside refrigerator, shelves and drawers",
      "Cabinet fronts and handles",
      "Baseboards, door frames, light switches",
      "Vents, ceiling fans, blinds",
      "Detailed grout and tile work",
    ],
    ideal: "Recommended as a first visit, or 1–2× per year on top of a regular schedule.",
    meta: {
      title: "Deep Cleaning in Tampa, FL — from $300 | Amanda & Co.",
      description:
        "Detailed deep cleaning in Tampa including inside oven, inside refrigerator, baseboards, cabinet fronts and grout. From $300 for a 2 bed / 2 bath home.",
    },
  },
  {
    slug: "move-in-move-out",
    name: "Move in / Move out cleaning",
    tag: "Turnover-ready",
    headline: "A home ready for keys — or for you to hand them back.",
    from: 250,
    fromLabel: "From $250 · 2 bed / 2 bath",
    intro:
      "Empty-home deep clean for tenants, landlords and new homeowners. Includes inside oven and refrigerator so the property is truly move-in ready.",
    includes: [
      "Full deep clean of every room",
      "Inside oven and inside refrigerator",
      "Inside cabinets and drawers",
      "Baseboards, doors, door frames",
      "Windows (interior), tracks and sills",
      "Bathrooms detailed: grout, fixtures, glass",
    ],
    ideal: "Perfect for end-of-lease, real-estate photography prep, or the first day in a new home.",
    meta: {
      title: "Move In / Move Out Cleaning Tampa, FL — from $250 | Amanda & Co.",
      description:
        "Move-in and move-out cleaning in Tampa. Inside oven, inside refrigerator, cabinets and detailed bathrooms — from $250 for a 2 bed / 2 bath home.",
    },
  },
  {
    slug: "post-construction",
    name: "Post-construction cleaning",
    tag: "Custom quote",
    headline: "The dust from the last nail, gone.",
    from: null,
    fromLabel: "Custom quote — request on WhatsApp",
    intro:
      "Post-renovation and post-construction cleaning to make a finished project livable. Fine dust removal, protective film peel, first shine on new surfaces.",
    includes: [
      "Fine construction dust from every surface",
      "Sticker, tape and film removal",
      "New cabinet interiors and exteriors",
      "First shine on new tile, glass, chrome",
      "HVAC vents and light fixtures",
      "Full detailed final clean, room by room",
    ],
    ideal: "For contractors, designers and homeowners after remodels, renovations and new construction.",
    meta: {
      title: "Post-Construction Cleaning Tampa, FL | Amanda & Co.",
      description:
        "Post-construction and post-renovation cleaning in Tampa — fine dust, film removal and detailed final clean. Custom quote by Amanda.",
    },
  },
  {
    slug: "commercial",
    name: "Commercial cleaning",
    tag: "Custom quote",
    headline: "A workspace that looks — and feels — well kept.",
    from: null,
    fromLabel: "Custom quote — request on WhatsApp",
    intro:
      "Boutique offices, studios and small commercial spaces in Tampa. Consistent schedule, same trusted person, discreet and reliable.",
    includes: [
      "Reception, meeting rooms and workstations",
      "Kitchens, coffee stations, break rooms",
      "Restrooms, restocking of supplies (on request)",
      "Floors vacuumed and mopped",
      "Trash and recycling",
      "Optional add-ons: window interiors, fridge, blinds",
    ],
    ideal: "For studios, small offices and boutique businesses that want a clean space without a franchise crew.",
    meta: {
      title: "Commercial Cleaning Tampa, FL | Amanda & Co.",
      description:
        "Boutique commercial cleaning in Tampa for offices, studios and small businesses. Same trusted person, consistent schedule. Custom quote.",
    },
  },
];

export const Route = createFileRoute("/servicos")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Cleaning Services in Tampa, FL — Residential, Deep, Move In/Out | Amanda & Co." },
      {
        name: "description",
        content:
          "Full list of cleaning services in Tampa, FL by Amanda & Co. — residential, deep, move in/out, post-construction and commercial. Pricing from $150.",
      },
      { property: "og:title", content: "Cleaning Services in Tampa, FL | Amanda & Co." },
      {
        property: "og:description",
        content:
          "Residential, deep, move in/out, post-construction and commercial cleaning in Tampa. Detailed, personal service by Amanda.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/servicos` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicos` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/servicos` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Amanda & Co. Cleaning Services — Tampa, FL",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              areaServed: { "@type": "City", name: "Tampa" },
              provider: {
                "@type": "HouseCleaningService",
                name: "Amanda & Co.",
                telephone: "+1-813-364-9757",
              },
            },
            ...(s.from ? { price: String(s.from), priceCurrency: "USD" } : {}),
          })),
        }),
      },
    ],
  }),
});

function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← Amanda & Co.
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.2em] hover:bg-muted sm:inline-block"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Tampa, Florida — Services
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
            <em className="italic text-primary">Cleaning</em> services,
            <br />
            shaped for your home.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            One trusted person. Real attention to detail. Below, every service Amanda offers in
            Tampa — with what's included and where prices start.
          </p>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-20 md:py-28">
          {SERVICES.map((s, idx) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid gap-8 border-t border-border pt-16 md:grid-cols-[1fr_2fr]"
            >
              {/* Left col */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")} · {s.tag}
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                  {s.name}
                </h2>
                <p className="mt-4 text-sm text-primary">{s.fromLabel}</p>
              </div>

              {/* Right col */}
              <div>
                <p className="font-serif text-xl italic leading-snug text-foreground md:text-2xl">
                  {s.headline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.intro}
                </p>

                <div className="mt-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    What's included
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {s.includes.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 text-xs italic text-muted-foreground">{s.ideal}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
                  >
                    Request quote
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs uppercase tracking-[0.2em] hover:bg-muted"
                  >
                    Instant estimate ↗
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Ready when you are
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Get an <em className="italic text-primary">instant estimate</em> in 60 seconds.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Ask our concierge for a real price — no forms, no phone tag. Or send Amanda a WhatsApp
            for anything custom.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
            >
              Get my estimate
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-muted"
            >
              WhatsApp Amanda
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
