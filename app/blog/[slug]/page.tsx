"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { renderMarkdown } from "@/lib/renderMarkdown";

type PostDetail = {
  title: string;
  content: string;
  created_at: string;
};

type LoadState = "loading" | "ready" | "not_found" | "error";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (!slug) return;

    fetch(`${apiBase}/api/blog/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setLoadState("not_found");
          return null;
        }
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setPost(data);
          setLoadState("ready");
        }
      })
      .catch(() => setLoadState("error"));
  }, [apiBase, slug]);

  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="text-sm font-body text-white/50 hover:text-secondary transition-colors"
        >
          ← Tous les articles
        </Link>

        {loadState === "loading" && (
          <p className="mt-8 text-sm font-body text-white/50">Chargement de l&apos;article…</p>
        )}

        {loadState === "not_found" && (
          <div className="card-surface p-8 mt-8 text-center">
            <p className="font-heading font-semibold text-lg text-white">
              Article introuvable
            </p>
            <p className="mt-2 text-sm font-body text-white/60">
              Cet article n&apos;existe pas ou n&apos;a pas encore été publié.
            </p>
          </div>
        )}

        {loadState === "error" && (
          <div className="card-surface p-8 mt-8 text-center">
            <p className="font-heading font-semibold text-lg text-white">
              Article momentanément indisponible
            </p>
            <p className="mt-2 text-sm font-body text-white/60">
              Réessaie dans quelques instants.
            </p>
          </div>
        )}

        {loadState === "ready" && post && (
          <article className="mt-6">
            <span className="section-eyebrow">Article</span>
            <h1 className="mt-3 font-heading font-semibold text-2xl md:text-3xl text-white">
              {post.title}
            </h1>
            <p className="mt-2 text-xs font-body text-white/50">
              {new Date(post.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div
              className="mt-8 text-sm md:text-base font-body text-white/80 prose-invert-sm"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
          </article>
        )}
      </div>
    </main>
  );
}
