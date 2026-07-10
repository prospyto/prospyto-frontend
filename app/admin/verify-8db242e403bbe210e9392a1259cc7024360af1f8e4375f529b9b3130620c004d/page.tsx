"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { getApiBase, saveToken } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${getApiBase()}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Identifiants incorrects");
        setLoading(false);
        return;
      }

      const data = await res.json();
      saveToken(data.token);
      router.push("/admin");
    } catch {
      setError("Impossible de contacter le serveur");
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton-email@exemple.com"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-secondary focus:outline-none text-white placeholder-white/50 font-body transition-all"
              disabled={loading}
              autoComplete="username"
            />
          </div>

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
              autoComplete="current-password"
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
            <strong>Sécurité:</strong> l&apos;authentification est vérifiée par le backend (JWT). Cette URL secrète est une couche d&apos;obscurité additionnelle, pas la protection principale.
          </p>
        </div>
      </div>
    </div>
  );
}

