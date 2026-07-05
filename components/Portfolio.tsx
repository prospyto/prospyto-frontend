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
    <section id="portfolio" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Mes Projets
      </h2>
      <p className="mt-3 text-white/70 font-body max-w-2xl">
        Quelques réalisations récentes — du produit complet à la landing page
        orientée conversion.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/40 transition-colors"
            style={{ background: "#2d0a52" }}
          >
            <div className="relative h-48 w-full bg-black/30">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white/30 text-sm font-body">
                  Aperçu à venir
                </div>
              )}
            </div>

            <div className="p-5">
              <p className="font-heading font-semibold text-lg text-white">
                {project.title}
              </p>
              <p className="text-sm text-secondary font-body">{project.tagline}</p>
              <p className="mt-3 text-sm text-white/70 font-body">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-secondary font-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
