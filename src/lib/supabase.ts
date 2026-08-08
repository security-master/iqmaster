import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null | undefined

/** Defaults allow the live GitHub Pages build to talk to the iqmaster project.
 * Override with VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY when preferred.
 * This is a publishable (anon) key intended for browser use with RLS.
 */
const DEFAULT_URL = 'https://ngrkaklmjjqqxjzndupt.supabase.co'
const DEFAULT_PUBLISHABLE_KEY = 'sb_publishable_Ds--wpE7sowRs4cI34l9lw_bm4Me8jL'

export function getSupabaseConfig() {
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || DEFAULT_URL
  const key =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || DEFAULT_PUBLISHABLE_KEY
  return { url, key }
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseConfig()
  return Boolean(url && key)
}

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client
  const { url, key } = getSupabaseConfig()
  if (!url || !key) {
    client = null
    return client
  }
  client = createClient(url, key)
  return client
}
