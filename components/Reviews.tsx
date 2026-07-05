"use client";

import { useEffect, useState } from "react";

type Review = {
  rating: number;
  comment: string;
  client_name: string;
  project_title: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiBase}/api/reviews`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setLoaded(true));
  }, [apiBase]);

  // Rien à afficher : pas d'avis publié pour l'instant, ou backend pas encore
  // disponible. On ne montre aucune section plutôt qu'un faux contenu.
  if (!loaded || reviews.length === 0) return null;

  return (
    <section id="avis" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Ils m&apos;ont fait confiance
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 border border-white/10"
            style={{ background: "#2d0a52" }}
          >
            <p className="text-secondary text-sm font-body">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p className="mt-3 text-sm text-white/80 font-body">
              {review.comment}
            </p>
            <p className="mt-4 text-xs text-white/50 font-body">
              {review.client_name} — {review.project_title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
