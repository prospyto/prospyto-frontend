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
      "Plateforme de commerce sécurisé pour l'Afrique de l'Ouest.",
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
      "Landing page de vente conçue pour un challenge design.",
    fullDescription:
      "Landing page de vente conçue pour un challenge design : storytelling produit, urgence (compte à rebours), preuve sociale et tunnel d'achat pensés pour maximiser la conversion. Conversion optimisée avec copywriting percutant et call-to-action clairs.",
    tags: ["Landing page", "Copywriting", "Conversion", "Tailwind CSS"],
    link: "https://ste-valentin-challenge.vercel.app/",
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const project = selectedProject
    ? PROJECTS.find((p) => p.id === selectedProject)
    : null;

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Mes Projets
      </h2>
      <p className="mt-3 text-white/70 font-body max-w-2xl">
        Quelques réalisations récentes — du produit complet à la landing page
        orientée conversion.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((proj) => (
          <button
            key={proj.id}
            onClick={() => setSelectedProject(proj.id)}
            className="group rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/40 transition-colors text-left cursor-pointer"
            style={{ background: "#2d0a52" }}
          >
            <div className="relative h-48 w-full bg-black/30">
              {proj.image ? (
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white/30 text-sm font-body">
                  Aperçu à venir
                </div>
              )}
            </div>

            <div className="p-5">
              <p className="font-heading font-semibold text-lg text-white">
                {proj.title}
              </p>
              <p className="text-sm text-secondary font-body">{proj.tagline}</p>
              <p className="mt-3 text-sm text-white/70 font-body">
                {proj.description}
              </p>
              <div className="mt-4 text-xs text-primary font-heading">
                Cliquez pour voir plus →
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal Détails */}
      {project && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-background rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            {project.image && (
              <div className="relative h-64 w-full bg-black/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            )}

            {/* Contenu */}
            <div className="p-8">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-secondary font-heading text-lg">
                {project.tagline}
              </p>

              {/* Description complète */}
              <p className="mt-6 text-white/80 font-body leading-relaxed">
                {project.fullDescription || project.description}
              </p>

              {/* Technologies */}
              <div className="mt-8">
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-secondary mb-3">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/20 text-secondary text-xs font-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Liens */}
              <div className="mt-8 flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-heading font-semibold text-white transition-colors"
                  >
                    Voir la démo →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/50 hover:bg-primary/10 px-4 py-2 text-sm font-heading font-semibold text-white transition-colors"
                  >
                    Code GitHub →
                  </a>
                )}
              </div>

              {/* Fermer */}
              <button
                onClick={() => setSelectedProject(null)}
                className="mt-8 w-full py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-colors text-sm font-body"
              >
                Fermer (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
