import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jbfiojfrsdbakjwnnhgr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZmlvamZyc2RiYWtqd25uaGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTQzMzAsImV4cCI6MjA2ODg5MDMzMH0.a_G72JgrY15hQcl_UhfX4Z2yYM81DKHbj5FUPQRddVc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
