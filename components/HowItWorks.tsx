import { Phone, ClipboardList, Settings, Rocket } from "lucide-react";
import Blob from "./Blob";
import StaggerGroup from "./StaggerGroup";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Appel Découverte",
      description:
        "On se parle 30 min (gratuit). Tu me décris ton projet, tes besoins, tes deadlines.",
      Icon: Phone,
    },
    {
      number: "02",
      title: "Proposition Personnalisée",
      description:
        "Je crée une proposition: scope clair, timeline réaliste, prix honnête. Pas de surprise.",
      Icon: ClipboardList,
    },
    {
      number: "03",
      title: "Développement",
      description:
        "Je construis ton projet avec les meilleures technos. Mises à jour régulières, tu vois la progression.",
      Icon: Settings,
    },
    {
      number: "04",
      title: "Livraison & Support",
      description:
        "Le projet est live, testé, optimisé. Je suis là pour les ajustements post-lancement.",
      Icon: Rocket,
    },
  ];

  return (
    <section id="comment-ca-marche" className="relative mx-auto max-w-5xl px-6 py-20 overflow-hidden">
      <Blob color="var(--primary-color)" className="-bottom-32 -left-32" size={320} />
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <span className="section-eyebrow">Mon Processus</span>
          <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
            Comment ça fonctionne
          </h2>
          <p className="mt-4 text-white/70 font-body max-w-2xl mx-auto">
            Un processus simple et transparent du début à la fin.
          </p>
        </div>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl border border-white/10 hover:border-secondary/40 transition-colors h-full"
              style={{ background: "var(--surface-medium)" }}
            >
              {/* Numéro */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-heading font-bold text-background text-lg">
                {step.number}
              </div>

              {/* Contenu */}
              <div className="mt-4">
                <step.Icon size={32} className="mb-3 text-secondary" />
                <h3 className="font-heading font-semibold text-lg text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
