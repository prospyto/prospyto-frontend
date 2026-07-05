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
      
      {/* Quick link to Yan Youn Portfolio */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
        <a
          href="/portfolio-yan-youn"
          style={{
            display: 'inline-block',
            padding: '12px 20px',
            backgroundColor: '#0066CC',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0052A3';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 102, 204, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0066CC';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.3)';
          }}
        >
          → Yan Youn Portfolio
        </a>
      </div>
    </main>
  );
}
