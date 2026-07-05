import Image from "next/image";
import Blob from "./Blob";

export default function Hero() {
  return (
    <section className="relative bg-background text-white overflow-hidden">
      <Blob color="var(--primary-color)" className="-top-20 -left-20" size={380} />
      <Blob color="var(--secondary-color)" className="top-10 right-0" size={320} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-10">
        <div className="text-center md:text-left">
          <h1 className="hero-title font-heading font-bold text-4xl md:text-6xl leading-tight tracking-tight">
            Prospère AZONGLAHOUN
          </h1>
          <p className="mt-3 text-lg md:text-2xl font-heading font-medium text-secondary">
            Développeur Full Stack
          </p>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl mx-auto md:mx-0 font-body">
            Sites web, applications et outils sur mesure pour entreprises et
            entrepreneurs en Afrique de l&apos;Ouest.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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

        <div className="relative mx-auto w-56 h-56 md:w-72 md:h-72">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-50"
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
      </div>
    </section>
  );
}
