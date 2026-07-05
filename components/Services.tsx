const SERVICES = [
  {
    title: "Sites & applications web",
    description:
      "Sites vitrines, portfolios, plateformes et applications web sur mesure, pensés pour accompagner l'évolution réelle de ton business.",
  },
  {
    title: "Design & branding",
    description:
      "Affiches, décors visuels, identité de marque — tout ce qu'il faut pour construire une image cohérente autour de ton activité.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Ce que je propose
      </h2>
      <p className="mt-3 text-white/70 font-body max-w-2xl">
        Deux domaines complémentaires pour donner une vraie présence
        numérique à ton activité.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl p-6 border border-white/10"
            style={{ background: "#2d0a52" }}
          >
            <p className="font-heading font-semibold text-lg text-white">
              {service.title}
            </p>
            <p className="mt-3 text-sm text-white/70 font-body">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
