"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import CircularProgress from "./components/CircularProgress";
import ProjectRow, { AdminProject } from "./components/ProjectRow";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiBase}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch(() => setError("Impossible de charger les projets (backend indisponible ?)"))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const activeCount = projects.filter((p) => p.status !== "complete").length;
  const completedCount = projects.filter((p) => p.status === "complete").length;
  const avgCompletion = projects.length
    ? Math.round(projects.reduce((sum, p) => sum + p.completion_percent, 0) / projects.length)
    : 0;

  return (
    <div className="admin-theme flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="font-heading font-semibold text-2xl" style={{ color: "var(--admin-text)" }}>
          Vue d&apos;ensemble
        </h1>
        <p className="text-sm mt-1 font-body" style={{ color: "var(--admin-text-muted)" }}>
          Gestion des projets, progression et notifications clients
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <StatCard label="Projets actifs" value={String(activeCount)} />
          <StatCard label="Projets complétés" value={String(completedCount)} />
          <StatCard label="Progression moyenne" value={`${avgCompletion}%`} />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <h2 className="font-heading font-medium text-sm mb-3" style={{ color: "var(--admin-text-muted)" }}>
              Projets en cours
            </h2>

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

            {!loading && !error && projects.length === 0 && (
              <p className="text-sm font-body" style={{ color: "var(--admin-text-muted)" }}>
                Aucun projet pour le moment.
              </p>
            )}

            <div className="flex flex-col gap-3">
              {projects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          </div>

          <CircularProgress percent={avgCompletion} label="Progression moyenne des projets actifs" />
        </div>
      </main>
    </div>
  );
}
