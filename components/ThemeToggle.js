import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full w-10 h-10 transition-all hover:bg-muted"
        >
            {dark ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500 transition-all scale-100 rotate-0" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-primary transition-all scale-100 rotate-0" />
            )}
        </Button>
    );
}
