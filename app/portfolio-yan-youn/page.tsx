'use client';

import { useEffect } from 'react';

export default function PortfolioPage() {
  useEffect(() => {
    // Initialiser l'année du footer
    const yearElement = document.getElementById('footer-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }

    // Fonctionnalité copy email
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
      const email = document.getElementById('contact-email');
      contactBtn.addEventListener('click', () => {
        if (email?.textContent) {
          navigator.clipboard.writeText(email.textContent);
          const originalText = contactBtn.innerHTML;
          contactBtn.innerHTML = 'Email copied! <i class="ri-check-line"></i>';
          setTimeout(() => {
            contactBtn.innerHTML = originalText;
          }, 2000);
        }
      });
    }
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="header" id="header">
        <div className="blob-animate"></div>
        <nav className="nav container">
          <a href="#" className="nav__logo">Yan Youn</a>

          <div className="nav__menu">
            <ul className="nav__list">
              <li><a href="#about" className="nav__link">About Me</a></li>
              <li><a href="#projects" className="nav__link">Projects</a></li>
              <li><a href="#contact" className="nav__link">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main className="main">
        <div className="cursor"></div>

        {/* HOME */}
        <section className="home section section-top section-two">
          <div className="home__shadow"></div>
          <div className="home__container container grid">
            <div className="home__data">
              <h3 className="home__greeting">Hello, I'm</h3>
              <h1 className="home__name">Yan <br />Youn</h1>
            </div>

            <div className="home__image">
              <div className="blob-animate"></div>
              <img src="/portfolio-yan-youn/assets/img/hero-profile1.png" alt="Profile Picture" className="home__profile" />
            </div>

            <div className="home__info">
              <h3 className="home__split">Benin-Based</h3>
              <h2 className="home__profession-1">Full Stack</h2>
              <h2 className="home__profession-2">Developer</h2>
            </div>

            <div className="home__social">
              <a href="https://www.facebook.com/prospere.azonglahoun" target="_blank" rel="noopener noreferrer" className="home__social-link">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="mailto:prospereazonglahoun@gmail.com" className="home__social-link">
                <i className="ri-mail-line"></i>
              </a>
            </div>

            <a href="/portfolio-yan-youn/assets/pdf/Yan-Ur-Rehman-Resume.pdf" download className="home__cv">
              Resume <i className="ri-file-list-2-line"></i>
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about section" id="about">
          <div className="about__shadow"></div>
          <div className="about__container container grid">
            <div className="about__data">
              <h2 className="section__title"><span>Creativity</span><br />Is My Passion</h2>
              <p className="about__description">
                I'm a <b>Full Stack Developer</b> from Benin passionate about building <b>digital products</b> and <b>web solutions.</b> I work with Next.js, Node.js, React, TypeScript, and Django to create scalable applications for the African market.
              </p>
              <a href="/portfolio-yan-youn/assets/pdf/Yan-Ur-Rehman-Resume.pdf" download className="button">
                Resume <i className="ri-file-list-2-line"></i>
              </a>
            </div>

            <div className="about__image">
              <div className="blob-animate"></div>
              <div className="blob-animate"></div>
              <img src="/portfolio-yan-youn/assets/img/home-perfil1.png" alt="Profile Picture" className="about__profile" />
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="projects section" id="projects">
          <h2 className="section__title">I make Incredible <br /><span>Projects</span></h2>
          <div className="projects__container container grid">
            <div className="projects__swiper swiper">
              <div className="swiper-wrapper">
                <article className="projects__card swiper-slide">
                  <div className="blob"></div>
                  <div className="projects__number"><h1>01</h1><h3>Web</h3></div>
                  <div className="projects__data">
                    <h1 className="projects__title">Prospyto.dev</h1>
                    <p className="projects__subtitle">Techstack used</p>
                    <p className="projects__description">Next.js 15, TypeScript, Tailwind CSS, Node.js, PostgreSQL</p>
                  </div>
                  <div className="projects__image">
                    <img src="/portfolio-yan-youn/assets/img/project-6.png" alt="Project" className="projects__img" />
                    <a href="https://prospyto.dev" target="_blank" rel="noopener noreferrer" className="projects__button">
                      <i className="ri-arrow-right-up-long-line"></i>
                    </a>
                  </div>
                </article>

                <article className="projects__card swiper-slide">
                  <div className="blob"></div>
                  <div className="projects__number"><h1>02</h1><h3>Web</h3></div>
                  <div className="projects__data">
                    <h1 className="projects__title">Swift Africa</h1>
                    <p className="projects__subtitle">Techstack used</p>
                    <p className="projects__description">Next.js, React, Django REST, PostgreSQL, Cloudinary</p>
                  </div>
                  <div className="projects__image">
                    <img src="/portfolio-yan-youn/assets/img/project-1.png" alt="Project" className="projects__img" />
                    <a href="#" target="_blank" className="projects__button">
                      <i className="ri-arrow-right-up-long-line"></i>
                    </a>
                  </div>
                </article>

                <article className="projects__card swiper-slide">
                  <div className="blob"></div>
                  <div className="projects__number"><h1>03</h1><h3>Web</h3></div>
                  <div className="projects__data">
                    <h1 className="projects__title">Prompt.shop</h1>
                    <p className="projects__subtitle">Techstack used</p>
                    <p className="projects__description">Next.js 15, TypeScript, Tailwind CSS v4, Animations</p>
                  </div>
                  <div className="projects__image">
                    <img src="/portfolio-yan-youn/assets/img/project-8.png" alt="Project" className="projects__img" />
                    <a href="#" target="_blank" className="projects__button">
                      <i className="ri-arrow-right-up-long-line"></i>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section" id="contact">
          <div className="contact__container container grid">
            <div className="contact__data">
              <h2 className="section__title">Contact Me</h2>
              <p className="contact__description">Tell me about your next project.</p>
              <button className="contact__button button" id="contact-btn">
                Copy Email <i className="ri-file-copy-line"></i>
                <span className="contact__email" id="contact-email" style={{ display: 'none' }}>
                  prospereazonglahoun@gmail.com
                </span>
              </button>
            </div>

            <div className="contact__content grid">
              <div className="contact__info grid">
                <div>
                  <h3 className="contact__title">Email</h3>
                  <address className="contact__address">prospereazonglahoun@gmail.com</address>
                </div>
                <div>
                  <h3 className="contact__title">Location</h3>
                  <address className="contact__address">Cotonou, Benin</address>
                </div>
              </div>

              <div className="contact__social">
                <h3 className="contact__title">Social Media</h3>
                <div className="contact__links">
                  <a href="https://www.facebook.com/prospere.azonglahoun" target="_blank" rel="noopener noreferrer" className="contact__link">
                    Facebook <i className="ri-arrow-right-up-long-line"></i>
                  </a>
                  <a href="mailto:prospereazonglahoun@gmail.com" className="contact__link">
                    Email <i className="ri-arrow-right-up-long-line"></i>
                  </a>
                </div>
              </div>

              <div className="contact__write">
                <h3 className="contact__title">Write Me & We'll Talk</h3>
                <div className="contact__links">
                  <a href="https://www.facebook.com/prospere.azonglahoun" target="_blank" rel="noopener noreferrer" className="contact__link">
                    Facebook Messenger <i className="ri-arrow-right-up-long-line"></i>
                  </a>
                  <a href="mailto:prospereazonglahoun@gmail.com" className="contact__link">
                    Email <i className="ri-arrow-right-up-long-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer grid">
        <div className="blob-animate"></div>
        <div className="footer__copy">
          All Rights Reserved By <span>Yan Youn</span>
        </div>
        <div className="footer__year">
          &#169; <span id="footer-year">2025</span>
        </div>
      </footer>
    </>
  );
}

