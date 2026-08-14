import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/tidly/Nav";
import { TESTIMONIALS } from "@/components/tidly/Testimonials";

const SITE_URL = "https://amanda-cleaning.lovable.app";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [
      { title: "Client stories — Amaneat Tampa cleaning" },
      { name: "description", content: "Client stories from the earlier Tampa version of Amaneat, covering home cleaning, Airbnb turnovers, and move-out cleaning." },
      { property: "og:title", content: "Client stories — Amaneat Tampa cleaning" },
      { property: "og:description", content: "Home, Airbnb, and move-out cleaning experiences in Tampa." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/reviews` }],
  }),
});

function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground"><Link to="/">Home</Link><span className="mx-1.5">/</span><span>Reviews</span></nav>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Client stories</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">Tampa cleaning experiences.</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">These stories were recovered from an earlier Tampa version of the project. We are keeping the presentation conservative while the original review sources are re-verified.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((r) => (
            <article key={r.name} className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-3"><span className="text-primary">★★★★★</span><span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">{r.tag}</span></div>
              <p className="mt-5 font-serif text-lg italic leading-relaxed">“{r.quote}”</p>
              <p className="mt-6 text-sm font-semibold">{r.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{r.area}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-primary/5 p-8 text-center"><h2 className="text-2xl font-semibold">Ready for your own clean?</h2><p className="mt-2 text-sm text-muted-foreground">Tell Amaneat about the space and get a Tampa-area quote by chat.</p><Link to="/chat" className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Get a quote</Link></div>
      </section>
    </div>
  );
}
