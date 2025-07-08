import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg flex items-center justify-center transition-opacity duration-300 hover:bg-purple-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
}