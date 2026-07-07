const FORMATION = [
  {
    period: "En cours",
    title: "Flutter",
    place: "Flutter Summit",
  },
  {
    period: "Terminé",
    title: "Python",
    place: "FORCE-N",
  },
  {
    period: "Terminé",
    title: "Fondamentaux du Web & Développement Front-End",
    place: "FATA",
  },
];

export default function Formation() {
  return (
    <section id="formation" className="section-tint mx-auto max-w-5xl px-6 py-16">
      <div className="relative z-10">
        <span className="section-eyebrow">Parcours</span>
        <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
          Formation
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FORMATION.map((item) => (
            <div key={item.title} className="card-surface p-6 flex flex-col gap-3">
              <span className="self-start text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-primary/30 text-secondary font-body">
                {item.period}
              </span>
              <p className="font-heading font-medium text-white text-base">
                {item.title}
              </p>
              <p className="text-xs text-white/55 font-body">{item.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
