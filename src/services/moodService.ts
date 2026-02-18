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
  // ✅ 1. pegar usuário logado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  // ✅ 2. inserir com user_id
  const { error } = await supabase.from("mood_entries").insert([
    {
      mood,
      note,
      user_id: user.id,
    },
  ]);

  if (error) throw error;
}
