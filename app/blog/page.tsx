"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PostSummary = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
};

type LoadState = "loading" | "ready" | "error";

export default function BlogIndex() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiBase}/api/blog`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoadState("ready");
      })
      .catch(() => setLoadState("error"));
  }, [apiBase]);

  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="text-sm font-body text-white/50 hover:text-secondary transition-colors"
        >
          ← Retour à l&apos;accueil
        </a>

        <span className="section-eyebrow mt-6 block">Blog</span>
        <h1 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
          Articles
        </h1>
        <p className="mt-3 text-white/70 font-body">
          Notes sur le développement web, le design et les projets en cours.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {loadState === "loading" && (
            <p className="text-sm font-body text-white/50">Chargement des articles…</p>
          )}

          {loadState === "error" && (
            <div className="card-surface p-8 text-center">
              <p className="font-heading font-semibold text-lg text-white">
                Articles momentanément indisponibles
              </p>
              <p className="mt-2 text-sm font-body text-white/60">
                Réessaie dans quelques instants.
              </p>
            </div>
          )}

          {loadState === "ready" && posts.length === 0 && (
            <div className="card-surface p-8 text-center">
              <p className="font-heading font-semibold text-lg text-white">
                Aucun article pour le moment
              </p>
              <p className="mt-2 text-sm font-body text-white/60">
                Reviens bientôt, du contenu arrive.
              </p>
            </div>
          )}

          {loadState === "ready" &&
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-surface p-6 block"
              >
                <p className="font-heading font-semibold text-lg text-white">
                  {post.title}
                </p>
                <p className="mt-2 text-xs font-body text-white/50">
                  {new Date(post.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
