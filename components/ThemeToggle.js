import { useEffect, useState } from 'react';

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
        <button onClick={toggleTheme} className="text-purple-600 dark:text-yellow-300">
            {dark ? '☀️' : '🌙'}
        </button>
    );
}
