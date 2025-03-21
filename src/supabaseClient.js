import { createClient } from "@supabase/supabase-js";

// تمرير القيم مباشرة من import.meta.env بدلاً من process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
