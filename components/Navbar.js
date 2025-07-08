import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react'; // You can install lucide-react or use any icons

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateHash = () => {
            setActiveSection(window.location.hash.replace('#', ''));
        };

        updateHash();
        window.addEventListener('hashchange', updateHash);
        return () => window.removeEventListener('hashchange', updateHash);
    }, []);

    const linkClasses = (id) =>
        `relative px-4 py-2 block transition duration-200 ${activeSection === id
            ? 'text-purple-600 dark:text-purple-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600 dark:after:bg-purple-400'
            : 'text-gray-700 dark:text-white hover:text-purple-500 dark:hover:text-purple-400'
        }`;

    return (
        <nav className="bg-white dark:bg-gray-900 shadow fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    Romel&apos;s Portfolio
                </h1>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="md:hidden text-purple-600 dark:text-purple-400"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-4 items-center">
                    <a href="#about" className={linkClasses('about')}>About</a>
                    <a href="#projects" className={linkClasses('projects')}>Projects</a>
                    <a href="#contact" className={linkClasses('contact')}>Contact</a>
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
                    <a href="#about" className={linkClasses('about')} onClick={() => setIsOpen(false)}>About</a>
                    <a href="#projects" className={linkClasses('projects')} onClick={() => setIsOpen(false)}>Projects</a>
                    <a href="#contact" className={linkClasses('contact')} onClick={() => setIsOpen(false)}>Contact</a>
                    <ThemeToggle />
                </div>
            )}
        </nav>
    );
}
