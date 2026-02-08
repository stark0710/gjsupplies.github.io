
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// TODO: REPLACE WITH YOUR ACTUAL SUPABASE PROJECT CREDENTIALS
const SUPABASE_URL = 'https://hbjvatsjsgmrgzprbwqj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhianZhdHNqc2dtcmd6cHJid3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NTM2ODEsImV4cCI6MjA4NjEyOTY4MX0.WcCFHPSqPaUy3brOKx2XAPn3vPqDQoi1JhHOyaGgKvg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
