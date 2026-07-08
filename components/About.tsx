import { Zap, Target, Gem, Handshake } from "lucide-react";
import Blob from "./Blob";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-20 overflow-hidden">
      <Blob color="var(--secondary-color)" className="-bottom-24 -right-24" size={340} />
      <div className="relative z-10">
        <span className="section-eyebrow">Pourquoi choisir Prospère?</span>
        <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
          Tu cherches quelqu&apos;un de sérieux
        </h2>
        <p className="mt-4 text-white/80 font-body max-w-2xl leading-relaxed">
          Pas un freelancer qui disparaît après le paiement. Un développeur engagé, 
          fiable, qui comprend TON business.
        </p>

        {/* Avantages clés */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Avantage 1 */}
          <div className="p-6 rounded-2xl border border-white/10 hover:border-secondary/40 transition-colors"
            style={{ background: "#2d0a52" }}>
            <Zap size={32} className="mb-3 text-secondary" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              Livraison rapide
            </h3>
            <p className="text-white/70 font-body text-sm">
              Projets livrés dans les délais. Pas de promesses en l&apos;air, du concret.
            </p>
          </div>

          {/* Avantage 2 */}
          <div className="p-6 rounded-2xl border border-white/10 hover:border-secondary/40 transition-colors"
            style={{ background: "#2d0a52" }}>
            <Target size={32} className="mb-3 text-secondary" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              Comprendre ton besoin
            </h3>
            <p className="text-white/70 font-body text-sm">
              Je demande les bonnes questions. L&apos;objectif c&apos;est ton succès, pas juste coder.
            </p>
          </div>

          {/* Avantage 3 */}
          <div className="p-6 rounded-2xl border border-white/10 hover:border-secondary/40 transition-colors"
            style={{ background: "#2d0a52" }}>
            <Gem size={32} className="mb-3 text-secondary" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              Code de qualité
            </h3>
            <p className="text-white/70 font-body text-sm">
              Pas de hack. Code maintenable, scalable, prêt pour demain.
            </p>
          </div>

          {/* Avantage 4 */}
          <div className="p-6 rounded-2xl border border-white/10 hover:border-secondary/40 transition-colors"
            style={{ background: "#2d0a52" }}>
            <Handshake size={32} className="mb-3 text-secondary" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              Support post-lancement
            </h3>
            <p className="text-white/70 font-body text-sm">
              Ton projet est livré, mais je reste disponible pour les ajustements.
            </p>
          </div>
        </div>

        {/* Section "Qui suis-je" */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <h3 className="font-heading font-semibold text-2xl text-white mb-6">
            Un peu sur moi
          </h3>
          <div className="space-y-4 text-white/80 font-body leading-relaxed">
            <p>
              Je m&apos;appelle <strong>Prospère Azonglahoun</strong>, je suis basé à 
              <strong> Cotonou, Bénin</strong>. J&apos;ai suivi des formations, mais j&apos;ai 
              surtout appris en autodidacte, en construisant de vrais projets et en testant 
              ce qui marche vraiment sur le terrain, pas seulement en théorie.
            </p>
            <p>
              J&apos;ai livré <strong>2 projets complexes</strong> avec succès (Swift Africa, 
              Câlin Éternel). Mes clients sont satisfaits. Les délais? Respectés. 
              Le code? Maintenable.
            </p>
            <p>
              Je me spécialise dans Next.js, Django, PostgreSQL, les techs modernes 
              et scalables. Mais je choisis la technologie selon TON besoin, pas selon 
              ce que j&apos;aime coder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
