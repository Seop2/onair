import supabase from "@/lib/supabase";

export async function fetchNotices() {
  const { data, error } = await supabase
    .from("notice")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchLatestNotice() {
  const { data, error } = await supabase
    .from("notice")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}
