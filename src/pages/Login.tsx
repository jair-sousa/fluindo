import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login realizado com sucesso!");
    navigate("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f6f7f5] to-[#eef2ee] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm space-y-6"
      >
        <h1 className="text-3xl font-serif text-center text-gray-900">
          Entrar
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border rounded-lg p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Não tem conta?{" "}
          <Link to="/signup" className="text-green-700 font-semibold">
            Criar conta
          </Link>
        </p>
      </form>
    </main>
  );
}
