import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import FreeCallCTA from "@/components/FreeCallCTA";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Portfolio />
      </Reveal>
      <Reveal>
        <Skills />
      </Reveal>
      <Reveal>
        <FreeCallCTA />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  );
}
