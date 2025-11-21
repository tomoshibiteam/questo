import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseEnabled =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

let cachedClient: SupabaseClient | null = null;

// サーバー/クライアント双方で使う簡易クライアント生成。
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseEnabled) return null;
  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl!, supabaseAnonKey!);
  }
  return cachedClient;
}
