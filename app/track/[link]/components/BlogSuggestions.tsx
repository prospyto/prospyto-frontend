"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PostSummary = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
};

export default function BlogSuggestions() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiBase}/api/blog`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: PostSummary[]) => setPosts(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setPosts([]));
  }, [apiBase]);

  if (posts.length === 0) return null;

  return (
    <div className="mt-10">
      <p className="text-xs font-body uppercase tracking-wider text-white/40">
        En attendant, quelques lectures
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="card-surface px-4 py-3 flex items-center justify-between gap-3 group"
          >
            <span className="text-sm font-body text-white/80 group-hover:text-white transition-colors">
              {post.title}
            </span>
            <span className="text-xs font-body text-white/40 shrink-0">Lire →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
