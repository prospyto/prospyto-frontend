import Blob from "./Blob";

export default function Hero() {
  return (
    <section className="relative bg-background text-white overflow-hidden">
      <Blob color="var(--primary-color)" className="-top-20 -left-20" size={380} />
      <Blob color="var(--secondary-color)" className="top-10 right-0" size={320} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
        <h1 className="hero-title font-heading font-bold text-4xl md:text-6xl leading-tight tracking-tight">
          Prospère Azonglahoun | Dev &amp; Design
        </h1>
        <p className="mt-6 text-base md:text-lg text-secondary max-w-2xl mx-auto font-body">
          Sites web, applications et outils sur mesure pour entreprises et
          entrepreneurs en Afrique de l&apos;Ouest.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#commander"
            className="inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-hover px-6 py-3 font-heading font-semibold text-sm md:text-base tracking-wide transition-colors text-white"
          >
            Commander un Projet
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-xl border border-secondary/40 hover:bg-primary/20 px-6 py-3 font-heading font-semibold text-sm md:text-base tracking-wide transition-colors text-white"
          >
            Voir le Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
