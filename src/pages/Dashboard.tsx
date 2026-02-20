import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoodSelector from "../components/MoodSelector";
import MoodHistory from "../components/MoodHistory";
import { Toaster, toast } from "sonner";
import { supabase } from "../services/supabaseClient";
import { usePWAInstall } from "../hooks/usePWAInstall";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const { canInstall, install } = usePWAInstall();

  // ✅ Buscar usuário logado ao abrir o Dashboard
  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
    }

    loadUser();
  }, []);

  function handleRegistered() {
    setRefresh((prev) => prev + 1);
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      toast.success("Você saiu da conta!");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Erro ao sair da conta.");
      console.error("Erro no logout:", error);
    }
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

          {userEmail && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-xs text-gray-500">
                Logado como:{" "}
                <span className="font-semibold">{userEmail}</span>
              </p>

              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 font-semibold transition"
              >
                Sair
              </button>

              {/* 🔥 Botão personalizado de instalação */}
              {canInstall && (
                <button
                  onClick={install}
                  className="mt-2 bg-[#8FAF9F] text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition shadow-sm"
                >
                  Instalar aplicativo
                </button>
              )}
            </div>
          )}
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

          <MoodHistory refresh={refresh} />
        </section>
      </main>
    </div>
  );
}
