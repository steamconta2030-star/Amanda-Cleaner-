import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/tidly/Nav";
import { NewsletterForm } from "@/components/tidly/NewsletterForm";
import { Testimonials } from "@/components/tidly/Testimonials";
import { listServices } from "@/lib/tidly.functions";

const SITE_URL = "https://amanda-cleaner.vercel.app";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Amaneat — Book cleaning in Tampa, FL by chat" },
      {
        name: "description",
        content:
          "AI-powered cleaning for Tampa homes, rentals and moves. Get a real quote and book in 60 seconds — no forms.",
      },
      { property: "og:title", content: "Amaneat — Book cleaning in Tampa by chat" },
      {
        property: "og:description",
        content:
          "Homes, Airbnbs, and moves in Tampa Bay. Quote and book in a single conversation.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HouseCleaningService",
          name: "Amaneat",
          url: SITE_URL,
          image: `${SITE_URL}/icon-512.png`,
          telephone: "+1-813-364-9757",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tampa",
            addressRegion: "FL",
            addressCountry: "US",
          },
          areaServed: [
            { "@type": "City", name: "Tampa" },
            { "@type": "AdministrativeArea", name: "Hillsborough County, FL" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How fast can I book a cleaning in Tampa?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most quotes take about 60 seconds by chat, and available times are shown before you confirm.",
              },
            },
            {
              "@type": "Question",
              name: "Do you clean Airbnb and short-term rentals?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — Airbnb and VRBO turnovers can include a photo checklist and STR calendar sync.",
              },
            },
            {
              "@type": "Question",
              name: "Do you offer move-in and move-out cleanings?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, move-in and move-out cleaning is available across the Tampa service area.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

const AUDIENCES = [
  {
    key: "home" as const,
    label: "My home",
    tagline: "Weekly, bi-weekly, or a one-time deep clean.",
    tag: "Families",
    emoji: "🏡",
  },
  {
    key: "rental" as const,
    label: "My rental",
    tagline: "Airbnb & VRBO turnovers with photo checklist.",
    tag: "Hosts",
    emoji: "🛎️",
  },
  {
    key: "move" as const,
    label: "Move in / out",
    tagline: "Detailed cleaning before or after a move.",
    tag: "Owners & agents",
    emoji: "📦",
  },
];

function Home() {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => listServices(),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <AudiencePicker />
      <HowItWorks />
      <ServicesGrid services={services} />
      <Testimonials />
      <NewsletterSection />
      <Cta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              <span className="text-muted-foreground">Now booking in Tampa Bay</span>
            </div>
            <h1
              className="mt-6 text-balance font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 0.95 }}
            >
              Book a cleaning by <span className="font-serif italic text-primary">chatting</span>. Not by filling forms.
            </h1>
            <p className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted-foreground">
              Tell Amaneat about your place — or send a couple of photos. You'll get a real price and open times in about 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/chat"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Start a quote →
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base text-foreground hover:bg-secondary"
              >
                How it works
              </a>
            </div>
            <div className="mt-10 text-sm text-muted-foreground">English · Español · Português</div>
          </div>
          <div className="md:col-span-5">
            <ChatMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatMock() {
  return (
    <div className="relative">
      <div className="rounded-[2rem] border border-border bg-card p-4 shadow-xl shadow-black/[0.04]">
        <div className="flex items-center gap-2 px-2 pb-3">
          <span className="h-2 w-2 rounded-full bg-primary/40" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">Amaneat chat</span>
        </div>
        <div className="space-y-2.5 rounded-2xl bg-secondary/60 p-4">
          <Bubble side="left">Hey! What are we cleaning?</Bubble>
          <Bubble side="right" primary>3 bed, 2 bath in Westchase. Bi-weekly.</Bubble>
          <Bubble side="left">Got it — <b>$149</b> every 2 weeks, ~2h 30m.<br />First slot: <b>Tue 9am</b>. Book it?</Bubble>
          <Bubble side="right" primary>Yes 🙌</Bubble>
          <div className="flex items-center gap-2 rounded-full bg-background px-3 py-2">
            <input disabled placeholder="Message Amaneat…" className="flex-1 bg-transparent text-sm text-muted-foreground outline-none" />
            <button type="button" disabled className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">→</button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-6 -top-4 hidden rotate-6 rounded-2xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg md:block">~60 seconds</div>
    </div>
  );
}

function Bubble({ side, primary = false, children }: { side: "left" | "right"; primary?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${primary ? "bg-primary text-primary-foreground" : "bg-background text-foreground"} ${side === "right" ? "rounded-br-md" : "rounded-bl-md"}`}>
        {children}
      </div>
    </div>
  );
}

function AudiencePicker() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What are we cleaning?</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Pick your fit — pricing adapts.</h2>
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <Link key={a.key} to="/chat" search={{ audience: a.key }} className="group rounded-3xl border border-border bg-card p-6 transition hover:border-primary/40 md:p-7">
              <div className="mb-6 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-2xl">{a.emoji}</span>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">{a.tag}</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{a.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.tagline}</p>
              <div className="mt-8 text-sm font-medium text-primary">Start chat →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Chat or upload photos", "Tell Amaneat your address, bedrooms, bathrooms, and cadence — or send photos."],
    ["02", "See your price", "Get a real estimate and open times without waiting for a callback."],
    ["03", "Confirm your time", "Sign in, choose an opening, and confirm your cleaning."],
  ];
  return (
    <section id="how-it-works" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Sixty seconds to a booked cleaning.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map(([n, title, body]) => (
            <div key={n}>
              <div className="flex items-baseline gap-3"><span className="font-serif text-2xl italic text-primary">{n}</span><div className="h-px flex-1 bg-border" /></div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({ services }: { services: { slug: string; name: string; audience: string; description: string; base_price_cents: number }[] }) {
  if (!services.length) return null;
  return (
    <section id="services" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Services</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Starting prices before the details.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.slug} className="rounded-[2rem] border border-border/70 bg-card p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{s.audience}</p>
              <h3 className="mt-5 font-serif text-2xl">{s.name}</h3>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-6 text-2xl font-semibold">${(s.base_price_cents / 100).toFixed(0)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <NewsletterForm source="home" title="Cleaning tips for Tampa homes" subtitle="One short email a month — cadence guides, host tips, and open slots. Unsubscribe anytime." />
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="rounded-[2.5rem] bg-foreground px-6 py-14 text-background md:px-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Ready when you are</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">Your next cleaning is one conversation away.</h2>
          <p className="mt-4 max-w-lg text-background/70">Serving Tampa, Westchase, Carrollwood, South Tampa, and nearby Hillsborough County communities.</p>
          <Link to="/chat" className="mt-8 inline-flex rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground">Start a quote →</Link>
        </div>
      </div>
    </section>
  );
}
