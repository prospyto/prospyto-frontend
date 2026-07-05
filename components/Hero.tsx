export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
        <h1 className="hero-title font-heading font-bold text-4xl md:text-6xl leading-tight tracking-tight">
          Yan Youn | Dev Full-Stack
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/90 max-w-2xl mx-auto font-body">
          Sites web, applications et outils sur mesure pour entreprises et
          entrepreneurs en Afrique de l&apos;Ouest.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#commander"
            className="inline-flex items-center justify-center rounded-xl bg-action-500 hover:bg-action-600 px-6 py-3 font-heading font-semibold text-sm md:text-base tracking-wide transition-colors"
          >
            Commander un Projet
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-xl border border-white/40 hover:bg-white/10 px-6 py-3 font-heading font-semibold text-sm md:text-base tracking-wide transition-colors"
          >
            Voir le Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
