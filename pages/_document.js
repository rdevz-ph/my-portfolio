import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://gc.zgo.at" />
        <link rel="preconnect" href="https://formspree.io" />

        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//gc.zgo.at" />
        <link rel="dns-prefetch" href="//formspree.io" />

        {/* Security Headers */}
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* GoatCounter Analytics */}
        <script
          data-goatcounter="https://rdevz-ph.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>

        {/* Structured Data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Romel Brosas",
              "jobTitle": "Full Stack Developer",
              "url": "https://romel-portfolio.vercel.app",
              "sameAs": [
                "https://github.com/rdevz-ph",
                "https://ko-fi.com/romelbrosas"
              ],
              "knowsAbout": [
                "JavaScript",
                "React",
                "Next.js",
                "Laravel",
                "PHP",
                "MySQL",
                "Tailwind CSS",
                "Full Stack Development"
              ],
              "description": "Passionate full-stack developer with expertise in modern web technologies and clean UI design."
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
