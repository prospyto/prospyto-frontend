"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/adminAuth";

type Note = {
  id: number;
  content: string;
  created_at: string;
};

export default function ProjectNotes({ projectId }: { projectId: number }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch(`/api/projects/${projectId}/notes`)
      .then((res) => res.json())
      .then(setNotes)
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [projectId]);

  async function addNote() {
    if (!draft.trim()) return;
    setSaving(true);
    try {
      const res = await adminFetch(`/api/projects/${projectId}/notes`, {
        method: "POST",
        body: JSON.stringify({ content: draft.trim() }),
      });
      if (res.ok) {
        const newNote = await res.json();
        setNotes((prev) => [newNote, ...prev]);
        setDraft("");
      }
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote(noteId: number) {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    await adminFetch(`/api/projects/${projectId}/notes/${noteId}`, { method: "DELETE" });
  }

  return (
    <div
      className="mt-3 pt-3 rounded-lg"
      style={{ borderTop: "1px solid var(--admin-border)" }}
    >
      <div className="flex gap-2 mb-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ajouter une note interne (jamais visible par le client)…"
          rows={2}
          className="flex-1 rounded-md px-3 py-2 text-xs font-body resize-none"
          style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
        />
        <button
          onClick={addNote}
          disabled={saving || !draft.trim()}
          className="px-3 py-1.5 rounded-md text-xs font-body font-medium self-start disabled:opacity-50"
          style={{ background: "var(--admin-accent)", color: "#ffffff" }}
        >
          Ajouter
        </button>
      </div>

      {loading && (
        <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
          Chargement des notes…
        </p>
      )}

      {!loading && notes.length === 0 && (
        <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
          Aucune note pour ce projet.
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-start justify-between gap-2 rounded-md px-3 py-2"
            style={{ background: "var(--admin-bg)" }}
          >
            <div>
              <p className="text-xs font-body" style={{ color: "var(--admin-text)" }}>
                {note.content}
              </p>
              <p className="text-[10px] mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
                {new Date(note.created_at).toLocaleString("fr-FR")}
              </p>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              aria-label="Supprimer la note"
              style={{ color: "var(--admin-text-muted)" }}
            >
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
