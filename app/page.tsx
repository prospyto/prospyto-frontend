import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Sections à venir : Portfolio, Formulaire inquiry, Avis, Blog teaser */}
      <section id="portfolio" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-heading font-semibold text-2xl md:text-3xl text-primary-500">
          Mes Projets
        </h2>
        <p className="mt-4 text-neutral-600 font-body">
          Portfolio à venir — en attente des visuels et du contenu.
        </p>
      </section>
    </main>
  );
}
