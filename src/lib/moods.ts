export interface MoodEntry {
  id: string;
  mood: string;
  emoji: string;
  note?: string;
  createdAt: string;
}

export const MOODS = [
  {
    label: "Feliz",
    emoji: "😄",
    border: "border-green-400",
    bg: "bg-green-50",
    text: "text-green-800",
  },
  {
    label: "Ansioso",
    emoji: "😰",
    border: "border-yellow-400",
    bg: "bg-yellow-50",
    text: "text-yellow-800",
  },
  {
    label: "Triste",
    emoji: "😢",
    border: "border-blue-400",
    bg: "bg-blue-50",
    text: "text-blue-800",
  },
  {
    label: "Calmo",
    emoji: "😌",
    border: "border-purple-400",
    bg: "bg-purple-50",
    text: "text-purple-800",
  },
  {
    label: "Estressado",
    emoji: "😤",
    border: "border-red-400",
    bg: "bg-red-50",
    text: "text-red-800",
  },
];


// Simulação local (por enquanto)
let entries: MoodEntry[] = [];

export function addEntry(mood: string, emoji: string, note?: string) {
  const newEntry: MoodEntry = {
    id: crypto.randomUUID(),
    mood,
    emoji,
    note,
    createdAt: new Date().toISOString(),
  };

  entries = [newEntry, ...entries];
}

export function getEntries() {
  return entries;
}
