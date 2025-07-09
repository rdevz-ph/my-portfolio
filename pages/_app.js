import "@/styles/globals.css";
import 'aos/dist/aos.css';
import 'lightbox2/dist/css/lightbox.min.css';

import AOS from 'aos';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Dynamically import lightbox2 on the client-side only
    import('jquery').then(() => {
      import('lightbox2');
    });
  }, []);

  return <Component {...pageProps} />;
}
