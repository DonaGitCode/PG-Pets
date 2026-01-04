import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Export a function to create new client instances
export function createClient() {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
  }
  
  // During build time, return a mock client
  if (!supabaseUrl || !supabaseAnonKey) {
    return null as any
  }
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Export default client for backwards compatibility
export const supabase = createClient()


