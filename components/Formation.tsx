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
    <section id="formation" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
        Formation
      </h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {FORMATION.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl p-5 border border-white/10 flex flex-col gap-2"
            style={{ background: "#2d0a52" }}
          >
            <span className="self-start text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-primary/30 text-secondary font-body">
              {item.period}
            </span>
            <p className="font-heading font-medium text-white text-sm mt-1">
              {item.title}
            </p>
            <p className="text-xs text-white/60 font-body">{item.place}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
