import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(_supabase: any, userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (data) return;

  // Bootstrap: if no admin exists yet, claim admin for the first authenticated user.
  const { count } = await supabaseAdmin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  if ((count ?? 0) === 0) {
    const { error: insErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    if (insErr) throw new Error(insErr.message);
    return;
  }
  throw new Error("Forbidden — you are not an admin yet. Ask Lovable to grant admin.");
}

export type ConversationStatus =
  | "new"
  | "in_progress"
  | "quoted"
  | "scheduled"
  | "won"
  | "lost";

export const listConversations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await (supabaseAdmin as any)
      .from("conversations")
      .select("id, session_id, created_at, updated_at, message_count, is_lead, visitor_lang, status, admin_notes, quoted_value")
      .order("updated_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: messages, error } = await supabaseAdmin
      .from("messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", data.conversationId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return messages ?? [];
  });

export const updateConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { conversationId: string; status?: ConversationStatus; admin_notes?: string | null }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (data.status !== undefined) patch.status = data.status;
    if (data.admin_notes !== undefined) patch.admin_notes = data.admin_notes;
    const { error } = await (supabaseAdmin as any)
      .from("conversations")
      .update(patch)
      .eq("id", data.conversationId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const sevenDaysAgoIso = sevenDaysAgo.toISOString();

    const [totalRes, weekRes, leadsRes, msgsRes, wonRes, recentRes, statusRes] = await Promise.all([
      supabaseAdmin.from("conversations").select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgoIso),
      supabaseAdmin
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .eq("is_lead", true),
      supabaseAdmin.from("messages").select("id", { count: "exact", head: true }),
      (supabaseAdmin as any)
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .eq("status", "won"),
      supabaseAdmin
        .from("conversations")
        .select("created_at")
        .gte("created_at", sevenDaysAgoIso),
      (supabaseAdmin as any)
        .from("conversations")
        .select("status"),
    ]);

    // Bucket recent conversations by day (YYYY-MM-DD)
    const dayBuckets: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().slice(0, 10);
      dayBuckets[key] = 0;
    }
    for (const row of (recentRes.data ?? []) as { created_at: string }[]) {
      const key = row.created_at.slice(0, 10);
      if (key in dayBuckets) dayBuckets[key]++;
    }
    const daily = Object.entries(dayBuckets).map(([date, count]) => ({ date, count }));

    // Bucket by status
    const statusCounts: Record<string, number> = {
      new: 0, in_progress: 0, quoted: 0, scheduled: 0, won: 0, lost: 0,
    };
    for (const row of (statusRes.data ?? []) as { status: string }[]) {
      if (row.status in statusCounts) statusCounts[row.status]++;
    }

    return {
      totalConversations: totalRes.count ?? 0,
      conversationsThisWeek: weekRes.count ?? 0,
      leads: leadsRes.count ?? 0,
      totalMessages: msgsRes.count ?? 0,
      won: wonRes.count ?? 0,
      daily,
      statusCounts,
    };
  });
