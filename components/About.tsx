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
        <p className="mt-4 text-white/80 font-body max-w-2xl leading-relaxed">
          Autodidacte et curieux, j&apos;ai appris en construisant de vrais
          projets plutôt qu&apos;en suivant un parcours classique. Ce qui me
          motive, c&apos;est de voir une idée devenir un outil concret qui
          change le quotidien d&apos;un business. J&apos;aime m&apos;impliquer
          pleinement dans chaque projet qu&apos;on me confie, avec rigueur et
          engagement.
        </p>
      </div>
    </section>
  );
}
