import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwcpxwjxqllfwferproi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3Y3B4d2p4cWxsZndmZXJwcm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NTQ3OTcsImV4cCI6MjA4MjEzMDc5N30.aBZ4VrjvQMHDqLBpxuvYl1_dOZoBt3_PEnHn0s7kVNI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
