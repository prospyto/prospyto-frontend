import Image from "next/image";

type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Swift Africa",
    tagline: "Achetez. Vendez. Livrez.",
    description:
      "Plateforme de commerce sécurisé pour l'Afrique de l'Ouest : l'argent de l'acheteur reste bloqué en escrow jusqu'à la livraison confirmée par code OTP, pour éliminer les arnaques entre acheteurs, vendeurs et livreurs.",
    tags: ["Next.js", "Django", "Escrow", "GPS temps réel"],
    link: "https://swift-africa-app.vercel.app/",
    image: "/portfolio-swift-africa.jpeg",
  },
  {
    title: "Câlin Éternel",
    tagline: "Challenge Saint-Valentin 2026",
    description:
      "Landing page de vente conçue pour un challenge design : storytelling produit, urgence (compte à rebours), preuve sociale et tunnel d'achat pensés pour maximiser la conversion.",
    tags: ["Landing page", "Copywriting", "Conversion"],
    link: "https://ste-valentin-challenge.vercel.app/",
  },
];

export default function Portfolio() {
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
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface group overflow-hidden block"
            >
              <div className="relative h-40 w-full bg-black/30 overflow-hidden rounded-t-2xl">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
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
                  {project.title}
                </p>
                <p className="text-xs text-secondary font-body mt-0.5">
                  {project.tagline}
                </p>
                <p className="mt-3 text-sm text-white/65 font-body leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-primary/25 text-secondary font-body border border-secondary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
