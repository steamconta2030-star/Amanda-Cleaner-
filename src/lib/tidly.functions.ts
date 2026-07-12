import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
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

const bookingInputSchema = z.object({
  service_slug: z.string(),
  audience: z.enum(["home", "rental", "move"]),
  scheduled_at_iso: z.string(),
  duration_minutes: z.number().int(),
  price_cents: z.number().int(),
  address_line1: z.string().min(1),
  city: z.string().default("Tampa"),
  state: z.string().default("FL"),
  zip: z.string().min(3),
  bedrooms: z.number().int().nullable(),
  bathrooms: z.number().int().nullable(),
  square_feet: z.number().int().nullable(),
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  customer_phone: z.string().nullable(),
  notes: z.string().nullable(),
});

export const createBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => bookingInputSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: row, error } = await supabase
      .from("bookings")
      .insert({
        user_id: userId,
        service_slug: data.service_slug,
        audience: data.audience,
        scheduled_at: data.scheduled_at_iso,
        duration_minutes: data.duration_minutes,
        price_cents: data.price_cents,
        address_line1: data.address_line1,
        city: data.city,
        state: data.state,
        zip: data.zip,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        square_feet: data.square_feet,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        notes: data.notes,
        status: "pending",
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export type Booking = {
  id: string;
  service_slug: string;
  audience: string;
  scheduled_at: string;
  duration_minutes: number;
  price_cents: number;
  status: string;
  address_line1: string;
  city: string;
  zip: string;
  customer_name: string;
};

export const listMyBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Booking[]> => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "id,service_slug,audience,scheduled_at,duration_minutes,price_cents,status,address_line1,city,zip,customer_name",
      )
      .eq("user_id", userId)
      .order("scheduled_at", { ascending: true });
    if (error || !data) return [];
    return data as Booking[];
  });
