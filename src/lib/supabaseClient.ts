import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://xcewrpvxfjsxmwdocxqh.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZXdycHZ4ZmpzeG13ZG9jeHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTc2MTksImV4cCI6MjA5NDY3MzYxOX0.6h_q5VokTNKlteK62qkkgmqY219j-khDx7JhsofE1VY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
