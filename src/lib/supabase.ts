import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Built lazily. Constructing the client at module scope throws when the env
// vars are absent, and that failure surfaces during `next build` while
// collecting page data for any route that transitively imports this file
// (/api/auth/[...nextauth] -> lib/auth -> here). The Google Play compliance
// pages must deploy whether or not the legacy auth config is present, so the
// error is deferred to first actual use.
let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anonKey) {
      throw new Error(
        'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
      )
    }
    client = createClient(url, anonKey)
  }
  return client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const instance = getClient()
    const value = Reflect.get(instance, prop)
    return typeof value === 'function' ? value.bind(instance) : value
  },
})
