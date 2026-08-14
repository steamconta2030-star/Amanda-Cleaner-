import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/tidly/Nav";

export const Route = createFileRoute("/host")({
  head: () => ({
    meta: [
      { title: "Amaneat for Airbnb Hosts — Turnover cleaning in Tampa" },
      {
        name: "description",
        content:
          "Airbnb and short-term rental turnover cleaning in Tampa, Florida. Photo reports, linen restock, damage alerts, and fast booking by chat.",
      },
      { property: "og:title", content: "Amaneat for Airbnb hosts in Tampa" },
      { property: "og:description", content: "Turnover cleaning built for Tampa short-term rentals." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HostPage,
});

const BENEFITS = [
  {
    title: "Photo report every turnover",
    body: "Every room documented. Know the property is guest-ready before your check-in window.",
  },
  {
    title: "Linen change + restock",
    body: "Fresh linens and agreed amenities such as soap, paper goods, and coffee can be reset between guests.",
  },
  {
    title: "Damage & low-stock alerts",
    body: "Your cleaner can flag visible issues or supplies that need attention so you can act before the next guest arrives.",
  },
  {
    title: "Same-day slots",
    body: "Back-to-back bookings? Turnovers with tight windows can be prioritized when availability allows.",
  },
];

function HostPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">For hosts</p>
          <h1 className="mt-3 font-serif text-4xl italic tracking-tight text-foreground md:text-5xl">
            Turnovers, handled.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Amaneat is built for Airbnb, Vrbo, and short-term rental hosts in Tampa. Consistent
            cleaning, photo handoffs, restock notes, and clear pricing per turnover.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/chat"
              search={{ audience: "rental" }}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get a turnover quote
            </Link>
            <Link
              to="/pricing"
              className="rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              See pricing
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-semibold text-foreground">{b.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>

        <section className="mt-20 rounded-3xl bg-primary/5 p-8 md:p-12">
          <h2 className="font-serif text-3xl italic tracking-tight text-foreground">
            Manage turnovers from your phone
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Import your rental calendar, organize upcoming check-outs, and start a Tampa turnover booking from Amaneat.
          </p>
          <Link
            to="/chat"
            search={{ audience: "rental" }}
            className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/85"
          >
            Book your first turnover
          </Link>
        </section>
      </main>
    </div>
  );
}