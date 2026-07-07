import { createFileRoute } from "@tanstack/react-router";
import heroImage from "../assets/hero.jpg";
import aboutImage from "../assets/about.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE_DISPLAY = "+1 (813) 364-9757";
const PHONE_TEL = "+18133649757";
const PHONE_E164 = "18133649757";
const EMAIL = "amandaanalaura19@gmail.com";
const WHATSAPP_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent("Hi Amanda, I'd like to book a cleaning.")}`;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Concept />
      <About />
      <Services />
      <Pricing />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a href="#top" className="font-serif text-xl tracking-tight">
          Amanda <span className="italic text-primary">&amp;</span> Co.
        </a>
        <nav className="hidden items-center gap-10 text-sm text-muted-foreground md:flex">
          <a href="#top" className="hover:text-foreground transition-colors">Home</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#servicos" className="hover:text-foreground transition-colors">Services</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#processo" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-32 pb-20 md:grid-cols-2 md:gap-16 md:px-10 md:pt-40 md:pb-32">
        <div className="flex flex-col justify-center">
          <span className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Boutique home cleaning · Florida
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            The care your home <em className="italic text-primary">deserves.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Personalized cleaning services from Amanda — with the attention to detail and trust you're looking for.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Book on WhatsApp
              <span aria-hidden>→</span>
            </a>
            <a href="#servicos" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              See services
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={heroImage}
              alt="Calm, sunlit interior"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-[16rem] rounded-sm bg-background p-5 shadow-sm ring-1 ring-border md:block">
            <p className="font-serif text-lg italic leading-snug">
              "My home feels like it can finally breathe after Amanda leaves."
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">— Client of 2 years</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Concept() {
  const items = [
    {
      title: "Attention to detail",
      desc: "Every corner, every surface. The work is done slowly, with method and a critical eye.",
    },
    {
      title: "Carefully chosen products",
      desc: "Gentle, effective formulas with a beautiful scent. Respectful of your home, your family and your pets.",
    },
    {
      title: "Complete trust",
      desc: "One person taking care of your home. No rotating crews, no strangers — just someone you can rely on.",
    },
  ];
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">My approach</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            It's not just cleaning. It's <em className="italic text-primary">caring</em>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          {items.map((item, i) => (
            <div key={item.title} className="border-t border-foreground/20 pt-6">
              <span className="font-serif text-sm italic text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-snug">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      name: "Residential Cleaning",
      desc: "Regular weekly or bi-weekly cleanings to keep your home effortlessly fresh and cared for.",
    },
    {
      name: "Deep Cleaning",
      desc: "A detailed, top-to-bottom clean — inside the oven, fridge and every corner routine doesn't reach.",
    },
    {
      name: "Move In / Move Out",
      desc: "Turnover cleaning for empty homes, ready for the next chapter — yours or your buyer's.",
    },
    {
      name: "Post-Construction",
      desc: "Dust, debris and film removed after renovation or new construction, safely and thoroughly.",
    },
    {
      name: "Commercial Cleaning",
      desc: "Offices, studios and small businesses in the Tampa area — kept spotless on your schedule.",
    },
  ];
  return (
    <section id="servicos">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Services</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              Choose what your home needs.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every service is tailored to you. We go over the details by message before the first visit.
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-b border-border">
          {services.map((s, i) => (
            <li key={s.name} className="group grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
                0{i + 1}
              </div>
              <h3 className="font-serif text-2xl md:col-span-4 md:text-3xl">{s.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{s.desc}</p>
              <div className="md:col-span-1 md:text-right">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
                >
                  Request
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Regular Cleaning",
      price: "$150",
      unit: "starting at",
      desc: "2 bedrooms · 2 bathrooms · standard residential cleaning.",
    },
    {
      name: "Deep Cleaning",
      price: "$300",
      unit: "starting at",
      desc: "2 bedrooms · 2 bathrooms · includes inside oven and refrigerator.",
      featured: true,
    },
    {
      name: "Move In / Move Out",
      price: "$250",
      unit: "starting at",
      desc: "2 bedrooms · 2 bathrooms · includes inside oven and refrigerator.",
    },
  ];
  return (
    <section id="pricing" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pricing</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              Honest, <em className="italic text-primary">up-front</em> pricing.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every home is different. I prefer to visit and give you an exact quote, but online estimates are welcome too.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col justify-between rounded-sm border p-8 transition-colors ${
                p.featured
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-background"
              }`}
            >
              <div>
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-5xl">{p.price}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {p.unit}
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 opacity-80 hover:opacity-100"
              >
                Request a quote <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
          Post-construction and commercial cleanings are quoted individually — message for details.
        </p>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "1", title: "Pick a day", desc: "Send a message with the date that works best for you." },
    { n: "2", title: "We go over the details", desc: "Space, priorities and preferences — all tailored to you." },
    { n: "3", title: "Relax", desc: "While Amanda takes care of everything, quietly and with care." },
  ];
  return (
    <section id="processo" className="border-t border-border bg-accent/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">How it works</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Simple, from start to finish.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-serif text-6xl italic text-primary/70 md:text-7xl">{s.n}</div>
              <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-foreground/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-2xl italic md:text-3xl">
            Ready to come home to a fresh space?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Book on WhatsApp
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={aboutImage}
              alt="Amanda preparing fresh linens by a sunlit window"
              width={1200}
              height={1500}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center md:col-span-7">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Meet Amanda</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            A personal touch you can <em className="italic text-primary">feel</em>.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I'm Amanda — the person behind every cleaning, from the first message to the moment you walk back into your fresh, quiet home.
            </p>
            <p>
              I built this small boutique service because I believe your home deserves more than a rushed checklist. It deserves attention, calm and honest care — the kind you'd give it yourself if you had the time.
            </p>
            <p>
              Working with a small handful of families across Florida means I know your space, your preferences and your routines. No surprises, just a home that feels like home again.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-foreground/15 pt-8 text-sm">
            <div>
              <div className="font-serif text-3xl">5+</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Years of care</div>
            </div>
            <div>
              <div className="font-serif text-3xl">40+</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Homes trusted</div>
            </div>
            <div>
              <div className="font-serif text-3xl">1:1</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Personal service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      quote: "Amanda treats our home like it's her own. Coming back on a cleaning day is my favorite part of the week.",
      name: "Isabela M.",
      role: "Client · Tampa",
    },
    {
      quote: "The attention to detail is something else. Little touches everywhere — folded corners, fresh scent, everything in its place.",
      name: "Rachel P.",
      role: "Client · Orlando",
    },
    {
      quote: "Reliable, kind and incredibly thorough. I finally trust one person with the keys and I never worry.",
      name: "Daniela R.",
      role: "Client · Clearwater",
    },
  ];
  return (
    <section id="testimonials" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Kind words</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Trusted by families across <em className="italic text-primary">Florida</em>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {quotes.map((q) => (
            <figure key={q.name} className="flex flex-col border-t border-foreground/20 pt-6">
              <blockquote className="font-serif text-xl leading-snug md:text-2xl">
                <span className="text-primary">"</span>
                {q.quote}
                <span className="text-primary">"</span>
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium text-foreground">{q.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Let's <em className="italic text-primary">talk</em>.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Send a quick message and Amanda will get back to you personally to plan the details of your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          <div className="border-t border-foreground/20 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-4 block font-serif text-2xl leading-snug transition-colors hover:text-primary"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Available Mon–Sat, 8am – 6pm.
            </p>
          </div>

          <div className="border-t border-foreground/20 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 block font-serif text-2xl leading-snug transition-colors hover:text-primary break-all"
            >
              {EMAIL}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For quotes, questions and custom requests.
            </p>
          </div>

          <div className="border-t border-foreground/20 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</span>
            <p className="mt-4 font-serif text-2xl leading-snug">
              The easiest way.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Message on WhatsApp
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-foreground/15 pt-8 md:mt-20">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Service area</span>
          <p className="mt-4 max-w-xl font-serif text-xl leading-snug md:text-2xl">
            Based in Tampa, Florida — serving Tampa and surrounding areas.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
        <p className="font-serif text-lg">
          Amanda <span className="italic text-primary">&amp;</span> Co.
        </p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} — Personalized home cleaning · Florida
        </p>
      </div>
    </footer>
  );
}
