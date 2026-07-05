import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Formation from "@/components/Formation";
import InquiryForm from "@/components/InquiryForm";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      <Hero />
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
        <Formation />
      </Reveal>
      <Reveal>
        <InquiryForm />
      </Reveal>
      <Reveal>
        <Reviews />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  );
}
