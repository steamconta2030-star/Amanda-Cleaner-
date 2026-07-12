import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/tidly/Nav";
import {
  listMyBookings,
  cancelBooking,
  getBookingIcs,
  type Booking,
} from "@/lib/tidly.functions";

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
  const fetchBookings = useServerFn(listMyBookings);
  const cancelFn = useServerFn(cancelBooking);
  const icsFn = useServerFn(getBookingIcs);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => fetchBookings(),
  });

  const bookings: Booking[] = data ?? [];

  async function handleCancel(id: string) {
    if (!confirm("Cancel this booking?")) return;
    await cancelFn({ data: { id } });
    qc.invalidateQueries({ queryKey: ["my-bookings"] });
  }

  async function handleDownloadIcs(id: string) {
    const { filename, ics } = await icsFn({ data: { id } });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Your account
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Your bookings
          </h1>
          <Link
            to="/host"
            className="text-sm text-muted-foreground underline hover:text-foreground"
          >
            Rental host? Import your Airbnb calendar →
          </Link>
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading…</p>
        ) : bookings.length === 0 ? (
          <div className="mt-6">
            <p className="max-w-lg text-muted-foreground">
              No bookings yet. Start a quote and we'll show them here.
            </p>
            <div className="mt-6">
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get a quote
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {b.audience === "home"
                        ? "Home"
                        : b.audience === "rental"
                          ? "Rental"
                          : "Move"}{" "}
                      · {b.service_slug}
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight">
                      {new Date(b.scheduled_at).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {b.address_line1}, {b.city} {b.zip}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      ${(b.price_cents / 100).toFixed(0)}
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${
                        b.status === "confirmed"
                          ? "bg-primary/10 text-primary"
                          : b.status === "cancelled"
                            ? "bg-destructive/10 text-destructive"
                            : b.status === "completed"
                              ? "bg-secondary text-muted-foreground"
                              : "bg-secondary text-foreground"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
                {b.status !== "cancelled" && b.status !== "completed" && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleDownloadIcs(b.id)}
                      className="rounded-full border border-input bg-background px-3.5 py-1.5 text-xs font-medium hover:bg-accent"
                    >
                      Add to calendar
                    </button>
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="rounded-full border border-input bg-background px-3.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
