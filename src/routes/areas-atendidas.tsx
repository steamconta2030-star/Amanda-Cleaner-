import { createFileRoute, Link } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/SubPageHeader";

const SITE_URL = "https://amanda-cleaning.lovable.app";
const WHATSAPP = "https://wa.me/18133649757";

type Area = {
  slug: string;
  name: string;
  zips: string[];
  blurb: string;
  highlights: string[];
};

const AREAS: Area[] = [
  {
    slug: "westchase",
    name: "Westchase",
    zips: ["33626"],
    blurb:
      "Westchase families trust Amanda for weekly and bi-weekly upkeep — from West Park Village townhomes to single-family homes off Linebaugh. Detailed, quiet service, always by the same person.",
    highlights: ["Weekly & bi-weekly plans", "Same trusted cleaner", "Pet-safe products"],
  },
  {
    slug: "carrollwood",
    name: "Carrollwood",
    zips: ["33618", "33624"],
    blurb:
      "Original Carrollwood and Carrollwood Village homes — often mid-century, always full of character. Amanda deep-cleans kitchens, baths and hardwoods slowly, canto por canto.",
    highlights: ["Hardwood & tile care", "Deep clean specialist", "Move-in / Move-out"],
  },
  {
    slug: "citrus-park",
    name: "Citrus Park",
    zips: ["33625"],
    blurb:
      "Citrus Park and Logan Gate residents book Amanda for turnkey residential cleaning — a fresh, quiet home to come back to every week.",
    highlights: ["Residential weekly", "Same-day WhatsApp reply", "Family-owned"],
  },
  {
    slug: "town-n-country",
    name: "Town 'N' Country",
    zips: ["33615", "33635"],
    blurb:
      "Right in Amanda's own neighborhood off Wilshire Dr. Local, fast and personal — from waterfront homes near Rocky Point to family houses along Hillsborough Ave.",
    highlights: ["Local — Amanda's home base", "Fastest scheduling", "Post-construction available"],
  },
  {
    slug: "odessa",
    name: "Odessa",
    zips: ["33556"],
    blurb:
      "Larger acreage homes in Odessa and Keystone need extra time and method. Amanda quotes each home in person to make sure the deep clean truly reaches every corner.",
    highlights: ["Larger homes", "Detailed deep cleaning", "In-person quotes"],
  },
  {
    slug: "lutz",
    name: "Lutz",
    zips: ["33548", "33549", "33558"],
    blurb:
      "From Cheval to Van Dyke, Lutz families book recurring cleanings and seasonal deep resets. Products are gentle and safe for kids and pets.",
    highlights: ["Recurring plans", "Seasonal deep clean", "Kid & pet-safe"],
  },
  {
    slug: "brandon",
    name: "Brandon",
    zips: ["33510", "33511"],
    blurb:
      "Brandon and Valrico homes — from Bloomingdale to Providence Lakes. Move in / move out cleanings for realtors and families ready for keys.",
    highlights: ["Move in / Move out", "Realtor-friendly", "Flexible schedule"],
  },
  {
    slug: "south-tampa",
    name: "South Tampa",
    zips: ["33606", "33609", "33611", "33629"],
    blurb:
      "Hyde Park, Palma Ceia, Bayshore and Davis Islands. Amanda treats every home with the same slow, considered care — no rotating crews.",
    highlights: ["Historic homes welcome", "Discreet & consistent", "One trusted person"],
  },
];

export const Route = createFileRoute("/areas-atendidas")({
  component: AreasPage,
  head: () => ({
    meta: [
      { title: "Cleaning Service Areas — Tampa, Westchase, Carrollwood & More | Amanda & Co." },
      {
        name: "description",
        content:
          "Amanda & Co. serves Tampa, Westchase, Carrollwood, Citrus Park, Town 'N' Country, Odessa, Lutz, Brandon and South Tampa. One trusted Brazilian cleaner, personal service across Hillsborough County.",
      },
      { property: "og:title", content: "Cleaning Service Areas in Tampa | Amanda & Co." },
      {
        property: "og:description",
        content:
          "Personal home cleaning across Tampa: Westchase, Carrollwood, Citrus Park, Town 'N' Country, Odessa, Lutz, Brandon and South Tampa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/areas-atendidas` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/areas-atendidas` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/areas-atendidas` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HouseCleaningService",
          name: "Amanda & Co. Boutique Home Cleaning",
          url: `${SITE_URL}/areas-atendidas`,
          telephone: "+1-813-364-9757",
          areaServed: AREAS.map((a) => ({
            "@type": "Place",
            name: `${a.name}, Tampa, FL`,
            address: {
              "@type": "PostalAddress",
              addressLocality: a.name,
              addressRegion: "FL",
              addressCountry: "US",
              postalCode: a.zips.join(", "),
            },
          })),
        }),
      },
    ],
  }),
});

function AreasPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SubPageHeader />


      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Hillsborough County · Florida
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
            Cleaning <em className="italic text-primary">across Tampa</em>,
            <br />
            one home at a time.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Amanda works with a small group of families all over the Tampa metro. Below are the
            neighborhoods where she cleans most often — if yours isn't listed, message her on
            WhatsApp and she'll tell you honestly.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            {AREAS.map((a, idx) => (
              <article
                key={a.slug}
                id={a.slug}
                className="border-t border-border pt-8"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")} · ZIP {a.zips.join(" · ")}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-tight md:text-3xl">
                  {a.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {a.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`${WHATSAPP}?text=${encodeURIComponent(
                      `Hi Amanda! I'm in ${a.name} and would love a quote.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
                  >
                    Quote for {a.name}
                  </a>
                  <Link
                    to="/servicos"
                    className="inline-flex items-center rounded-full border border-border px-4 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-muted"
                  >
                    See services ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Not sure if we cover you?
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
            Just <em className="italic text-primary">ask Amanda</em>.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            If your neighborhood isn't listed, send a quick WhatsApp — she'll tell you honestly
            whether she can take on your home this month.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
            >
              WhatsApp Amanda
            </a>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-muted"
            >
              Get instant estimate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
