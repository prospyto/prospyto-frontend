import Blob from "./Blob";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-5xl px-6 py-20 overflow-hidden">
      <Blob color="var(--secondary-color)" className="-bottom-24 -right-24" size={340} />
      <div className="relative z-10">
        <h2 className="font-heading font-semibold text-2xl md:text-3xl text-secondary">
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
