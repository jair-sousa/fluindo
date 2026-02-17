import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import MoodHistory from "./components/MoodHistory";
import { Toaster } from "sonner";

export default function App() {
  const [, setRefresh] = useState(0);

  function handleRegistered() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f7f5] to-[#eef2ee] flex justify-center px-4">
      <Toaster richColors position="top-center" />
      <main className="w-full max-w-2xl py-8 space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-gray-900">
            Fluindo
          </h1>

          <p className="text-sm sm:text-base text-gray-600">
            Seu espaço de bem-estar emocional
          </p>
        </header>

        {/* Card principal */}
        <section className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif text-center text-gray-800">
            Como você está se sentindo agora?
          </h2>

          <MoodSelector onRegistered={handleRegistered} />
        </section>

        {/* Histórico */}
        <section className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif text-center text-gray-900">
            Seu histórico
          </h2>


          <MoodHistory />
        </section>
      </main>
    </div>
  );
}
