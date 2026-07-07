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
      <span className="section-eyebrow">Retours clients</span>
      <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
        Ils m&apos;ont fait confiance
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="card-surface p-6"
          >
            <p className="text-secondary text-sm font-body">
              {review.rating} / 5
            </p>
            <p className="mt-3 text-sm text-white/80 font-body">
              {review.comment}
            </p>
            <p className="mt-4 text-xs text-white/50 font-body">
              {review.client_name}, {review.project_title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
