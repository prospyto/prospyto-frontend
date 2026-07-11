"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearToken, adminFetch } from "@/lib/adminAuth";

const NAV_ITEMS = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/inquiries", label: "Demandes" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/reviews", label: "Avis" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    adminFetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => setPendingCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setPendingCount(0));
  }, [pathname]);

  function handleLogout() {
    clearToken();
    window.location.href = "/admin/verify-8db242e403bbe210e9392a1259cc7024360af1f8e4375f529b9b3130620c004d";
  }

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
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-body text-left transition-colors"
              style={{
                background: isActive ? "var(--admin-accent)" : "transparent",
                color: isActive ? "#ffffff" : "var(--admin-text-muted)",
              }}
            >
              <span>{item.label}</span>
              {item.href === "/admin/inquiries" && pendingCount > 0 && (
                <span
                  className="text-xs font-body font-medium rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center"
                  style={{
                    background: isActive ? "#ffffff" : "#ef4444",
                    color: isActive ? "var(--admin-accent)" : "#ffffff",
                  }}
                >
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-left transition-colors"
        style={{ color: "var(--admin-text-muted)" }}
      >
        Déconnexion
      </button>
    </aside>
  );
}
