import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;
let cachedConfigKey = "";

export function getSupabaseAdminClient(
  supabaseUrl: string,
  supabaseSecretKey: string,
) {
  if (!supabaseUrl || !supabaseSecretKey) {
    return null;
  }

  const nextConfigKey = `${supabaseUrl}:${supabaseSecretKey}`;

  if (cachedClient && cachedConfigKey === nextConfigKey) {
    return cachedClient;
  }

  cachedClient = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  cachedConfigKey = nextConfigKey;

  return cachedClient;
}
