"use client";

import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function ReviewForm({ link }: { link: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${apiBase}/api/track/${link}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-body text-secondary">
        Merci pour ton avis ! Il sera bientôt visible sur le portfolio.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 mt-6">
      <p className="font-heading font-semibold text-sm text-white mb-4">
        Ton avis compte
      </p>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setRating(n)}
            className="btn-animate btn-border-scan leading-none"
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
          >
            <Star
              size={22}
              fill={n <= rating ? "var(--secondary-color)" : "none"}
              color={n <= rating ? "var(--secondary-color)" : "rgba(255,255,255,0.3)"}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={3}
        placeholder="Comment s'est passée la collaboration ?"
        className="w-full rounded-lg px-3 py-2 text-sm font-body text-white placeholder:text-white/30"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 btn-animate btn-border-scan btn-primary-fx px-4 py-2 rounded-lg text-sm font-body font-medium"
        style={{ background: "var(--primary-color)", color: "#fff" }}
      >
        {status === "sending" ? "Envoi…" : "Envoyer mon avis"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-xs text-[color:var(--color-error-500)] font-body">
          Erreur d&apos;envoi, réessaie dans un instant.
        </p>
      )}
    </form>
  );
}
