import { useState } from "react";
import { MOODS } from "../lib/moods";
import { toast } from "sonner";

import { createMoodEntry } from "../services/moodService";

type Props = {
  onRegistered: () => void;
};

export default function MoodSelector({ onRegistered }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!selected) {
      toast.warning("Selecione um humor primeiro 🙂");
      return;
    }

    const mood = MOODS.find((m) => m.label === selected);
    if (!mood) return;

    try {
      setLoading(true);

      // ✅ Salva no Supabase
      await createMoodEntry(mood.label, note);

      toast.success("Sentimento registrado 🌱");

      // Reset UI
      setSelected(null);
      setNote("");

      // 🔥 Atualiza histórico
      onRegistered();
    } catch (err) {
      console.error("Erro ao registrar sentimento:", err);
      toast.error("Erro ao salvar no Supabase 😢");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      {/* Grid responsivo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-2xl mx-auto">
        {MOODS.map((mood) => {
          const isActive = selected === mood.label;

          return (
            <button
              key={mood.label}
              onClick={() => setSelected(mood.label)}
              disabled={loading}
              className={`
                flex flex-col items-center justify-center
                rounded-xl border p-3 sm:p-4
                transition-all duration-200
                hover:scale-[1.02] hover:shadow-md
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isActive
                    ? `${mood.border} ${mood.bg}`
                    : "border-gray-300 bg-white"
                }
              `}
            >
              <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
              <span className="mt-1 text-sm font-medium text-gray-700">
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Campo de nota */}
      <textarea
        placeholder="Quer escrever algo? (opcional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        disabled={loading}
        className="
          w-full rounded-xl border border-gray-300
          p-3 text-sm
          focus:outline-none focus:ring-2 focus:ring-green-400
          disabled:opacity-50
        "
      />

      {/* Botão */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full sm:w-auto
          px-6 py-3 rounded-xl
          bg-green-600 text-white font-medium
          hover:bg-green-700 transition
          disabled:opacity-50 disabled:cursor-not-allowed
          block mx-auto
        "
      >
        {loading ? "Salvando..." : "Registrar sentimento"}
      </button>
    </section>
  );
}
