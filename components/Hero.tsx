import Image from "next/image";
import Blob from "./Blob";
import Stars from "./Stars";
import StatCounter from "./StatCounter";
import ParticleRing from "./ParticleRing";

export default function Hero() {
  return (
    <section className="relative bg-background text-white overflow-hidden">
      <ParticleRing />
      <Blob color="var(--primary-color)" className="-top-20 -left-20" size={380} />
      <Blob color="var(--secondary-color)" className="top-10 right-0" size={320} />
      <Stars />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32">
        {/* Section Supérieure: Texte + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Titre : premier sur mobile ET desktop */}
          <div className="md:col-start-1 md:row-start-1">
            <div className="hero-title-container mb-4">
              <h1 className="hero-title-sweep font-heading font-bold text-4xl md:text-5xl leading-tight tracking-tight">
                Tu as besoin d&apos;un site web, d&apos;une app, ou d&apos;un outil?
              </h1>
            </div>
          </div>

          {/* Image : sur mobile, juste après le titre. Sur desktop, colonne de droite sur toute la hauteur */}
          <div className="md:col-start-2 md:row-start-1 md:row-span-2 relative mx-auto md:mx-0 md:ml-auto md:translate-x-10 lg:translate-x-16 h-72 sm:h-80 md:h-[32rem] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/prospere-photo.jpeg"
              alt="Prospère Azonglahoun"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Reste du texte : après l'image sur mobile, sous le titre sur desktop */}
          <div className="md:col-start-1 md:row-start-2">
            <p className="text-lg text-white/80 font-body mb-6 leading-relaxed">
              Je suis <strong>Prospère</strong>, développeur Full Stack, ton allié pour 
              transformer une idée en produit qui marche. Je construis des 
              solutions numériques complètes pour startups, petits business et solopreneurs 
              qui veulent avancer, vite et bien.
            </p>

            {/* Liste des problèmes résolus */}
            <div className="space-y-3 mb-8">
              <p className="text-white/80 font-body">
                <strong>Site web trop lent?</strong> Je le rends rapide et responsive.
              </p>
              <p className="text-white/80 font-body">
                <strong>Pas de boutique en ligne?</strong> Je crée un e-commerce qui vend.
              </p>
              <p className="text-white/80 font-body">
                <strong>Besoin d&apos;une app mobile ou outil interne?</strong> C&apos;est mon domaine.
              </p>
            </div>

            {/* CTA Principal */}
            <a
              href="#appel-gratuit"
              className="btn-animate btn-border-scan btn-primary-fx btn-accent inline-flex items-center gap-2 justify-center rounded-xl bg-accent hover:bg-accent-hover px-8 py-4 font-heading font-semibold text-base md:text-lg tracking-wide transition-colors text-white"
            >
              Démarrer
            </a>
            <p className="text-sm text-white/60 font-body mt-3">
              Pas d&apos;engagement. On discute juste de ton projet.
            </p>
          </div>
        </div>

        {/* Section Infos Rapides : cartes chiffrées, comptent au survol */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/10">
          <StatCounter value={2} label="Projets livrés avec succès" />
          <StatCounter value={100} suffix="%" label="Clients satisfaits" />
          <StatCounter value={3} suffix="/mois" label="Spots disponibles (limités!)" />
        </div>
      </div>
    </section>
  );
}
