import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/tidly/Nav";
import { Logo } from "@/components/tidly/Logo";
import { NewsletterForm } from "@/components/tidly/NewsletterForm";
import { listServices } from "@/lib/tidly.functions";

const SITE_URL = "https://amanda-cleaning.lovable.app";
const PHONE = "+1-813-364-9757";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Amaneat — House cleaning in Tampa by chat" },
      {
        name: "description",
        content:
          "House cleaning in Tampa, FL for homes, Airbnbs, and moves. Get a real quote and available times by chat in about 60 seconds.",
      },
      { property: "og:title", content: "Amaneat — House cleaning in Tampa by chat" },
      {
        property: "og:description",
        content:
          "Homes, Airbnbs, and move-in or move-out cleaning across Tampa. Get a quote and book in one conversation.",
      },
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
          telephone: PHONE,
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
              name: "How quickly can I book a cleaning in Tampa?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most quotes take about 60 seconds by chat, and available times are shown before you confirm.",
              },
            },
            {
              "@type": "Question",
              name: "Do you clean Airbnbs and short-term rentals?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Airbnb and short-term rental turnovers can include checklists, photos, and recurring scheduling.",
              },
            },
            {
              "@type": "Question",
              name: "Do you offer move-in and move-out cleaning?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Move-in and move-out cleaning is available for homes and rentals across the Tampa area.",
              },
            },
            {
              "@type": "Question",
              name: "How is the price calculated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Your quote is based on the size of the property, service type, frequency, and any extras before you confirm.",
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
    tagline: "Airbnb turnover cleaning with checklist and photos.",
    tag: "Hosts",
    emoji: "🛎️",
  },
  {
    key: "move" as const,
    label: "Move / post-construction",
    tagline: "Detailed cleaning before move-in, move-out, or after renovation.",
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
      <NewsletterSection />
      <Cta />
      <Footer />
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
              <span className="text-muted-foreground">Serving Tampa & Hillsborough County</span>
            </div>
            <h1
              className="mt-6 text-balance font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 0.95 }}
            >
              Book your cleaning <span className="font-serif italic text-primary">by chatting</span>.
              No forms.
            </h1>
            <p className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted-foreground">
              Tell Amaneat about your home — or send a few photos. Get a real quote and available times in about 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/chat"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Get a quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base text-foreground hover:bg-secondary">
                How it works
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span>English · Português · Español</span>
            </div>
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
          <div className="h-2 w-2 rounded-full bg-primary/40" aria-hidden />
          <div className="h-2 w-2 rounded-full bg-muted-foreground/25" aria-hidden />
          <div className="h-2 w-2 rounded-full bg-muted-foreground/25" aria-hidden />
          <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">Amaneat chat</span>
        </div>
        <div className="space-y-2.5 rounded-2xl bg-secondary/60 p-4">
          <Bubble side="left">Hi! What are we cleaning?</Bubble>
          <Bubble side="right" tone="primary">3 bedrooms, 2 bathrooms in South Tampa. Bi-weekly.</Bubble>
          <Bubble side="left">
            Great — <b>$149</b> every 2 weeks, about 2.5 hours.
            <br />
            First opening: <b>Tue 9:00 AM</b>. Want it?
          </Bubble>
          <Bubble side="right" tone="primary">Yes 🙌</Bubble>
          <div className="flex items-center gap-2 rounded-full bg-background px-3 py-2">
            <input disabled placeholder="Message Amaneat…" className="flex-1 bg-transparent text-sm text-muted-foreground outline-none" />
            <button type="button" disabled className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground" aria-label="Send">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-6 -top-4 hidden rotate-6 rounded-2xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg md:block">
        ~60 seconds
      </div>
    </div>
  );
}

function Bubble({ side, tone = "muted", children }: { side: "left" | "right"; tone?: "muted" | "primary"; children: React.ReactNode }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${tone === "primary" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"} ${isRight ? "rounded-br-md" : "rounded-bl-md"}`}>
        {children}
      </div>
    </div>
  );
}

function AudiencePicker() {
  return (
    <section id="audience" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What are we cleaning?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Choose your situation — the quote adapts.</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <Link key={a.key} to="/chat" search={{ audience: a.key }} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-black/[0.03] md:p-7">
              <div className="mb-6 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-2xl" aria-hidden>{a.emoji}</span>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">{a.tag}</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{a.label}</h3>
              <p className="mt-2 max-w-[24ch] text-sm text-muted-foreground">{a.tagline}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary">Open chat →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Chat or send photos", body: "Tell us the address, bedrooms, bathrooms, and frequency — or send photos of the space." },
    { n: "02", title: "See your quote", body: "Get an estimate and available times without waiting for a callback." },
    { n: "03", title: "Confirm your time", body: "Sign in, choose an opening, and confirm your cleaning in a few taps." },
  ];
  return (
    <section id="how-it-works" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">From hello to booked in about 60 seconds.</h2>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="flex items-baseline gap-3"><span className="font-serif text-2xl italic text-primary">{s.n}</span><div className="h-px flex-1 bg-border" aria-hidden /></div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.body}</p>
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
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Services</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Starting prices before the details.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">Your final quote is calculated in chat based on property size, service type, and frequency.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div key={s.slug} className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <span aria-hidden className="pointer-events-none absolute right-6 top-6 font-serif text-[11px] italic tracking-[0.2em] text-muted-foreground/60">{String(i + 1).padStart(2, "0")}/{String(services.length).padStart(2, "0")}</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {s.audience === "home" ? "Home" : s.audience === "rental" ? "Rental" : "Move"}
                </p>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-normal leading-tight tracking-tight text-foreground">{s.name}</h3>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <div className="mt-auto pt-7">
                <div className="h-px w-8 bg-border transition-all duration-500 group-hover:w-16 group-hover:bg-primary" />
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-sm italic text-muted-foreground">starting at</span>
                  <span className="font-serif text-xs italic text-primary">$</span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">{(s.base_price_cents / 100).toFixed(0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-14 text-background md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/40 blur-3xl" aria-hidden />
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">Whenever you are ready</p>
          <h2 className="mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">Your next clean is one conversation away.</h2>
          <p className="mt-4 max-w-lg text-background/70">Serving Tampa and nearby communities across Hillsborough County.</p>
          <div className="mt-8">
            <Link to="/chat" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90">Get a quote →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-3"><Logo className="text-lg" /><span>· Tampa, FL</span></div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#how-it-works" className="hover:text-foreground">How it works</a>
          <a href="#services" className="hover:text-foreground">Services</a>
          <Link to="/chat" className="hover:text-foreground">Get a quote</Link>
          <Link to="/auth" className="hover:text-foreground">Sign in</Link>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Amaneat</p>
      </div>
    </footer>
  );
}

function NewsletterSection() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <NewsletterForm
          source="home"
          title="Cleaning tips for Tampa homes"
          subtitle="One short email a month — cleaning routines, hosting tips, and occasional openings. Unsubscribe anytime."
        />
      </div>
    </section>
  );
}
