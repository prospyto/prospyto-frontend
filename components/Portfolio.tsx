"use client";

import { useState } from "react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    id: "swift-africa",
    title: "Swift Africa",
    tagline: "Achetez. Vendez. Livrez.",
    description:
      "Plateforme de commerce sécurisé pour l'Afrique de l'Ouest : l'argent de l'acheteur reste bloqué en escrow jusqu'à la livraison confirmée par code OTP, pour éliminer les arnaques entre acheteurs, vendeurs et livreurs.",
    fullDescription:
      "Plateforme de commerce sécurisé pour l'Afrique de l'Ouest : l'argent de l'acheteur reste bloqué en escrow jusqu'à la livraison confirmée par code OTP, pour éliminer les arnaques entre acheteurs, vendeurs et livreurs. Intégration de GPS temps réel, système de notation et messaging en temps réel.",
    tags: ["Next.js", "Django", "Escrow", "GPS temps réel", "PostgreSQL"],
    link: "https://swift-africa-app.vercel.app/",
    github: "https://github.com/prospyto/swift-africa-app-front",
    image: "/portfolio-swift-africa.jpeg",
  },
  {
    id: "calin-eternel",
    title: "Câlin Éternel",
    tagline: "Challenge Saint-Valentin 2026",
    description:
      "Landing page de vente conçue pour un challenge design : storytelling produit, urgence (compte à rebours), preuve sociale et tunnel d'achat pensés pour maximiser la conversion.",
    fullDescription:
      "Landing page de vente conçue pour un challenge design : storytelling produit, urgence (compte à rebours), preuve sociale et tunnel d'achat pensés pour maximiser la conversion. Conversion optimisée avec copywriting percutant et call-to-action clairs.",
    tags: ["Landing page", "Copywriting", "Conversion", "Tailwind CSS"],
    link: "https://ste-valentin-challenge.vercel.app/",
  },
];

export default function Portfolio() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const project = selectedId ? PROJECTS.find((p) => p.id === selectedId) : null;

  return (
    <section id="portfolio" className="section-tint mx-auto max-w-5xl px-6 py-20">
      <div className="relative z-10">
        <span className="section-eyebrow">Réalisations</span>
        <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
          Mes Projets
        </h2>
        <p className="mt-3 text-white/60 font-body max-w-2xl">
          Quelques réalisations récentes — du produit complet à la landing
          page orientée conversion.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedId(proj.id)}
              className="card-surface group overflow-hidden block text-left w-full"
            >
              <div className="relative h-40 w-full bg-black/30 overflow-hidden rounded-t-2xl">
                {proj.image ? (
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white/30 text-xs font-body">
                    Aperçu à venir
                  </div>
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,5,56,0.95), transparent 60%)",
                  }}
                />
              </div>

              <div className="p-5">
                <p className="font-heading font-semibold text-lg text-white">
                  {proj.title}
                </p>
                <p className="text-xs text-secondary font-body mt-0.5">
                  {proj.tagline}
                </p>
                <p className="mt-3 text-sm text-white/65 font-body leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-primary/25 text-secondary font-body border border-secondary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-secondary font-heading">
                  Cliquer pour voir plus →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal détails projet */}
      {project && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="card-surface max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {project.image && (
              <div className="relative h-56 w-full bg-black/30 rounded-t-2xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,5,56,0.95), transparent 60%)",
                  }}
                />
              </div>
            )}

            <div className="p-8">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-secondary font-heading text-base">
                {project.tagline}
              </p>

              <p className="mt-6 text-white/75 font-body leading-relaxed text-sm">
                {project.fullDescription || project.description}
              </p>

              <div className="mt-8">
                <p className="font-heading font-semibold text-xs uppercase tracking-wide text-secondary mb-3">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/20 text-secondary text-xs font-body border border-secondary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-animate btn-primary-fx inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-heading font-semibold text-white transition-colors"
                  >
                    Voir la démo →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-animate inline-flex items-center gap-2 rounded-lg border border-secondary/40 hover:bg-primary/10 px-4 py-2 text-sm font-heading font-semibold text-white transition-colors"
                  >
                    Code GitHub →
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedId(null)}
                className="btn-animate mt-8 w-full py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-colors text-sm font-body"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
