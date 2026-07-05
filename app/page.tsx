import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import CaseStudy from "@/components/CaseStudy";
import Credentials from "@/components/Credentials";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Services />
      <CaseStudy />
      <Credentials />
      <Reviews />
    </main>
  );
}
