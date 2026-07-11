import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Service = {
  slug: string;
  name: string;
  audience: "home" | "rental" | "move";
  description: string;
  base_price_cents: number;
  duration_minutes: number;
};

export const listServices = createServerFn({ method: "GET" }).handler(
  async (): Promise<Service[]> => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return [];

    const supabase = createClient<Database>(url, key, {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase
      .from("services_catalog")
      .select("slug,name,audience,description,base_price_cents,duration_minutes")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as Service[];
  },
);
