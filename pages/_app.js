import "@/styles/globals.css";
import 'aos/dist/aos.css';
import 'lightbox2/dist/css/lightbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from 'next/head';

import AOS from 'aos';
import { useEffect, useState } from 'react';
import Loader from "@/components/Loader";
import { Analytics } from "@vercel/analytics/next"
import 'react-treeview/react-treeview.css';

export default function App({ Component, pageProps }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    import('jquery').then(() => {
      import('lightbox2');
    });

    // Prevent scrolling while loader is showing
    if (showLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, [showLoader]);

  return (
    <>
      <Head>
        {/* Essential Meta Tags - These should be in _app.js */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      {showLoader ? <Loader /> : <Component {...pageProps} />}
      <Analytics />
    </>
  );
}
