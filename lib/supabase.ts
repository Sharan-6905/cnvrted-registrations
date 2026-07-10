import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazily instantiated — module-scope createClient() throws if the URL/key
// are missing, which crashes the entire Next.js build during page-data
// collection, not just requests to routes that use it.
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return client
}
