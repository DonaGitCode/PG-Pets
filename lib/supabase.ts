import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Get environment variables - these will be replaced at build time by Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uftrftsdmrejevcqhrck.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdHJmdHNkbXJlamV2Y3FocmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MzQwNzQsImV4cCI6MjA4MzExMDA3NH0.Xy3c7J9CHyTmyInsXcMupnzmlUxljqAHnrJoRwnX-EI'

// Export a function to create new client instances
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Export default client for backwards compatibility
export const supabase = createClient()


