import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  listConversations,
  getConversation,
  getStats,
  updateConversation,
  type ConversationStatus,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type Conv = {
  id: string;
  session_id: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  is_lead: boolean;
  visitor_lang: string | null;
  status: ConversationStatus;
  admin_notes: string | null;
};

type Msg = {
  id: string;
  role: string;
  content: string;
  created_at: string;
};

const STATUS_META: Record<ConversationStatus, { label: string; color: string }> = {
  new: { label: "Novo", color: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30" },
  in_progress: { label: "Em atendimento", color: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30" },
  quoted: { label: "Orçamento enviado", color: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30" },
  scheduled: { label: "Agendado", color: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30" },
  won: { label: "Ganho ✓", color: "bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/30" },
  lost: { label: "Perdido", color: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30" },
};
const STATUS_ORDER: ConversationStatus[] = ["new", "in_progress", "quoted", "scheduled", "won", "lost"];

function AdminPage() {
  const fetchConvs = useServerFn(listConversations);
  const fetchStats = useServerFn(getStats);
  const fetchMsgs = useServerFn(getConversation);
  const updateConv = useServerFn(updateConversation);
  const qc = useQueryClient();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ConversationStatus | "all" | "leads">("all");
  const [notes, setNotes] = useState("");

  const statsQ = useQuery({ queryKey: ["stats"], queryFn: () => fetchStats(), refetchInterval: 30000 });
  const convsQ = useQuery({ queryKey: ["convs"], queryFn: () => fetchConvs(), refetchInterval: 15000 });
  const msgsQ = useQuery({
    queryKey: ["msgs", selectedId],
    queryFn: () => fetchMsgs({ data: { conversationId: selectedId! } }),
    enabled: !!selectedId,
  });

  const mutate = useMutation({
    mutationFn: (input: { conversationId: string; status?: ConversationStatus; admin_notes?: string | null }) =>
      updateConv({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["convs"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  const convs = (convsQ.data ?? []) as Conv[];
  const msgs = (msgsQ.data ?? []) as Msg[];
  const stats = statsQ.data;

  const filtered = useMemo(() => {
    if (filter === "all") return convs;
    if (filter === "leads") return convs.filter((c) => c.is_lead);
    return convs.filter((c) => c.status === filter);
  }, [convs, filter]);

  const selected = convs.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    setNotes(selected?.admin_notes ?? "");
  }, [selectedId, selected?.admin_notes]);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const forbidden = convsQ.error?.message?.includes("Forbidden");

  const maxDaily = Math.max(1, ...(stats?.daily ?? []).map((d) => d.count));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Amanda & Co.</p>
            <h1 className="font-serif text-xl">Chat Inbox</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
              ← Site
            </Link>
            <button
              onClick={signOut}
              className="rounded-lg border border-border px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-muted"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {forbidden ? (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm">
            <p className="font-medium">Sua conta ainda não é admin.</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <StatCard label="Conversas" value={stats?.totalConversations ?? "–"} />
              <StatCard label="Últimos 7 dias" value={stats?.conversationsThisWeek ?? "–"} />
              <StatCard label="Leads 🔥" value={stats?.leads ?? "–"} highlight />
              <StatCard label="Ganhos ✓" value={stats?.won ?? "–"} />
              <StatCard label="Mensagens" value={stats?.totalMessages ?? "–"} />
            </div>

            {/* Activity chart + status breakdown */}
            <div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr]">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Atividade — 7 dias</p>
                <div className="mt-4 flex h-32 items-end gap-2">
                  {(stats?.daily ?? []).map((d) => (
                    <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                      <div className="text-[10px] text-muted-foreground">{d.count}</div>
                      <div
                        className="w-full rounded-t bg-primary/70"
                        style={{ height: `${(d.count / maxDaily) * 100}%`, minHeight: 2 }}
                      />
                      <div className="text-[10px] text-muted-foreground">
                        {new Date(d.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Funil</p>
                <div className="mt-3 space-y-1.5">
                  {STATUS_ORDER.map((s) => {
                    const count = stats?.statusCounts?.[s] ?? 0;
                    return (
                      <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`flex w-full items-center justify-between rounded-md border px-2 py-1 text-xs transition-colors hover:bg-muted ${STATUS_META[s].color}`}
                      >
                        <span>{STATUS_META[s].label}</span>
                        <span className="font-medium">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Filter chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
                Todas ({convs.length})
              </FilterChip>
              <FilterChip active={filter === "leads"} onClick={() => setFilter("leads")}>
                🔥 Leads ({convs.filter((c) => c.is_lead).length})
              </FilterChip>
              {STATUS_ORDER.map((s) => (
                <FilterChip key={s} active={filter === s} onClick={() => setFilter(s)}>
                  {STATUS_META[s].label}
                </FilterChip>
              ))}
            </div>

            {/* Two-column layout */}
            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_1.4fr]">
              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <p className="font-serif text-lg">Conversas</p>
                  <p className="text-xs text-muted-foreground">Auto-refresh 15s · {filtered.length} exibindo</p>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                  {convsQ.isLoading && <p className="p-4 text-sm text-muted-foreground">Loading…</p>}
                  {!convsQ.isLoading && filtered.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground">Nenhuma conversa aqui.</p>
                  )}
                  <ul>
                    {filtered.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => setSelectedId(c.id)}
                          className={`w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted ${
                            selectedId === c.id ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-medium">
                              {c.is_lead && <span className="mr-1">🔥</span>}
                              {new Date(c.updated_at).toLocaleString()}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">{c.message_count} msgs</span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span
                              className={`inline-block rounded border px-1.5 py-0.5 text-[10px] ${STATUS_META[c.status].color}`}
                            >
                              {STATUS_META[c.status].label}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {c.visitor_lang ?? "—"} · {c.session_id.slice(0, 6)}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <p className="font-serif text-lg">Mensagens</p>
                </div>

                {selected && (
                  <div className="border-b border-border px-4 py-3 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {STATUS_ORDER.map((s) => (
                        <button
                          key={s}
                          onClick={() => mutate.mutate({ conversationId: selected.id, status: s })}
                          disabled={mutate.isPending}
                          className={`rounded border px-2 py-1 text-[11px] transition-opacity hover:opacity-80 disabled:opacity-50 ${
                            selected.status === s ? STATUS_META[s].color + " ring-1 ring-current" : "border-border text-muted-foreground"
                          }`}
                        >
                          {STATUS_META[s].label}
                        </button>
                      ))}
                    </div>
                    <div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        onBlur={() => {
                          if ((selected.admin_notes ?? "") !== notes) {
                            mutate.mutate({ conversationId: selected.id, admin_notes: notes || null });
                          }
                        }}
                        placeholder="Notas internas (WhatsApp do cliente, endereço, valor cotado…)"
                        rows={2}
                        className="w-full resize-none rounded-md border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}

                <div className="max-h-[60vh] space-y-3 overflow-y-auto p-4">
                  {!selectedId && <p className="text-sm text-muted-foreground">Selecione uma conversa.</p>}
                  {selectedId && msgsQ.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
                  {msgs.map((m) => (
                    <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                          m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {m.content}
                        <p className="mt-1 text-[10px] opacity-60">
                          {new Date(m.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "border-primary/40 bg-primary/5" : "border-border bg-card"
      }`}
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-serif text-3xl">{value}</p>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
