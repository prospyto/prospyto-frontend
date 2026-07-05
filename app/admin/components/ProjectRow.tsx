"use client";

import { useState } from "react";

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

export default function ProjectRow({ project }: { project: AdminProject }) {
  const [percent, setPercent] = useState(project.completion_percent);
  const [saving, setSaving] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function updateProgress(newPercent: number) {
    const clamped = Math.min(100, Math.max(0, newPercent));
    setPercent(clamped);
    setSaving(true);
    try {
      await fetch(`${apiBase}/api/projects/${project.id}/progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ percent: clamped }),
      });
    } catch {
      // silencieux : à brancher sur un toast d'erreur plus tard
    } finally {
      setSaving(false);
    }
  }

  async function openWhatsApp() {
    const res = await fetch(`${apiBase}/api/projects/${project.id}/whatsapp-link`);
    const data = await res.json();
    if (data.link) window.open(data.link, "_blank");
  }

  async function sendNotification() {
    await fetch(`${apiBase}/api/projects/${project.id}/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "progress" }),
    });
  }

  return (
    <div
      className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
      style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
          {project.title}
        </p>
        <p className="text-xs mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
          {project.client_name} · {STATUS_LABEL[project.status]}
        </p>
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
      </div>
    </div>
  );
}
