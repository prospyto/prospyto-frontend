import Image from "next/image";
import { SiGithub } from "react-icons/si";
import StaggerGroup from "./StaggerGroup";

const GITHUB_PROFILE = "https://github.com/prospyto";

type Project = {
  id: string;
  title: string;
  tagline: string;
  pitch: string;
  tags: string[];
  link?: string;
  image?: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "swift-africa",
    title: "Swift Africa",
    tagline: "Achetez. Vendez. Livrez. En toute sécurité.",
    pitch:
      "L'argent de l'acheteur reste bloqué jusqu'à la livraison confirmée. Zéro arnaque, suivi de livraison en temps réel.",
    tags: ["Next.js", "Django", "Escrow", "GPS temps réel", "PostgreSQL"],
    link: "https://swift-africa-app.vercel.app/",
    image: "/portfolio-swift-africa.jpeg",
    featured: true,
  },
  {
    id: "prospyto-dev",
    title: "Prospyto.dev",
    tagline: "Mon portfolio personnel",
    pitch:
      "Un site rapide, clair, pensé pour convertir : chaque visiteur voit en quelques secondes ce que je sais construire.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://prospytodev.vercel.app/",
  },
  {
    id: "calin-eternel",
    title: "Câlin Éternel",
    tagline: "Challenge Saint-Valentin 2026",
    pitch:
      "Landing page de vente : storytelling, urgence, preuve sociale. Pensée pour transformer un visiteur en acheteur.",
    tags: ["Landing page", "Copywriting", "Conversion", "Tailwind CSS"],
    link: "https://ste-valentin-challenge.vercel.app/",
  },
];

export default function Portfolio() {
  return (
    <section id="projects" className="section-tint mx-auto max-w-5xl px-6 py-20">
      <div className="relative z-10">
        <span className="section-eyebrow">Réalisations</span>
        <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
          Mes Projets
        </h2>
        <p className="mt-3 text-white/60 font-body max-w-2xl">
          Quelques réalisations récentes, du produit complet à la landing
          page orientée conversion.
        </p>

        <StaggerGroup className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              id={`project-${proj.id}`}
              className={`card-surface overflow-hidden scroll-mt-24 ${
                proj.featured ? "md:col-span-2 ring-1 ring-secondary/40" : ""
              }`}
            >
              <div
                className="relative h-64 md:h-72 w-full overflow-hidden rounded-t-2xl flex items-center justify-center"
                style={{ background: "#000000" }}
              >
                {proj.image ? (
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white/30 text-xs font-body">
                    Aperçu à venir
                  </div>
                )}
                {proj.featured && (
                  <span className="absolute top-3 left-3 text-[11px] px-2.5 py-1 rounded-full bg-secondary text-[#1c0538] font-heading font-semibold">
                    Projet phare
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="font-heading font-semibold text-xl text-white">
                  {proj.title}
                </p>
                <p className="text-sm text-secondary font-body mt-0.5">
                  {proj.tagline}
                </p>
                <p className="mt-3 text-sm text-white/70 font-body leading-relaxed">
                  {proj.pitch}
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

                <div className="mt-5 flex flex-wrap gap-3">
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-animate btn-border-scan btn-primary-fx inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-sm font-heading font-semibold text-white transition-colors"
                    >
                      Voir le projet
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </StaggerGroup>

        <div className="mt-10 text-center">
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-animate btn-border-scan inline-flex items-center gap-2 rounded-lg border border-primary/50 hover:bg-primary/10 px-5 py-2.5 text-sm font-heading font-semibold text-white transition-colors"
          >
            <SiGithub size={16} />
            Voir mon profil GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
