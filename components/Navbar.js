import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        Events.scrollEvent.register('begin', () => { });
        Events.scrollEvent.register('end', () => { });
        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    const linkClasses = (id) =>
        `relative px-4 py-2 block transition duration-200 ${activeSection === id
            ? 'text-purple-600 dark:text-purple-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600 dark:after:bg-purple-400'
            : 'text-gray-700 dark:text-white hover:text-purple-500 dark:hover:text-purple-400'
        }`;

    const commonProps = {
        smooth: true,
        duration: 500,
        offset: -80,
        spy: true,
        activeClass: 'active',
        onSetActive: setActiveSection,
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    Romel&apos;s Portfolio
                </h1>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-purple-600 dark:text-purple-400"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-4 items-center">
                    <ScrollLink to="about" className={linkClasses('about')} {...commonProps}>About</ScrollLink>
                    <ScrollLink to="projects" className={linkClasses('projects')} {...commonProps}>Projects</ScrollLink>
                    <ScrollLink to="contact" className={linkClasses('contact')} {...commonProps}>Contact</ScrollLink>
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
                    <ScrollLink to="about" className={linkClasses('about')} onClick={() => setIsOpen(false)} {...commonProps}>About</ScrollLink>
                    <ScrollLink to="projects" className={linkClasses('projects')} onClick={() => setIsOpen(false)} {...commonProps}>Projects</ScrollLink>
                    <ScrollLink to="contact" className={linkClasses('contact')} onClick={() => setIsOpen(false)} {...commonProps}>Contact</ScrollLink>
                    <ThemeToggle />
                </div>
            )}
        </nav>
    );
}
