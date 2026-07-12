import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/tidly/Nav";
import {
  adminListBookings,
  adminListLeads,
  adminUpdateBookingStatus,
  amIAdmin,
  type AdminBooking,
  type AdminLead,
} from "@/lib/tidly.functions";


export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin — Tidly" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;
type Status = (typeof STATUSES)[number];

function AdminPage() {
  const checkAdminFn = useServerFn(amIAdmin);
  const listFn = useServerFn(adminListBookings);
  const leadsFn = useServerFn(adminListLeads);
  const updateFn = useServerFn(adminUpdateBookingStatus);
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");

  const { data: isAdmin, isLoading: checking } = useQuery({
    queryKey: ["am-i-admin"],
    queryFn: () => checkAdminFn(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => listFn(),
    enabled: !!isAdmin,
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: () => leadsFn(),
    enabled: !!isAdmin,
  });

  const mut = useMutation({
    mutationFn: (v: { id: string; status: Status }) => updateFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });


  const rows: AdminBooking[] = data ?? [];

  if (checking) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <p className="mx-auto max-w-4xl px-5 py-14 text-sm text-muted-foreground">
          Checking access…
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <section className="mx-auto max-w-lg px-5 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            403
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Admins only
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This area is restricted. Ask an existing admin to grant your
            account the admin role.
          </p>
          <Link
            to="/bookings"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Back to your bookings
          </Link>
        </section>
      </div>
    );
  }

  const totals = rows.reduce(
    (acc, r) => {
      acc.count += 1;
      acc.revenue += r.price_cents;
      acc.byStatus[r.status as Status] = (acc.byStatus[r.status as Status] ?? 0) + 1;
      return acc;
    },
    { count: 0, revenue: 0, byStatus: {} as Record<Status, number> },
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Bookings dashboard
        </h1>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Stat label="Total" value={String(totals.count)} />
          <Stat
            label="Revenue"
            value={`$${(totals.revenue / 100).toFixed(0)}`}
          />
          {STATUSES.map((s) => (
            <Stat
              key={s}
              label={s}
              value={String(totals.byStatus[s] ?? 0)}
            />
          ))}
        </div>

        {isLoading ? (
          <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">No bookings yet.</p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Address</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr key={b.id} className="border-t border-border align-top">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(b.scheduled_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{b.customer_name}</div>
                      <div className="text-xs text-muted-foreground">
                        {b.customer_email}
                      </div>
                      {b.customer_phone && (
                        <div className="text-xs text-muted-foreground">
                          {b.customer_phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div>{b.service_slug}</div>
                      <div className="text-xs text-muted-foreground">
                        {b.audience} · {b.duration_minutes}m
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {b.address_line1}
                      <br />
                      {b.city} {b.zip}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      ${(b.price_cents / 100).toFixed(0)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        disabled={mut.isPending}
                        onChange={(e) =>
                          mut.mutate({
                            id: b.id,
                            status: e.target.value as Status,
                          })
                        }
                        className="rounded-full border border-input bg-background px-3 py-1.5 text-xs font-medium"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
