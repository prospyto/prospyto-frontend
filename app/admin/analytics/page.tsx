"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { adminFetch } from "@/lib/adminAuth";

type AnalyticsData = {
  period_days: number;
  total_events: number;
  by_event_type: { event_type: string; count: number }[];
  by_section: { section: string; count: number }[];
  by_source: { source: string; count: number }[];
  daily: { date: string; count: number }[];
  new_inquiries: number;
  projects_by_status: { status: string; count: number }[];
  total_blog_views: number;
};

const PERIOD_OPTIONS = [7, 30, 90];

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminFetch(`/api/admin/analytics?days=${days}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError("Impossible de charger les analytics"))
      .finally(() => setLoading(false));
  }, [days]);

  const maxDaily = data ? Math.max(1, ...data.daily.map((d) => d.count)) : 1;

  return (
    <div className="admin-theme flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-heading font-semibold text-2xl" style={{ color: "var(--admin-text)" }}>
              Analytics
            </h1>
            <p className="text-sm mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
              Activité du site et des projets
            </p>
          </div>

          <div className="flex gap-2">
            {PERIOD_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setLoading(true);
                  setDays(d);
                }}
                className="px-3 py-1.5 rounded-md text-xs font-body"
                style={{
                  background: days === d ? "var(--admin-accent)" : "var(--admin-surface)",
                  color: days === d ? "#ffffff" : "var(--admin-text-muted)",
                  border: "1px solid var(--admin-border)",
                }}
              >
                {d} jours
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <p className="text-sm mt-6 font-body" style={{ color: "var(--admin-text-muted)" }}>
            Chargement…
          </p>
        )}
        {error && (
          <p className="text-sm mt-6 font-body" style={{ color: "#ef4444" }}>
            {error}
          </p>
        )}

        {data && !loading && (
          <>
            <div className="mt-6 flex flex-wrap gap-4">
              <StatCard label="Événements" value={String(data.total_events)} />
              <StatCard label="Nouvelles demandes" value={String(data.new_inquiries)} />
              <StatCard label="Vues blog (total)" value={String(data.total_blog_views)} />
            </div>

            {/* Graphique en barres, activité par jour */}
            <div
              className="mt-6 rounded-2xl p-5"
              style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
            >
              <h2 className="font-heading font-medium text-sm mb-4" style={{ color: "var(--admin-text-muted)" }}>
                Activité par jour
              </h2>
              {data.daily.length === 0 ? (
                <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
                  Aucun événement sur cette période.
                </p>
              ) : (
                <div className="flex items-end gap-1 h-32">
                  {data.daily.map((d) => (
                    <div key={d.date} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      <div
                        className="w-full rounded-sm"
                        style={{
                          height: `${Math.max(4, (d.count / maxDaily) * 100)}%`,
                          background: "var(--admin-accent)",
                        }}
                        title={`${new Date(d.date).toLocaleDateString("fr-FR")} : ${d.count}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <BreakdownCard title="Par type d'événement" rows={data.by_event_type.map((r) => ({ label: r.event_type, count: r.count }))} />
              <BreakdownCard title="Par section" rows={data.by_section.map((r) => ({ label: r.section, count: r.count }))} />
              <BreakdownCard title="Par source" rows={data.by_source.map((r) => ({ label: r.source, count: r.count }))} />
            </div>

            <div className="mt-6">
              <BreakdownCard
                title="Projets par statut"
                rows={data.projects_by_status.map((r) => ({ label: r.status, count: r.count }))}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function BreakdownCard({ title, rows }: { title: string; rows: { label: string; count: number }[] }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}
    >
      <h2 className="font-heading font-medium text-sm mb-3" style={{ color: "var(--admin-text-muted)" }}>
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-xs font-body" style={{ color: "var(--admin-text-muted)" }}>
          Aucune donnée.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between text-xs font-body">
              <span style={{ color: "var(--admin-text)" }}>{r.label}</span>
              <span style={{ color: "var(--admin-text-muted)" }}>{r.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
