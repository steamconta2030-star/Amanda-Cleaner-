import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { listConversations, getConversation, getStats } from "@/lib/admin.functions";

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
};

type Msg = {
  id: string;
  role: string;
  content: string;
  created_at: string;
};

function AdminPage() {
  const fetchConvs = useServerFn(listConversations);
  const fetchStats = useServerFn(getStats);
  const fetchMsgs = useServerFn(getConversation);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const statsQ = useQuery({ queryKey: ["stats"], queryFn: () => fetchStats() });
  const convsQ = useQuery({ queryKey: ["convs"], queryFn: () => fetchConvs(), refetchInterval: 15000 });
  const msgsQ = useQuery({
    queryKey: ["msgs", selectedId],
    queryFn: () => fetchMsgs({ data: { conversationId: selectedId! } }),
    enabled: !!selectedId,
  });

  const convs = (convsQ.data ?? []) as Conv[];
  const msgs = (msgsQ.data ?? []) as Msg[];
  const stats = statsQ.data;

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const forbidden = convsQ.error?.message?.includes("Forbidden");

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
            <p className="mt-1 text-muted-foreground">
              Peça pro Lovable liberar acesso admin pro email <strong>{"<seu email>"}</strong> — é feito com um comando.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatCard label="Conversas (total)" value={stats?.totalConversations ?? "–"} />
              <StatCard label="Últimos 7 dias" value={stats?.conversationsThisWeek ?? "–"} />
              <StatCard label="Leads 🔥" value={stats?.leads ?? "–"} highlight />
              <StatCard label="Mensagens" value={stats?.totalMessages ?? "–"} />
            </div>

            {/* Two-column layout */}
            <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_1.4fr]">
              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <p className="font-serif text-lg">Conversations</p>
                  <p className="text-xs text-muted-foreground">Auto-refresh every 15s</p>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                  {convsQ.isLoading && <p className="p-4 text-sm text-muted-foreground">Loading…</p>}
                  {!convsQ.isLoading && convs.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground">No conversations yet.</p>
                  )}
                  <ul>
                    {convs.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => setSelectedId(c.id)}
                          className={`w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted ${
                            selectedId === c.id ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">
                              {c.is_lead && <span className="mr-1">🔥</span>}
                              {new Date(c.updated_at).toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {c.message_count} msgs
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {c.visitor_lang ?? "—"} · session {c.session_id.slice(0, 8)}…
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                  <p className="font-serif text-lg">Messages</p>
                </div>
                <div className="max-h-[70vh] overflow-y-auto p-4 space-y-3">
                  {!selectedId && <p className="text-sm text-muted-foreground">Select a conversation.</p>}
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
