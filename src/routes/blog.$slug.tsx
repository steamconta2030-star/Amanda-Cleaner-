import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, POSTS } from "@/lib/blog-posts";

const SITE_URL = "https://amanda-cleaning.lovable.app";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: BlogPostPage,
  notFoundComponent: PostNotFound,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Post not found — Amanda & Co." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — Amanda & Co.` },
        { name: "description", content: post.excerpt },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: "Amanda" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Person", name: "Amanda", url: `${SITE_URL}/sobre` },
            publisher: {
              "@type": "Organization",
              name: "Amanda & Co. Boutique Home Cleaning",
              url: SITE_URL,
            },
            mainEntityOfPage: url,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const others = POSTS.filter((p) => p.slug !== post.slug);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-2xl px-6 py-16 md:px-10 md:py-24">
        <Link
          to="/blog"
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          ← Blog
        </Link>
        <header className="mt-8">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime} read</span>
          </div>
          <h1 className="mt-3 font-serif text-4xl italic tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        </header>
        <div className="mt-10">{post.content()}</div>

        <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
          <p className="font-serif text-xl italic">Want the same care in your home?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Amanda personally handles every clean. Tampa &amp; nearby.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://wa.me/18133649757?text=Hi%20Amanda!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-primary-foreground hover:opacity-90"
            >
              WhatsApp
            </a>
            <Link
              to="/"
              hash="quote"
              className="inline-flex rounded-full border border-foreground/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:border-foreground"
            >
              Request a quote
            </Link>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-16">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Keep reading
            </p>
            <ul className="mt-4 space-y-4">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block"
                  >
                    <p className="font-serif text-xl group-hover:text-primary">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}

function PostNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center md:px-10">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-3 font-serif text-4xl italic">Post not found</h1>
      <p className="mt-4 text-muted-foreground">That article doesn't exist — it may have moved.</p>
      <Link
        to="/blog"
        className="mt-8 inline-flex rounded-full border border-foreground/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:border-foreground"
      >
        ← Back to blog
      </Link>
    </div>
  );
}
