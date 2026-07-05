import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Formation from "@/components/Formation";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import PortfolioLink from "@/components/PortfolioLink";

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
      <PortfolioLink />
    </main>
  );
}
