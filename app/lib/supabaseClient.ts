import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const hasRealEnvValues =
  !!supabaseUrl &&
  !!supabaseAnonKey &&
  !supabaseUrl.includes('your_supabase_url') &&
  !supabaseAnonKey.includes('your_supabase_anon_key');

export const supabase: SupabaseClient | null = hasRealEnvValues
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const isSupabaseConfigured = hasRealEnvValues;
