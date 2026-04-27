import { createBrowserClient } from '@supabase/ssr'

let client

export function getSupabaseClient() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  }
  return client
}

// Deduplicates concurrent auth.getUser() calls so they share one in-flight
// request instead of racing for the auth lock. Clears after resolution so
// the next call (e.g. after a token refresh or sign-in) gets fresh data.
let _pendingGetUser = null

export function getUser() {
  if (!_pendingGetUser) {
    _pendingGetUser = getSupabaseClient()
      .auth.getUser()
      .finally(() => { _pendingGetUser = null })
  }
  return _pendingGetUser
}
