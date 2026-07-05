const FORMATION = [
  {
    period: "En cours",
    title: "Flutter",
    place: "Flutter Summit",
  },
  {
    period: "",
    title: "Python",
    place: "FORCE-N",
  },
  {
    period: "",
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

      <div className="mt-8 flex flex-col gap-6">
        {FORMATION.map((item) => (
          <div key={item.title} className="flex items-start gap-4 border-l-2 border-primary pl-4">
            <div>
              {item.period && (
                <p className="text-xs uppercase tracking-wide text-secondary font-body">
                  {item.period}
                </p>
              )}
              <p className="font-heading font-medium text-white">{item.title}</p>
              <p className="text-sm text-white/60 font-body">{item.place}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
