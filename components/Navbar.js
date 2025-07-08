import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const updateHash = () => {
            setActiveSection(window.location.hash.replace('#', ''));
        };

        updateHash(); // run on load
        window.addEventListener('hashchange', updateHash);
        return () => window.removeEventListener('hashchange', updateHash);
    }, []);

    const linkClasses = (id) =>
        `relative px-2 py-1 transition duration-200 ${activeSection === id
            ? 'text-purple-600 dark:text-purple-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600 dark:after:bg-purple-400'
            : 'text-gray-700 dark:text-white hover:text-purple-500 dark:hover:text-purple-400'
        }`;

    return (
        <nav className="bg-white dark:bg-gray-900 shadow fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    Romel&apos;s Portfolio
                </h1>
                <div className="space-x-4 flex items-center">
                    <a href="#about" className={linkClasses('about')}>About</a>
                    <a href="#projects" className={linkClasses('projects')}>Projects</a>
                    <a href="#contact" className={linkClasses('contact')}>Contact</a>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
