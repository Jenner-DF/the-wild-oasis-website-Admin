import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ekubasgodyzrbwktyemm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdWJhc2dvZHl6cmJ3a3R5ZW1tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDI4NjgwMSwiZXhwIjoyMDQ1ODYyODAxfQ.qhBkziqZWjgGEa3r8xEFAhE7hr8ICwkH8GeSpG09kE0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
