"use client";

import { useEffect, useState } from "react";
import { Inbox, MessageSquareText } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { adminFetch } from "@/lib/adminAuth";

type Inquiry = {
  id: number;
  project_type: string;
  description: string;
  budget: string | null;
  timeline: string | null;
  created_at: string;
  client_id: number;
  name: string;
  email: string;
  phone: string;
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFormId, setOpenFormId] = useState<number | null>(null);

  useEffect(() => {
    adminFetch("/api/inquiries")
      .then((res) => res.json())
      .then(setInquiries)
      .catch(() => setError("Impossible de charger les demandes"))
      .finally(() => setLoading(false));
  }, []);

  function handleConverted(inquiryId: number) {
    setInquiries((prev) => prev.filter((i) => i.id !== inquiryId));
    setOpenFormId(null);
  }

  return (
    <div className="admin-theme flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="font-heading font-semibold text-2xl" style={{ color: "var(--admin-text)" }}>
          Demandes
        </h1>
        <p className="text-sm mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
          Nouvelles demandes clients en attente de conversion en projet
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
          {!loading && !error && inquiries.length === 0 && (
            <div
              className="rounded-2xl p-8 text-center flex flex-col items-center gap-2"
              style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
            >
              <Inbox size={24} color="var(--admin-text-muted)" />
              <p className="text-sm font-body" style={{ color: "var(--admin-text-muted)" }}>
                Aucune demande en attente.
              </p>
            </div>
          )}

          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-2xl p-5"
              style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-heading font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
                      {inquiry.name}
                    </p>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-body"
                      style={{ background: "var(--admin-accent-soft)", color: "var(--admin-accent)" }}
                    >
                      {inquiry.project_type}
                    </span>
                  </div>
                  <p className="text-xs mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
                    {inquiry.email} · {inquiry.phone} ·{" "}
                    {new Date(inquiry.created_at).toLocaleDateString("fr-FR")}
                  </p>
                  <p className="text-sm mt-3 font-body" style={{ color: "var(--admin-text)" }}>
                    {inquiry.description}
                  </p>
                  {(inquiry.budget || inquiry.timeline) && (
                    <p className="text-xs mt-2 font-body" style={{ color: "var(--admin-text-muted)" }}>
                      {inquiry.budget && <>Budget : {inquiry.budget}</>}
                      {inquiry.budget && inquiry.timeline && " · "}
                      {inquiry.timeline && <>Délai souhaité : {inquiry.timeline}</>}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${inquiry.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-body font-medium"
                    style={{ background: "#10b981", color: "#ffffff" }}
                  >
                    <MessageSquareText size={13} />
                    WhatsApp
                  </a>
                  <button
                    onClick={() => setOpenFormId(openFormId === inquiry.id ? null : inquiry.id)}
                    className="px-3 py-1.5 rounded-md text-xs font-body font-medium"
                    style={{ background: "var(--admin-accent)", color: "#ffffff" }}
                  >
                    {openFormId === inquiry.id ? "Annuler" : "Créer le projet"}
                  </button>
                </div>
              </div>

              {openFormId === inquiry.id && (
                <ConvertForm inquiry={inquiry} onConverted={() => handleConverted(inquiry.id)} />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function ConvertForm({ inquiry, onConverted }: { inquiry: Inquiry; onConverted: () => void }) {
  const [title, setTitle] = useState(inquiry.project_type);
  const [description, setDescription] = useState(inquiry.description);
  const [startDate, setStartDate] = useState("");
  const [estimatedEndDate, setEstimatedEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Le titre du projet est requis");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await adminFetch(`/api/inquiries/${inquiry.id}/convert`, {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          start_date: startDate || undefined,
          estimated_end_date: estimatedEndDate || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur lors de la création du projet");
      }
      onConverted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 pt-4 flex flex-col gap-3"
      style={{ borderTop: "1px solid var(--admin-border)" }}
    >
      <div>
        <label className="block text-xs font-body mb-1" style={{ color: "var(--admin-text-muted)" }}>
          Titre du projet
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md px-3 py-2 text-sm font-body"
          style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
        />
      </div>

      <div>
        <label className="block text-xs font-body mb-1" style={{ color: "var(--admin-text-muted)" }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-md px-3 py-2 text-sm font-body resize-none"
          style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-body mb-1" style={{ color: "var(--admin-text-muted)" }}>
            Date de début (optionnel)
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm font-body"
            style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
          />
        </div>
        <div>
          <label className="block text-xs font-body mb-1" style={{ color: "var(--admin-text-muted)" }}>
            Fin estimée (optionnel)
          </label>
          <input
            type="date"
            value={estimatedEndDate}
            onChange={(e) => setEstimatedEndDate(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm font-body"
            style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
          />
        </div>
      </div>

      {error && (
        <p className="text-xs font-body" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="self-start px-4 py-2 rounded-md text-sm font-body font-medium disabled:opacity-50"
        style={{ background: "#10b981", color: "#ffffff" }}
      >
        {saving ? "Création…" : "Confirmer et créer le lien de suivi"}
      </button>
    </form>
  );
}
