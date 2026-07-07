import Image from "next/image";
import Blob from "./Blob";
import Stars from "./Stars";
import Typewriter from "./Typewriter";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative bg-background text-white overflow-hidden">
      <Blob color="var(--primary-color)" className="-top-20 -left-20" size={380} />
      <Blob color="var(--secondary-color)" className="top-10 right-0" size={320} />
      <Stars />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Colonne gauche : photo + texte */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-60 scale-110"
              style={{ background: "var(--secondary-color)" }}
              aria-hidden
            />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-secondary/40">
              <Image
                src="/prospere-photo.jpeg"
                alt="Prospère Azonglahoun"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="hero-title mt-6 font-heading font-bold text-2xl md:text-4xl leading-tight tracking-tight min-h-[2.4em] md:min-h-[1.2em]">
            <Typewriter text="Je m'appelle Prospère Azonglahoun" />
          </h1>
          <p className="mt-3 text-lg md:text-xl font-heading font-medium text-secondary">
            Développeur Full Stack
          </p>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl font-body">
            Je t&apos;aide à construire de A à Z ton allié informatique — ton
            outil numérique pour faire avancer ton business : portfolio, site
            web, site vitrine, et plus encore.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#commander"
              className="inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-hover px-6 py-3 font-heading font-semibold text-sm md:text-base tracking-wide transition-colors text-white"
            >
              Commander un projet
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-xl border border-secondary/40 hover:bg-primary/20 px-6 py-3 font-heading font-semibold text-sm md:text-base tracking-wide transition-colors text-white"
            >
              Voir le portfolio
            </a>
          </div>
        </div>

        {/* Colonne droite : aperçu du dashboard de suivi client */}
        <DashboardPreview />
      </div>
    </section>
  );
}
