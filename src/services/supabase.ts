import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Determine if we have credentials set up
export const isSupabaseConfigured = 
  Boolean(supabaseUrl) && 
  Boolean(supabaseAnonKey) && 
  supabaseUrl !== 'https://your-project-id.supabase.co';

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase credentials are not configured or are placeholder values. ' +
    'Sift AI will run in mock persistence mode using localStorage.'
  );
}

// Export initialized client. If not configured, we create a placeholder client that we don't call.
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
