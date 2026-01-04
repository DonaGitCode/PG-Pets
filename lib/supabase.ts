import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if we have the environment variables
// This allows the build to succeed even without env vars
const hasEnvVars = supabaseUrl && supabaseAnonKey

export const supabase = hasEnvVars 
  ? createSupabaseClient(supabaseUrl, supabaseAnonKey)
  : null as any

// Export a function to create new client instances
export function createClient() {
  if (!hasEnvVars) {
    throw new Error('Missing Supabase environment variables')
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

