const STATS = [
  { value: "Gratuit", label: "Frais d'inscription" },
  { value: "100%", label: "Livraisons sécurisées par OTP" },
  { value: "15", label: "Pays CEDEAO visés au lancement" },
  { value: "60s", label: "Pour passer une commande" },
];

export default function CaseStudy() {
  return (
    <section id="case-study" className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs uppercase tracking-widest text-secondary font-body">
        Étude de cas
      </p>
      <h2 className="mt-2 font-heading font-semibold text-2xl md:text-3xl text-white">
        Swift Africa — du problème au produit
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="font-heading font-semibold text-sm text-secondary">Le problème</p>
          <p className="mt-2 text-sm text-white/70 font-body">
            En Afrique de l&apos;Ouest, le e-commerce souffre d&apos;un manque
            de confiance : acheteurs qui refusent le colis à la livraison,
            vendeurs jamais payés, livreurs sans garantie de commission.
          </p>
        </div>
        <div>
          <p className="font-heading font-semibold text-sm text-secondary">La solution</p>
          <p className="mt-2 text-sm text-white/70 font-body">
            Un système d&apos;escrow : l&apos;argent de l&apos;acheteur est
            bloqué jusqu&apos;à la livraison, validée par un code OTP donné
            au livreur. Personne n&apos;est payé — ou lésé — avant ce moment.
          </p>
        </div>
        <div>
          <p className="font-heading font-semibold text-sm text-secondary">La stack</p>
          <p className="mt-2 text-sm text-white/70 font-body">
            Frontend Next.js, backend Django, suivi GPS temps réel des
            livreurs, wallet intégré pour les vendeurs.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center border border-white/10"
            style={{ background: "#2d0a52" }}
          >
            <p className="font-heading font-bold text-xl text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-white/60 font-body">{stat.label}</p>
          </div>
        ))}
      </div>

      <a
        href="https://swift-africa-app.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm text-secondary underline underline-offset-4 font-body"
      >
        Voir Swift Africa en ligne →
      </a>
    </section>
  );
}
