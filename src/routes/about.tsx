import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/tidly/Nav";

const SITE_URL = "https://amanda-cleaning.lovable.app";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Amaneat — Cleaning by chat in Tampa" },
      { name: "description", content: "Amaneat is a Tampa cleaning service built around fast chat quotes, photo checklists, and a small team that cares about the details." },
      { property: "og:title", content: "About Amaneat — Cleaning by chat in Tampa" },
      { property: "og:description", content: "A Tampa cleaning company focused on fast quotes, reliable service, and clean handoffs." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link><span className="mx-1.5">/</span><span className="text-foreground">About</span></nav>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">A Tampa cleaning team built around trust and clean handoffs.</h1>
        <p className="mt-5 text-base text-muted-foreground md:text-lg">Amaneat makes it easier to book reliable home cleaning in Tampa. Tell us about the space — or send photos — and get a clear quote and available times without a long form or back-and-forth calls.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Value k="Chat over forms" v="Describe the place or send photos. We use that to build the quote." />
          <Value k="Clear pricing" v="See your estimate before you confirm the booking." />
          <Value k="Photo handoff" v="Photo checklists help document completed rooms and rental turnovers." />
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-card p-5"><p className="text-xs uppercase tracking-widest text-muted-foreground">Service area</p><p className="mt-2 text-sm">Tampa, Florida and nearby communities across Hillsborough County. Ask by chat if you are near the edge of the service area.</p></div>
        <div className="mt-10 flex flex-wrap gap-3"><Link to="/chat" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/85">Get a quote</Link><Link to="/services" className="rounded-full border border-input px-5 py-2.5 text-sm font-medium hover:bg-secondary">See services</Link></div>
      </section>
    </div>
  );
}

function Value({ k, v }: { k: string; v: string }) { return <div className="rounded-2xl border border-border bg-card p-5"><p className="text-sm font-semibold tracking-tight">{k}</p><p className="mt-1 text-sm text-muted-foreground">{v}</p></div>; }
