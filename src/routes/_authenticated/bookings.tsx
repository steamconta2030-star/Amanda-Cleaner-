import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/tidly/Nav";

export const Route = createFileRoute("/_authenticated/bookings")({
  component: BookingsPage,
  head: () => ({
    meta: [
      { title: "Your bookings — Tidly" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function BookingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Your account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Your bookings
        </h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          No bookings yet. Start a quote and we'll show them here.
        </p>
        <div className="mt-8">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Get a quote
          </Link>
        </div>
      </section>
    </div>
  );
}
