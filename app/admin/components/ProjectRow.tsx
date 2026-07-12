"use client";

import { useState } from "react";
import { StickyNote, Copy, Check } from "lucide-react";
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
};

const STATUS_LABEL: Record<AdminProject["status"], string> = {
  discussion: "Discussion",
  en_cours: "En cours",
  complete: "Complété",
};

const STATUS_OPTIONS: AdminProject["status"][] = ["discussion", "en_cours", "complete"];

export default function ProjectRow({ project }: { project: AdminProject }) {
  const [percent, setPercent] = useState(project.completion_percent);
  const [status, setStatus] = useState(project.status);
  const [saving, setSaving] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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
    await adminFetch(`/api/projects/${project.id}/notify`, {
      method: "POST",
      body: JSON.stringify({ type: "progress" }),
    });
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
          {[5, 10].map((step) => (
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
            onClick={sendNotification}
            className="px-3 py-1.5 rounded-md text-xs font-body font-medium"
            style={{ background: "var(--admin-accent)", color: "#ffffff" }}
          >
            Notifier
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
    </div>
  );
}
