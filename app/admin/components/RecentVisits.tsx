"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { adminFetch } from "@/lib/adminAuth";

type Visit = {
  id: number;
  created_at: string;
  project_id: number;
  project_title: string;
  client_name: string;
};

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

export default function RecentVisits() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/analytics/visits?limit=8")
      .then((res) => res.json())
      .then(setVisits)
      .catch(() => setVisits([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="rounded-2xl p-5 mt-4"
      style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
    >
      <h2 className="font-heading font-medium text-sm mb-3 flex items-center gap-2" style={{ color: "var(--admin-text-muted)" }}>
        <Eye size={14} />
        Visites récentes
      </h2>

      {loading && (
        <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
          Chargement…
        </p>
      )}

      {!loading && visits.length === 0 && (
        <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
          Aucune visite pour l&apos;instant.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {visits.map((visit) => (
          <div key={visit.id} className="flex flex-col">
            <p className="text-sm font-body" style={{ color: "var(--admin-text)" }}>
              {visit.client_name}
            </p>
            <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
              {visit.project_title} · {timeAgo(visit.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
