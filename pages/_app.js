import "@/styles/globals.css";
import 'aos/dist/aos.css';
import 'lightbox2/dist/css/lightbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
      {showLoader ? <Loader /> : <Component {...pageProps} />}
      <Analytics />
    </>
  );
}
