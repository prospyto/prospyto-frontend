"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Eye } from "lucide-react";
import Sidebar from "../components/Sidebar";
import MarkdownToolbar from "../components/MarkdownToolbar";
import { adminFetch } from "@/lib/adminAuth";
import { renderMarkdown } from "@/lib/renderMarkdown";

type PostSummary = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  views: number;
  created_at: string;
};

type PostDetail = PostSummary & { content: string };

export default function AdminBlog() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // null = vue liste, "new" = création, PostDetail = édition
  const [editing, setEditing] = useState<PostDetail | "new" | null>(null);

  useEffect(() => {
    let cancelled = false;
    adminFetch("/api/admin/blog")
      .then((res) => res.json())
      .then((posts) => {
        if (!cancelled) setPosts(posts);
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les articles");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function reloadPosts() {
    setLoading(true);
    adminFetch("/api/admin/blog")
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setError("Impossible de charger les articles"))
      .finally(() => setLoading(false));
  }

  async function openPost(id: number) {
    const res = await adminFetch(`/api/admin/blog/${id}`);
    const data = await res.json();
    setEditing(data);
  }

  async function deletePost(id: number) {
    if (!confirm("Supprimer définitivement cet article ?")) return;
    await adminFetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setEditing(null);
    reloadPosts();
  }

  return (
    <div className="admin-theme flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {editing === null && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-semibold text-2xl" style={{ color: "var(--admin-text)" }}>
                  Blog
                </h1>
                <p className="text-sm mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
                  Articles publiés et brouillons
                </p>
              </div>
              <button
                onClick={() => setEditing("new")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium"
                style={{ background: "var(--admin-accent)", color: "#ffffff" }}
              >
                <Plus size={16} />
                Nouvel article
              </button>
            </div>

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
              {!loading && !error && posts.length === 0 && (
                <p className="text-sm font-body" style={{ color: "var(--admin-text-muted)" }}>
                  Aucun article pour le moment.
                </p>
              )}

              {posts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => openPost(post.id)}
                  className="rounded-2xl p-5 flex items-center justify-between gap-4 text-left"
                  style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
                >
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
                      {post.title}
                    </p>
                    <p className="text-xs mt-1 font-body flex items-center gap-3" style={{ color: "var(--admin-text-muted)" }}>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          background: post.status === "published" ? "#10b98120" : "var(--admin-bg)",
                          color: post.status === "published" ? "#10b981" : "var(--admin-text-muted)",
                        }}
                      >
                        {post.status === "published" ? "Publié" : "Brouillon"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} /> {post.views}
                      </span>
                      <span>{new Date(post.created_at).toLocaleDateString("fr-FR")}</span>
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {editing !== null && (
          <BlogEditor
            post={editing === "new" ? null : editing}
            onCancel={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              reloadPosts();
            }}
            onDelete={editing !== "new" ? () => deletePost(editing.id) : undefined}
          />
        )}
      </main>
    </div>
  );
}

function BlogEditor({
  post,
  onCancel,
  onSaved,
  onDelete,
}: {
  post: PostDetail | null;
  onCancel: () => void;
  onSaved: () => void;
  onDelete?: () => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function save() {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      if (post) {
        await adminFetch(`/api/admin/blog/${post.id}`, {
          method: "PATCH",
          body: JSON.stringify({ title, content, status }),
        });
      } else {
        await adminFetch("/api/admin/blog", {
          method: "POST",
          body: JSON.stringify({ title, content, status }),
        });
      }
      onSaved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-semibold text-2xl" style={{ color: "var(--admin-text)" }}>
          {post ? "Modifier l'article" : "Nouvel article"}
        </h1>
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-body"
            style={{ color: "#ef4444", border: "1px solid #ef444440" }}
          >
            <Trash2 size={14} />
            Supprimer
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 max-w-4xl">
        <div className="max-w-lg">
          <label className="block text-xs font-body mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
            Titre
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'article"
            className="w-full rounded-lg px-3 py-2 text-sm font-body"
            style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
              Contenu (Markdown)
            </label>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="text-xs font-body flex items-center gap-1"
              style={{ color: showPreview ? "var(--admin-accent)" : "var(--admin-text-muted)" }}
            >
              <Eye size={12} />
              {showPreview ? "Masquer l'aperçu" : "Voir l'aperçu"}
            </button>
          </div>

          <div className={showPreview ? "grid grid-cols-2 gap-4" : ""}>
            <div>
              <MarkdownToolbar textareaRef={textareaRef} value={content} onChange={setContent} />
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Contenu de l'article… (Markdown: **gras**, *italique*, ## titre, - liste, [lien](url))"
                rows={16}
                className="w-full rounded-b-lg px-3 py-2 text-sm font-body resize-y"
                style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
              />
            </div>

            {showPreview && (
              <div
                className="rounded-lg px-4 py-3 overflow-y-auto prose-invert-sm"
                style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", maxHeight: "420px" }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
            Statut
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="rounded-lg px-3 py-2 text-sm font-body"
            style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={save}
            disabled={saving || !title.trim() || !content.trim()}
            className="px-4 py-2 rounded-lg text-sm font-body font-medium disabled:opacity-50"
            style={{ background: "var(--admin-accent)", color: "#ffffff" }}
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-body"
            style={{ color: "var(--admin-text-muted)" }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
