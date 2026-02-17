import { getEntries, MOODS } from "../lib/moods";

export default function MoodHistory() {
  const entries = getEntries();

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
    <div className="flex flex-col gap-4">
      {entries.map((entry) => {
        const moodStyle = MOODS.find((m) => m.label === entry.mood);

        return (
          <div
            key={entry.id}
            className={`
              rounded-2xl border p-4 shadow-sm
              transition hover:shadow-md
              ${moodStyle?.bg}
              ${moodStyle?.border}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3
                className={`text-lg font-semibold flex items-center gap-2 ${moodStyle?.text}`}
              >
                <span className="text-2xl">{entry.emoji}</span>
                {entry.emoji}
              </h3>

              <span className="text-xs text-gray-400">
                {new Date(entry.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>

            {/* Note */}
            {entry.note && (
              <p className="mt-2 text-gray-700 leading-relaxed">
                {entry.note}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
