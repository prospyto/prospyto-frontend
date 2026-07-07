import Image from "next/image";
import Blob from "./Blob";
import Stars from "./Stars";

export default function Hero() {
  return (
    <section className="relative bg-background text-white overflow-hidden">
      <Blob color="var(--primary-color)" className="-top-20 -left-20" size={380} />
      <Blob color="var(--secondary-color)" className="top-10 right-0" size={320} />
      <Stars />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32">
        {/* Section Supérieure: Texte + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Texte */}
          <div>
            <p className="text-secondary font-heading font-semibold text-sm uppercase tracking-wide mb-3">
              ✨ Ton allié pour transformer une idée en produit qui marche
            </p>
            
            <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight tracking-tight text-white mb-4">
              Tu as besoin d'un site web, d'une app, ou d'un outil?
            </h1>
            
            <p className="text-lg text-white/80 font-body mb-6 leading-relaxed">
              Je suis <strong>Prospère</strong>, développeur Full Stack. Je construis des 
              solutions numériques complètes pour startups, petits business et solopreneurs 
              qui veulent avancer — vite et bien.
            </p>

            {/* Liste des problèmes résolus */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-secondary font-bold text-xl">→</span>
                <p className="text-white/80 font-body">
                  <strong>Site web trop lent?</strong> Je le rends rapide et responsive.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-secondary font-bold text-xl">→</span>
                <p className="text-white/80 font-body">
                  <strong>Pas de boutique en ligne?</strong> Je crée un e-commerce qui vend.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-secondary font-bold text-xl">→</span>
                <p className="text-white/80 font-body">
                  <strong>Besoin d'une app mobile ou outil interne?</strong> C'est mon domaine.
                </p>
              </div>
            </div>

            {/* CTA Principal */}
            <a
              href="#appel-gratuit"
              className="inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-hover px-8 py-4 font-heading font-semibold text-base md:text-lg tracking-wide transition-all text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              📞 Appel découverte gratuit (30 min)
            </a>
            <p className="text-sm text-white/60 font-body mt-3">
              Pas d'engagement. On discute juste de ton projet.
            </p>
          </div>

          {/* Image */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0">
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
        </div>

        {/* Section Infos Rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/10">
          <div className="text-center md:text-left">
            <p className="text-3xl md:text-4xl font-heading font-bold text-secondary">2</p>
            <p className="text-white/70 font-body text-sm mt-1">
              Projets livrés avec succès
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-3xl md:text-4xl font-heading font-bold text-secondary">100%</p>
            <p className="text-white/70 font-body text-sm mt-1">
              Clients satisfaits
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-3xl md:text-4xl font-heading font-bold text-secondary">3/mois</p>
            <p className="text-white/70 font-body text-sm mt-1">
              Spots disponibles (limités!)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
