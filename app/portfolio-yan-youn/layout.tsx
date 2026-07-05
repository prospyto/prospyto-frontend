import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Yan Youn | Full Stack Developer',
  description:
    'Yan Youn - Full Stack Developer from Benin. Specializing in Next.js, Node.js, React, TypeScript, Django, and PostgreSQL.',
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/portfolio-yan-youn/assets/img/Icon.png" type="icon" />
        {/* REMIXICONS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
        {/* SWIPER CSS */}
        <link rel="stylesheet" href="/portfolio-yan-youn/assets/css/swiper-bundle.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
