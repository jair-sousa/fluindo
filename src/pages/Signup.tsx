import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Conta criada com sucesso! Faça login.");
    navigate("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f6f7f5] to-[#eef2ee] px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm space-y-6"
      >
        <h1 className="text-3xl font-serif text-center text-gray-900">
          Criar conta
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
          {loading ? "Criando..." : "Criar conta"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}
