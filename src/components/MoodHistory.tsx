import { useEffect, useState } from "react";
import { MOODS } from "../lib/moods";
import { getMoodEntries } from "../services/moodService";
import type { MoodEntry } from "../types/mood";

type Props = {
  refresh: number;
};

export default function MoodHistory({ refresh }: Props) {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntries() {
      setLoading(true);

      try {
        const data = await getMoodEntries();
        setEntries(data);
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
      }

      setLoading(false);
    }

    loadEntries();
  }, [refresh]); // 🔥 agora refresh funciona de verdade

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Carregando histórico...
      </p>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">
          Nenhum sentimento registrado ainda 🌱
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => {
        const mood = MOODS.find((m) => m.label === entry.mood);

        return (
          <div
            key={entry.id}
            className={`p-4 rounded-xl border shadow-sm ${
              mood?.border ?? "border-gray-200"
            } ${mood?.bg ?? "bg-white"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold flex items-center gap-2">
                {mood?.emoji} {entry.mood}
              </span>

              <span className="text-xs text-gray-400">
                {new Date(entry.created_at).toLocaleString()}
              </span>
            </div>

            {entry.note && (
              <p className="mt-2 text-gray-700 text-sm">
                {entry.note}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
