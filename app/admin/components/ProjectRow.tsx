"use client";

import { useState } from "react";
import { StickyNote, Copy, Check, X, CalendarDays } from "lucide-react";
import { adminFetch } from "@/lib/adminAuth";
import ProjectNotes from "./ProjectNotes";

export type AdminProject = {
  id: number;
  title: string;
  client_name: string;
  client_phone: string;
  completion_percent: number;
  status: "discussion" | "en_cours" | "complete";
  tracking_link: string;
  start_date: string | null;
  estimated_end_date: string | null;
};

const STATUS_LABEL: Record<AdminProject["status"], string> = {
  discussion: "Discussion",
  en_cours: "En cours",
  complete: "Complété",
};

const STATUS_OPTIONS: AdminProject["status"][] = ["discussion", "en_cours", "complete"];

function toDateInputValue(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 10);
}

export default function ProjectRow({ project }: { project: AdminProject }) {
  const [percent, setPercent] = useState(project.completion_percent);
  const [status, setStatus] = useState(project.status);
  const [saving, setSaving] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [notifyType, setNotifyType] = useState<"progress" | "final">("progress");
  const [customMessage, setCustomMessage] = useState("");
  const [notifySending, setNotifySending] = useState(false);
  const [notifyError, setNotifyError] = useState(false);
  const [datesModalOpen, setDatesModalOpen] = useState(false);
  const [startDateInput, setStartDateInput] = useState(toDateInputValue(project.start_date));
  const [endDateInput, setEndDateInput] = useState(toDateInputValue(project.estimated_end_date));
  const [datesSaving, setDatesSaving] = useState(false);
  const [datesError, setDatesError] = useState(false);

  async function updateProgress(newPercent: number) {
    const clamped = Math.min(100, Math.max(0, newPercent));
    setPercent(clamped);
    setSaving(true);
    try {
      await adminFetch(`/api/projects/${project.id}/progress`, {
        method: "PATCH",
        body: JSON.stringify({ percent: clamped }),
      });
    } catch {
      // silencieux : à brancher sur un toast d'erreur plus tard
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(newStatus: AdminProject["status"]) {
    const previous = status;
    setStatus(newStatus);
    // Le backend force completion_percent à 100 quand le statut passe à "complete".
    if (newStatus === "complete") setPercent(100);
    try {
      const res = await adminFetch(`/api/projects/${project.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setStatus(previous);
    }
  }

  async function copyTrackingLink() {
    const url = `${window.location.origin}/track/${project.tracking_link}`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Presse-papiers indisponible (ex: contexte non sécurisé) : on ignore silencieusement.
    }
  }

  async function openWhatsApp() {
    const res = await adminFetch(`/api/projects/${project.id}/whatsapp-link`);
    const data = await res.json();
    if (data.link) window.open(data.link, "_blank");
  }

  async function sendNotification() {
    setNotifySending(true);
    setNotifyError(false);
    try {
      const res = await adminFetch(`/api/projects/${project.id}/notify`, {
        method: "POST",
        body: JSON.stringify({
          type: notifyType,
          custom_message: notifyType === "progress" ? customMessage.trim() || undefined : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.whatsapp_link) window.open(data.whatsapp_link, "_blank");
      setNotifyModalOpen(false);
      setCustomMessage("");
      setNotifyType("progress");
    } catch {
      setNotifyError(true);
    } finally {
      setNotifySending(false);
    }
  }

  async function saveDates() {
    setDatesSaving(true);
    setDatesError(false);
    try {
      const res = await adminFetch(`/api/projects/${project.id}/dates`, {
        method: "PATCH",
        body: JSON.stringify({
          start_date: startDateInput || null,
          estimated_end_date: endDateInput || null,
        }),
      });
      if (!res.ok) throw new Error();
      setDatesModalOpen(false);
    } catch {
      setDatesError(true);
    } finally {
      setDatesSaving(false);
    }
  }

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-heading font-semibold text-sm truncate" style={{ color: "var(--admin-text)" }}>
              {project.title}
            </p>
            <button
              onClick={copyTrackingLink}
              aria-label="Copier le lien de suivi"
              className="shrink-0 p-1 rounded"
              style={{ color: linkCopied ? "#10b981" : "var(--admin-text-muted)" }}
            >
              {linkCopied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
              {project.client_name}
            </p>
            <select
              value={status}
              onChange={(e) => updateStatus(e.target.value as AdminProject["status"])}
              className="text-xs font-body rounded px-1.5 py-0.5"
              style={{
                background: "var(--admin-bg)",
                border: "1px solid var(--admin-border)",
                color: status === "complete" ? "#10b981" : "var(--admin-text-muted)",
              }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-64">
          <input
            type="range"
            min={0}
            max={100}
            value={percent}
            onChange={(e) => updateProgress(Number(e.target.value))}
            className="w-full accent-[var(--admin-accent)]"
          />
          <input
            type="number"
            min={0}
            max={100}
            value={percent}
            onChange={(e) => updateProgress(Number(e.target.value))}
            className="w-14 rounded-md px-2 py-1 text-xs text-center"
            style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
          />
          <span className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
            {saving ? "…" : "%"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {[1, 5, 10].map((step) => (
            <button
              key={step}
              onClick={() => updateProgress(percent + step)}
              className="px-2.5 py-1.5 rounded-md text-xs font-body"
              style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
            >
              +{step}%
            </button>
          ))}
          <button
            onClick={openWhatsApp}
            className="px-3 py-1.5 rounded-md text-xs font-body font-medium"
            style={{ background: "#10b981", color: "#ffffff" }}
          >
            WhatsApp
          </button>
          <button
            onClick={() => {
              setNotifyType(status === "complete" ? "final" : "progress");
              setNotifyModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-md text-xs font-body font-medium"
            style={{ background: "var(--admin-accent)", color: "#ffffff" }}
          >
            Notifier
          </button>
          <button
            onClick={() => {
              setStartDateInput(toDateInputValue(project.start_date));
              setEndDateInput(toDateInputValue(project.estimated_end_date));
              setDatesModalOpen(true);
            }}
            aria-label="Modifier les dates"
            className="p-1.5 rounded-md"
            style={{
              background: "var(--admin-bg)",
              border: "1px solid var(--admin-border)",
              color: "var(--admin-text-muted)",
            }}
          >
            <CalendarDays size={14} />
          </button>
          <button
            onClick={() => setNotesOpen((open) => !open)}
            aria-label="Notes internes"
            className="p-1.5 rounded-md"
            style={{
              background: notesOpen ? "var(--admin-accent)" : "var(--admin-bg)",
              border: "1px solid var(--admin-border)",
              color: notesOpen ? "#ffffff" : "var(--admin-text-muted)",
            }}
          >
            <StickyNote size={14} />
          </button>
        </div>
      </div>

      {notesOpen && <ProjectNotes projectId={project.id} />}

      {notifyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => !notifySending && setNotifyModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-5"
            style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-heading font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
                Notifier {project.client_name}
              </p>
              <button
                onClick={() => setNotifyModalOpen(false)}
                disabled={notifySending}
                aria-label="Fermer"
                style={{ color: "var(--admin-text-muted)" }}
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs font-body mb-2" style={{ color: "var(--admin-text-muted)" }}>
              {notifyType === "final"
                ? "Le message de fin de projet sera envoyé (félicitations + lien de suivi + demande d'avis)."
                : `Le message standard de progression (${percent}%) sera envoyé. Tu peux ajouter une note personnelle en plus (optionnel) :`}
            </p>

            {status === "complete" && (
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setNotifyType("progress")}
                  className="px-3 py-1 rounded-md text-xs font-body"
                  style={{
                    background: notifyType === "progress" ? "var(--admin-accent)" : "var(--admin-bg)",
                    color: notifyType === "progress" ? "#ffffff" : "var(--admin-text-muted)",
                    border: "1px solid var(--admin-border)",
                  }}
                >
                  Progression
                </button>
                <button
                  onClick={() => setNotifyType("final")}
                  className="px-3 py-1 rounded-md text-xs font-body"
                  style={{
                    background: notifyType === "final" ? "var(--admin-accent)" : "var(--admin-bg)",
                    color: notifyType === "final" ? "#ffffff" : "var(--admin-text-muted)",
                    border: "1px solid var(--admin-border)",
                  }}
                >
                  Notification finale
                </button>
              </div>
            )}

            {notifyType === "progress" && (
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Ex : On a pris un peu de retard sur le design, mais tout rentre dans l'ordre cette semaine."
                rows={4}
                className="w-full rounded-md px-3 py-2 text-xs font-body resize-none"
                style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
              />
            )}

            {notifyError && (
              <p className="text-xs font-body mt-2" style={{ color: "#ef4444" }}>
                Échec de l&apos;envoi. Réessaie.
              </p>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setNotifyModalOpen(false)}
                disabled={notifySending}
                className="px-3 py-1.5 rounded-md text-xs font-body"
                style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
              >
                Annuler
              </button>
              <button
                onClick={sendNotification}
                disabled={notifySending}
                className="px-3 py-1.5 rounded-md text-xs font-body font-medium"
                style={{ background: "#10b981", color: "#ffffff" }}
              >
                {notifySending ? "Envoi…" : "Envoyer sur WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      )}

      {datesModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => !datesSaving && setDatesModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-5"
            style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-heading font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
                Dates — {project.title}
              </p>
              <button
                onClick={() => setDatesModalOpen(false)}
                disabled={datesSaving}
                aria-label="Fermer"
                style={{ color: "var(--admin-text-muted)" }}
              >
                <X size={16} />
              </button>
            </div>

            <label className="block text-xs font-body mb-1" style={{ color: "var(--admin-text-muted)" }}>
              Date de début
            </label>
            <input
              type="date"
              value={startDateInput}
              onChange={(e) => setStartDateInput(e.target.value)}
              className="w-full rounded-md px-3 py-2 text-xs font-body mb-3"
              style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
            />

            <label className="block text-xs font-body mb-1" style={{ color: "var(--admin-text-muted)" }}>
              Fin estimée
            </label>
            <input
              type="date"
              value={endDateInput}
              onChange={(e) => setEndDateInput(e.target.value)}
              className="w-full rounded-md px-3 py-2 text-xs font-body"
              style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
            />

            {datesError && (
              <p className="text-xs font-body mt-2" style={{ color: "#ef4444" }}>
                Échec de la sauvegarde. Réessaie.
              </p>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setDatesModalOpen(false)}
                disabled={datesSaving}
                className="px-3 py-1.5 rounded-md text-xs font-body"
                style={{ background: "var(--admin-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" }}
              >
                Annuler
              </button>
              <button
                onClick={saveDates}
                disabled={datesSaving}
                className="px-3 py-1.5 rounded-md text-xs font-body font-medium"
                style={{ background: "var(--admin-accent)", color: "#ffffff" }}
              >
                {datesSaving ? "Sauvegarde…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
