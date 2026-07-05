import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Formation from "@/components/Formation";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Formation />
      <Reviews />
      <Contact />
    </main>
  );
}
