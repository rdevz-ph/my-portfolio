import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react'; // optional: `lucide-react` icons

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const isDark = localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = dark ? 'light' : 'dark';
        setDark(!dark);
        localStorage.theme = newTheme;
        document.documentElement.classList.toggle('dark', !dark);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="relative w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
        >
            <div
                className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 transform ${dark ? 'translate-x-6 bg-yellow-400' : 'translate-x-0 bg-purple-600'
                    }`}
            ></div>
            <Sun className="w-3 h-3 absolute left-1 text-white" />
            <Moon className="w-3 h-3 absolute right-1 text-white" />
        </button>
    );
}
