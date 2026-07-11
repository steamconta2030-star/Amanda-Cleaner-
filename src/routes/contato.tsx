import { createFileRoute, Link } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/SubPageHeader";
import { SubPageCta } from "@/components/SubPageCta";

const SITE_URL = "https://amanda-cleaning.lovable.app";
const WHATSAPP_URL = "https://wa.me/18133649757";
const PHONE_DISPLAY = "+1 (813) 364-9757";
const PHONE_TEL = "+18133649757";
const EMAIL = "amandaanalaura19@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/amandas_elite_services_";

export const Route = createFileRoute("/contato")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Amanda — Home Cleaning in Tampa, FL | Amanda & Co." },
      {
        name: "description",
        content:
          "Talk to Amanda directly: WhatsApp, phone or email. Personal home cleaning in Tampa, FL — replies within a few hours, Mon–Sat, 8am–6pm.",
      },
      { property: "og:title", content: "Contact Amanda — Tampa Home Cleaning" },
      {
        property: "og:description",
        content:
          "WhatsApp, phone or email — Amanda replies personally, usually within a few hours. Mon–Sat, 8am–6pm.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contato` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contato` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contato` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/contato`,
          mainEntity: {
            "@type": "HouseCleaningService",
            name: "Amanda & Co. Boutique Home Cleaning",
            telephone: PHONE_TEL,
            email: EMAIL,
            areaServed: { "@type": "City", name: "Tampa" },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "18:00",
              },
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: PHONE_TEL,
                contactType: "customer service",
                areaServed: "US-FL",
                availableLanguage: ["English", "Portuguese"],
              },
            ],
          },
        }),
      },
    ],
  }),
});

type Channel = {
  label: string;
  value: string;
  note: string;
  href: string;
  cta: string;
};

const CHANNELS: Channel[] = [
  {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    note: "Fastest — usually a reply within a few hours, Mon–Sat.",
    href: WHATSAPP_URL,
    cta: "Open WhatsApp",
  },
  {
    label: "Phone",
    value: PHONE_DISPLAY,
    note: "Mon–Sat, 8am – 6pm.",
    href: `tel:${PHONE_TEL}`,
    cta: "Call Amanda",
  },
  {
    label: "Email",
    value: EMAIL,
    note: "For custom quotes, invoices or longer requests.",
    href: `mailto:${EMAIL}`,
    cta: "Send email",
  },
  {
    label: "Instagram",
    value: "@amandas_elite_services_",
    note: "Real work, real homes, before & after.",
    href: INSTAGRAM_URL,
    cta: "Follow on Instagram",
  },
];

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SubPageHeader />


      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Tampa, Florida — Contact
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
            Talk to <em className="italic text-primary">Amanda</em>,
            <br />
            not a call center.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Every message is answered personally by Amanda. Choose the channel that's easiest for
            you — WhatsApp is the fastest.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            {CHANNELS.map((c, idx) => (
              <article key={c.label} className="border-t border-border pt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")} · {c.label}
                </p>
                <p className="mt-3 font-serif text-2xl md:text-3xl">{c.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-5 inline-flex items-center rounded-full bg-primary px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
                >
                  {c.cta}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Service area
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Based in Tampa, FL — serving Westchase, Carrollwood, Citrus Park, Town 'N' Country,
                Odessa, Lutz, Brandon and South Tampa.{" "}
                <Link to="/areas-atendidas" className="underline underline-offset-4 hover:text-foreground">
                  See all areas ↗
                </Link>
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Hours
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Monday to Saturday · 8:00 am – 6:00 pm.
                <br />
                Closed on Sundays.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Prefer numbers first?
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
            Get an <em className="italic text-primary">instant estimate</em>.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            The concierge on our home page gives you a real price in 60 seconds — no forms, no
            phone tag.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
            >
              Get my estimate
            </Link>
            <Link
              to="/servicos"
              className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-muted"
            >
              See services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
