"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { key: "overview", label: "Vue d'ensemble", icon: "◧" },
  { key: "inquiries", label: "Demandes", icon: "✉" },
  { key: "projects", label: "Projets en cours", icon: "▤" },
  { key: "notifications", label: "Notifications", icon: "◔" },
  { key: "reviews", label: "Avis reçus", icon: "★" },
  { key: "blog", label: "Blog", icon: "▥" },
];

export default function Sidebar() {
  const [active, setActive] = useState("overview");

  return (
    <aside
      className="w-64 shrink-0 flex flex-col py-6 px-4"
      style={{ background: "var(--admin-surface)", borderRight: "1px solid var(--admin-border)" }}
    >
      <div className="px-2 mb-8">
        <p className="font-heading font-semibold text-lg" style={{ color: "var(--admin-text)" }}>
          Prospère
        </p>
        <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
          Admin dashboard
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-left transition-colors"
              style={{
                background: isActive ? "var(--admin-accent)" : "transparent",
                color: isActive ? "#ffffff" : "var(--admin-text-muted)",
              }}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
