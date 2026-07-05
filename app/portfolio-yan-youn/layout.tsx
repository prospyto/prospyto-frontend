export const metadata = {
  title: 'Portfolio - Yan Youn | Full Stack Developer',
  description: 'Yan Youn - Full Stack Developer from Benin. Full stack development with Next.js, Node.js, React, TypeScript, Django, and PostgreSQL.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/portfolio-yan-youn/assets/img/Icon.png" type="icon" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
        <link rel="stylesheet" href="/portfolio-yan-youn/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/portfolio-yan-youn/assets/css/styles.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
        
        {/* Scripts du portfolio */}
        <script src="/portfolio-yan-youn/assets/js/scrollreveal.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/animejs/lib/anime.iife.min.js"></script>
        <script src="/portfolio-yan-youn/assets/js/swiper-bundle.min.js"></script>
        <script src="/portfolio-yan-youn/assets/js/main.js"></script>
      </body>
    </html>
  );
}
