import { createFileRoute, Link } from "@tanstack/react-router";
import { SubPageHeader } from "@/components/SubPageHeader";
import { SubPageCta } from "@/components/SubPageCta";

const SITE_URL = "https://amanda-cleaning.lovable.app";
const WHATSAPP_URL = "https://wa.me/18133649757";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "How much does a home cleaning in Tampa cost?",
    a: "Most homes fall between $120 and $260 for a standard cleaning. The price depends on square footage, number of bedrooms and bathrooms, pets and the type of service (standard, deep, move in/out or post-construction). The concierge on our home page gives you a real estimate in about 60 seconds — no forms, no phone tag.",
  },
  {
    q: "What's the difference between a standard cleaning and a deep cleaning?",
    a: "A standard cleaning keeps an already-maintained home fresh: dusting, kitchen and bathrooms, floors, trash, made beds. A deep cleaning goes further into build-up areas — inside oven, inside fridge (on request), baseboards, doors, vents, detailed showers, cabinet fronts. If it's been more than 4–6 weeks since a professional cleaning, or if you're moving, start with a deep.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "No. Most clients give Amanda a code, hide-a-key or a smart lock code. She locks up when she's done and sends you a message with photos when everything is finished. If it's your first time, we recommend a quick walkthrough at the start so preferences are clear.",
  },
  {
    q: "Do you bring your own supplies and equipment?",
    a: "Yes — everything comes with us: eco-friendly cleaning products, microfiber cloths, vacuum, mop and buckets. If you prefer we use your own products (allergies, natural stone, specific brand), just tell us and we'll use yours.",
  },
  {
    q: "Are you insured?",
    a: "Yes. Amanda's Elite Services carries general liability insurance. If anything is ever damaged during a cleaning, we make it right — that's part of the trust we build with every client.",
  },
  {
    q: "How do I book a cleaning?",
    a: "The fastest way is WhatsApp — Amanda answers personally, usually within a few hours between 8am and 6pm, Monday to Saturday. You can also use the concierge on the home page to get a price first, then schedule.",
  },
  {
    q: "Can I schedule recurring cleanings (weekly, biweekly, monthly)?",
    a: "Yes, and recurring clients get a lower rate than one-time cleanings. Most families choose biweekly. We keep the same day and time so it becomes part of your routine — and, whenever possible, the same person cleaning your home every visit.",
  },
  {
    q: "What areas of Tampa do you serve?",
    a: "We serve most of the Tampa Bay area — Westchase, Carrollwood, Citrus Park, Town 'N' Country, Odessa, Lutz, Brandon and South Tampa. Not sure if we cover your ZIP? Send a message and we'll confirm right away.",
  },
  {
    q: "Do you clean if I have pets?",
    a: "Absolutely. We're used to homes with dogs and cats — just tell us their names and any behavior tips (which room they can be in, whether they can go outside). Pet hair on furniture and stairs is included; we can add extra pet-focused steps on request.",
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "Tell us within 24 hours and we come back to redo the areas that weren't right — no extra charge. Amanda personally reviews every job, so this rarely happens, but the guarantee is there.",
  },
  {
    q: "Do you offer move in / move out cleanings?",
    a: "Yes — it's one of our most-requested services. We clean the property empty: inside all cabinets and drawers, inside appliances, baseboards, windows from the inside, walls spot-cleaned. Great for tenants trying to get their deposit back, and for owners preparing a home for new residents.",
  },
  {
    q: "Do you clean short-term rentals (Airbnb / VRBO)?",
    a: "Yes. We do turnover cleanings between guests, restock basics on request (paper, soap, coffee) and send photos when the property is ready. Reliable, on time, and consistent — which is what protects your reviews.",
  },
  {
    q: "How do I pay?",
    a: "We accept Zelle, Venmo, cash, and card (a small processing fee applies to cards). Payment is due after the cleaning is finished. For recurring clients, we keep it simple — same method every visit unless you tell us otherwise.",
  },
  {
    q: "What time will you arrive?",
    a: "We book windows, not exact times — usually a 30 to 60-minute arrival window (e.g. \"between 9:30 and 10:00 am\"). Amanda sends a message when she's on the way so you're never left guessing.",
  },
  {
    q: "Can I tip? Is it expected?",
    a: "Tips are never expected but always appreciated. The easiest way is to add it to your Zelle/Venmo payment. What matters more to Amanda: refer a friend or leave a Google review — that's what keeps her small business going.",
  },
];

export const Route = createFileRoute("/perguntas-frequentes")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — Home Cleaning in Tampa, FL | Amanda & Co." },
      {
        name: "description",
        content:
          "Answers to the 15 most common questions about home cleaning in Tampa: pricing, deep vs standard, keys, pets, insurance, move in/out, Airbnb turnovers and more.",
      },
      { property: "og:title", content: "FAQ — Tampa Home Cleaning by Amanda" },
      {
        property: "og:description",
        content:
          "Pricing, deep vs standard, keys, pets, insurance, Airbnb turnovers — everything you'd ask before booking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/perguntas-frequentes` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/perguntas-frequentes` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/perguntas-frequentes` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function FAQPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SubPageHeader />


      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Tampa, Florida — FAQ
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-6xl">
            Everything you'd ask before <em className="italic text-primary">letting us in</em>.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            The real questions clients ask — pricing, keys, pets, insurance, guarantees. If your
            question isn't here, message Amanda directly.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <div className="divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => (
              <details key={i} className="group py-6" open={i < 3}>
                <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 font-serif text-xl md:text-2xl">{f.q}</h2>
                  </div>
                  <span className="mt-2 shrink-0 text-2xl leading-none text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SubPageCta
        eyebrow="Still have a question?"
        title={<>Ask <em className="italic text-primary">Amanda</em> directly.</>}
        description="WhatsApp is the fastest — she replies personally, usually within a few hours."
        primary={{ label: "Message on WhatsApp", href: WHATSAPP_URL, external: true }}
        secondary={{ label: "All contact options", to: "/contato" }}
      />
    </main>
  );
}
