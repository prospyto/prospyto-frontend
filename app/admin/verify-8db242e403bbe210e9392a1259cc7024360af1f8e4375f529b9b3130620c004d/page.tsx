"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Tu dois changer ce mot de passe!
  const ADMIN_PASSWORD = "Prospyre2024Admin!";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password === ADMIN_PASSWORD) {
      // Mot de passe correct: créer le cookie et rediriger
      document.cookie = "admin_authenticated=true; path=/; max-age=86400";
      setLoading(false);
      router.push("/admin");
    } else {
      setError("Mot de passe incorrect");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">
            Admin Panel
          </h1>
          <p className="text-white/60 font-body text-sm mt-2">
            Accès réservé
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-body text-sm mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-secondary focus:outline-none text-white placeholder-white/50 font-body transition-all"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40">
              <p className="text-red-400 font-body text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover font-heading font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Vérification..." : "Accéder au panel"}
          </button>
        </form>

        {/* Info */}
        <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-white/70 font-body text-xs leading-relaxed">
            <strong>Sécurité:</strong> Cette page est accessible UNIQUEMENT via une URL secrète longue et hashée. Même si quelqu'un essaie d'accéder à /admin, il verra une erreur 404.
          </p>
        </div>
      </div>
    </div>
  );
}
