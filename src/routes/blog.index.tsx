import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://amanda-cleaning.lovable.app";

const POSTS = [
  {
    slug: "move-out-cleaning-checklist-tampa",
    title: "Move-out cleaning checklist for Tampa renters",
    excerpt:
      "Exactly what a landlord in Hillsborough County looks for before returning your deposit — room by room.",
    date: "2026-06-14",
    readingTime: "6 min",
  },
  {
    slug: "deep-vs-regular-cleaning",
    title: "Deep cleaning vs. regular cleaning: which one do you need?",
    excerpt:
      "A plain-English guide to knowing when a regular tidy is enough and when your home is asking for the deeper reset.",
    date: "2026-06-28",
    readingTime: "5 min",
  },
] as const;

export const Route = createFileRoute("/blog")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Blog — Home cleaning notes from Tampa | Amanda & Co." },
      {
        name: "description",
        content:
          "Practical, honest notes on keeping a home well cared for — checklists, guides and Brazilian capricho, from Amanda in Tampa, FL.",
      },
      { property: "og:title", content: "Amanda & Co. — Home cleaning notes from Tampa" },
      {
        property: "og:description",
        content:
          "Practical, honest cleaning notes and checklists from a Brazilian-owned boutique in Tampa, FL.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          url: `${SITE_URL}/blog`,
          name: "Amanda & Co. Blog",
          blogPost: POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }),
      },
    ],
  }),
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
        <Link
          to="/"
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          ← Amanda &amp; Co.
        </Link>
        <h1 className="mt-8 font-serif text-4xl italic tracking-tight md:text-5xl">
          Notes from the field
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Practical, unhurried writing on how we clean — checklists, guides and the little details
          that make a home feel cared for.
        </p>

        <ul className="mt-16 divide-y divide-border border-y border-border">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block py-8 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <time dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{p.readingTime} read</span>
                </div>
                <h2 className="mt-2 font-serif text-2xl tracking-tight md:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
                <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
