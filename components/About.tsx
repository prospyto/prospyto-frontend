import Blob from "./Blob";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-20 overflow-hidden">
      <Blob color="var(--secondary-color)" className="-bottom-24 -right-24" size={340} />
      <div className="relative z-10">
        <span className="section-eyebrow">Qui suis-je</span>
        <h2 className="mt-3 font-heading font-semibold text-3xl md:text-4xl text-white">
          À propos
        </h2>
        <div className="mt-6 space-y-4 text-white/80 font-body max-w-2xl leading-relaxed">
          <p>
            Je m&apos;appelle <strong>Prospère Azonglahoun</strong>, développeur Full Stack basé à 
            <strong> Cotonou, Bénin</strong>. Autodidacte et curieux, j&apos;ai appris en construisant 
            de vrais projets plutôt qu&apos;en suivant un parcours classique.
          </p>

          <p>
            Ce qui me motive, c&apos;est de voir une idée devenir un outil concret qui change le quotidien 
            d&apos;un business. Je me spécialise dans la création de <strong>solutions numériques complètes</strong> : 
            des vitrines web aux plateformes complexes avec authentification, paiements et gestion de données.
          </p>

          <p>
            J&apos;aime m&apos;impliquer pleinement dans chaque projet qu&apos;on me confie, avec rigueur et 
            engagement. Mon approche combine <strong>technique solide</strong> (Next.js, Node.js, Django, PostgreSQL) 
            et <strong>compréhension métier</strong> pour livrer des produits qui fonctionnent vraiment.
          </p>

          <p>
            Quand je ne code pas, je m&apos;intéresse aux tendances tech, je contribue à des projets open source, 
            et j&apos;aide d&apos;autres à démarrer leur carrière en dev.
          </p>
        </div>

        {/* Section Valeurs */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-heading font-semibold text-secondary text-lg mb-2">Autonomie</h3>
            <p className="text-sm text-white/70">
              Je prends l&apos;initiative et résous les problèmes de façon indépendante.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-secondary text-lg mb-2">Qualité</h3>
            <p className="text-sm text-white/70">
              Code propre, performant et maintenable. Pas de raccourcis.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-secondary text-lg mb-2">Apprentissage</h3>
            <p className="text-sm text-white/70">
              Je maîtrise vite les nouvelles techs et je partage mon savoir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
