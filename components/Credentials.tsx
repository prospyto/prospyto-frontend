import CardDeal from "./CardDeal";

const FACTS = [
  {
    value: "4ème",
    label: "MIABE Hackathon 2026",
    detail: "avec TontineChain, une plateforme de tontine sur blockchain",
  },
  {
    value: "Autodidacte",
    label: "Formation",
    detail: "développement, design et outils IA appris en construisant de vrais projets",
  },
  {
    value: "10000codeurs",
    label: "Communauté",
    detail: "membre actif, partage et apprentissage continu",
  },
];

export default function Credentials() {
  return (
    <section id="credentials" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Pourquoi travailler avec moi
      </h2>

      <CardDeal className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {FACTS.map((fact) => (
          <div
            key={fact.label}
            className="card-surface p-6 border-l-2 border-primary"
          >
            <p className="font-heading font-bold text-xl text-white">{fact.value}</p>
            <p className="mt-1 text-sm font-medium text-white font-body">{fact.label}</p>
            <p className="mt-1 text-xs text-white/60 font-body">{fact.detail}</p>
          </div>
        ))}
      </CardDeal>
    </section>
  );
}
