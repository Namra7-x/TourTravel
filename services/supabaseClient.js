import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export const isSupabaseConfigured = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

    return Boolean(supabaseUrl && supabaseAnonKey);
};

export const getSupabaseClient = () => {
    if (supabaseClient) {
        return supabaseClient;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase environment variables are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            detectSessionInUrl: true,
            persistSession: true,
        },
    });

    return supabaseClient;
};