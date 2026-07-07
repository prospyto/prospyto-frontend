"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProgressBar from "./components/ProgressBar";
import StatusBadge, { type TrackStatus } from "./components/StatusBadge";
import ReviewForm from "./components/ReviewForm";

type TrackData = {
  title: string;
  description: string;
  completion_percent: number;
  status: TrackStatus;
  start_date: string | null;
  end_date_estimated: string | null;
  end_date_actual: string | null;
  whatsapp_link: string;
  can_review: boolean;
};

type LoadState = "loading" | "ready" | "not_found" | "error";

export default function TrackPage() {
  const params = useParams<{ link: string }>();
  const link = params.link;

  const [data, setData] = useState<TrackData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    if (!link) return;

    fetch(`${apiBase}/api/track/${link}`)
      .then((res) => {
        if (res.status === 404) {
          setLoadState("not_found");
          return null;
        }
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((json) => {
        if (json) {
          setData(json);
          setLoadState("ready");
        }
      })
      .catch(() => setLoadState("error"));
  }, [apiBase, link]);

  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        {loadState === "loading" && (
          <p className="text-sm font-body text-white/50">Chargement du suivi…</p>
        )}

        {loadState === "not_found" && (
          <div className="card-surface p-8 text-center">
            <p className="font-heading font-semibold text-lg text-white">
              Lien introuvable
            </p>
            <p className="mt-2 text-sm font-body text-white/60">
              Ce lien de suivi n&apos;existe pas ou plus. Vérifie qu&apos;il a été copié en entier.
            </p>
          </div>
        )}

        {loadState === "error" && (
          <div className="card-surface p-8 text-center">
            <p className="font-heading font-semibold text-lg text-white">
              Suivi momentanément indisponible
            </p>
            <p className="mt-2 text-sm font-body text-white/60">
              Réessaie dans quelques instants, ou contacte Prospère directement.
            </p>
          </div>
        )}

        {loadState === "ready" && data && (
          <>
            <span className="section-eyebrow">Suivi de projet</span>
            <div className="mt-3 flex items-start justify-between gap-4 flex-wrap">
              <h1 className="font-heading font-semibold text-2xl md:text-3xl text-white">
                {data.title}
              </h1>
              <StatusBadge status={data.status} />
            </div>

            <p className="mt-4 text-sm font-body text-white/70 leading-relaxed">
              {data.description}
            </p>

            <div className="card-surface p-6 mt-8">
              <ProgressBar percent={data.completion_percent} />

              {(data.start_date || data.end_date_estimated || data.end_date_actual) && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-body text-white/60">
                  {data.start_date && (
                    <div>
                      <p className="text-white/40 uppercase tracking-wider">Début</p>
                      <p className="mt-1 text-white">{data.start_date}</p>
                    </div>
                  )}
                  {data.end_date_estimated && (
                    <div>
                      <p className="text-white/40 uppercase tracking-wider">Fin estimée</p>
                      <p className="mt-1 text-white">{data.end_date_estimated}</p>
                    </div>
                  )}
                  {data.end_date_actual && (
                    <div>
                      <p className="text-white/40 uppercase tracking-wider">Fin réelle</p>
                      <p className="mt-1 text-white">{data.end_date_actual}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {data.whatsapp_link && (
                <a
                  href={data.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg text-sm font-body font-medium"
                  style={{ background: "#10b981", color: "#fff" }}
                >
                  Discuter sur WhatsApp
                </a>
              )}
              <Link
                href="/#portfolio"
                className="px-4 py-2.5 rounded-lg text-sm font-body font-medium"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
              >
                Voir le portfolio
              </Link>
            </div>

            {data.can_review && <ReviewForm link={link} />}
          </>
        )}
      </div>
    </main>
  );
}
