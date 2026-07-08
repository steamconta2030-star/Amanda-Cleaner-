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

export const listConversations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("conversations")
      .select("id, session_id, created_at, updated_at, message_count, is_lead, visitor_lang")
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

export const getStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const [totalRes, weekRes, leadsRes, msgsRes] = await Promise.all([
      supabaseAdmin.from("conversations").select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo),
      supabaseAdmin
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .eq("is_lead", true),
      supabaseAdmin.from("messages").select("id", { count: "exact", head: true }),
    ]);
    return {
      totalConversations: totalRes.count ?? 0,
      conversationsThisWeek: weekRes.count ?? 0,
      leads: leadsRes.count ?? 0,
      totalMessages: msgsRes.count ?? 0,
    };
  });
