import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/tidly/Nav";
import { TESTIMONIALS } from "@/components/tidly/Testimonials";
import { NewsletterForm } from "@/components/tidly/NewsletterForm";

const SITE_URL = "https://amanda-cleaning.lovable.app";

const AGG = {
  rating: 4.9,
  count: 128,
};

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [
      { title: "Reviews — Tidly Tampa cleaning (4.9★)" },
      {
        name: "description",
        content:
          "Real reviews from Tampa families, Airbnb hosts, and move-out clients. See why Tidly holds a 4.9-star average.",
      },
      { property: "og:title", content: "Tidly reviews — 4.9★ in Tampa" },
      {
        property: "og:description",
        content: "Homes, rentals, and moves — what Tampa customers say about Tidly.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/reviews` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Reviews",
              item: `${SITE_URL}/reviews`,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HouseCleaningService",
          name: "Tidly",
          url: SITE_URL,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: AGG.rating,
            reviewCount: AGG.count,
          },
          review: TESTIMONIALS.map((t) => ({
            "@type": "Review",
            author: { "@type": "Person", name: t.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: t.rating,
              bestRating: 5,
            },
            reviewBody: t.quote,
          })),
        }),
      },
    ],
  }),
});

function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / <span className="text-foreground">Reviews</span>
        </nav>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Reviews
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          {AGG.rating}★ across {AGG.count}+ Tampa cleanings.
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Honest words from homeowners, Airbnb hosts and renters we work with
          every week.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-primary" aria-label={`${t.rating} stars`}>
                  {"★★★★★".slice(0, t.rating)}
                </span>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.tag}
                </span>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{t.name}</span> ·{" "}
                {t.area}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14">
          <NewsletterForm
            source="reviews"
            title="Get one great cleaning tip a month"
            subtitle="Actionable, Tampa-specific, and short. Unsubscribe anytime."
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/chat"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Start a quote
          </Link>
          <Link
            to="/services"
            className="rounded-full border border-input px-6 py-3 text-sm font-medium hover:bg-secondary"
          >
            See services
          </Link>
        </div>
      </section>
    </div>
  );
}
