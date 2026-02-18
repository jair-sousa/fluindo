import { supabase } from "./supabaseClient";

export async function getMoodEntries() {
  const { data, error } = await supabase
    .from("mood_entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createMoodEntry(mood: string, note?: string) {
  const { error } = await supabase.from("mood_entries").insert([
    {
      mood,
      note,
    },
  ]);

  if (error) throw error;
}
