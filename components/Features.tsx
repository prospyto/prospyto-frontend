import { Link2, Activity, MessageCircle, Star, Bell, Layout } from "lucide-react";

const FEATURES = [
  {
    icon: Link2,
    title: "Lien unique, zéro friction",
    description: "Chaque client suit son projet via un lien personnel, aucun compte à créer.",
  },
  {
    icon: Activity,
    title: "Suivi de progression transparent",
    description: "Barre de progression en temps réel, visible à tout moment sur le lien de suivi.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp comme canal principal",
    description: "Toute la communication reste là où tu es déjà, pas de nouvel outil à apprendre.",
  },
  {
    icon: Bell,
    title: "Notifications automatiques",
    description: "Le client est prévenu à chaque étape clé, sans avoir à revenir vérifier lui-même.",
  },
  {
    icon: Star,
    title: "Avis clients vérifiés",
    description: "Un avis peut être laissé une fois le projet complété, affiché sur le portfolio.",
  },
  {
    icon: Layout,
    title: "Portfolio & blog intégrés",
    description: "Les projets terminés et les articles sont gérés depuis un espace dédié, sans coder.",
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="mx-auto max-w-5xl px-6 py-20">
      <span className="section-eyebrow">Fonctionnalités</span>
      <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
        Tout ce qu&apos;il faut pour un suivi de projet clair
      </h2>
      <p className="mt-3 text-white/70 font-body max-w-2xl">
        Une plateforme pensée pour rester simple côté client, tout en donnant
        les bons outils côté gestion.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="card-surface p-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(224, 170, 255, 0.12)" }}
              >
                <Icon size={20} color="var(--secondary-color)" />
              </div>
              <p className="font-heading font-semibold text-sm text-white">
                {feature.title}
              </p>
              <p className="mt-2 text-sm text-white/60 font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
