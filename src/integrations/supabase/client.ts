// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rqlelarxtxfhmivfsacb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxbGVsYXJ4dHhmaG1pdmZzYWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNjQ5MjUsImV4cCI6MjA2MDY0MDkyNX0.Ac0xN-_h_yXoDo2uAAQMVWvBEoGzn8R2MUhOsUvrGVs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);