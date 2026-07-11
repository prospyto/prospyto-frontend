"use client";

import { useEffect, useState } from "react";
import { Star, Trash2, Eye, EyeOff } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { adminFetch } from "@/lib/adminAuth";

type Review = {
  id: number;
  rating: number;
  comment: string | null;
  published: boolean;
  created_at: string;
  client_name: string;
  project_title: string;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    adminFetch("/api/admin/reviews")
      .then((res) => res.json())
      .then(setReviews)
      .catch(() => setError("Impossible de charger les avis"))
      .finally(() => setLoading(false));
  }, []);

  async function togglePublished(review: Review) {
    setBusyId(review.id);
    // Optimiste, avec retour arrière si l'appel échoue.
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, published: !r.published } : r))
    );
    try {
      const res = await adminFetch(`/api/admin/reviews/${review.id}`, {
        method: "PATCH",
        body: JSON.stringify({ published: !review.published }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, published: review.published } : r))
      );
    } finally {
      setBusyId(null);
    }
  }

  async function deleteReview(id: number) {
    if (!confirm("Supprimer définitivement cet avis ?")) return;
    setBusyId(id);
    try {
      await adminFetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="admin-theme flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="font-heading font-semibold text-2xl" style={{ color: "var(--admin-text)" }}>
          Avis
        </h1>
        <p className="text-sm mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
          Modération des avis clients avant publication sur le site
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {loading && (
            <p className="text-sm font-body" style={{ color: "var(--admin-text-muted)" }}>
              Chargement…
            </p>
          )}
          {error && (
            <p className="text-sm font-body" style={{ color: "#ef4444" }}>
              {error}
            </p>
          )}
          {!loading && !error && reviews.length === 0 && (
            <p className="text-sm font-body" style={{ color: "var(--admin-text-muted)" }}>
              Aucun avis pour le moment.
            </p>
          )}

          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
              style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "#facc15" : "none"}
                        color={i < review.rating ? "#facc15" : "var(--admin-text-muted)"}
                      />
                    ))}
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-body"
                    style={{
                      background: review.published ? "#10b98120" : "var(--admin-bg)",
                      color: review.published ? "#10b981" : "var(--admin-text-muted)",
                    }}
                  >
                    {review.published ? "Publié" : "En attente"}
                  </span>
                </div>

                {review.comment && (
                  <p className="text-sm mt-2 font-body" style={{ color: "var(--admin-text)" }}>
                    {review.comment}
                  </p>
                )}

                <p className="text-xs mt-2 font-body" style={{ color: "var(--admin-text-muted)" }}>
                  {review.client_name} · {review.project_title} ·{" "}
                  {new Date(review.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublished(review)}
                  disabled={busyId === review.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-body font-medium disabled:opacity-50"
                  style={{
                    background: review.published ? "var(--admin-bg)" : "var(--admin-accent)",
                    border: "1px solid var(--admin-border)",
                    color: review.published ? "var(--admin-text-muted)" : "#ffffff",
                  }}
                >
                  {review.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  {review.published ? "Dépublier" : "Publier"}
                </button>
                <button
                  onClick={() => deleteReview(review.id)}
                  disabled={busyId === review.id}
                  aria-label="Supprimer l'avis"
                  className="p-1.5 rounded-md disabled:opacity-50"
                  style={{ border: "1px solid #ef444440", color: "#ef4444" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
