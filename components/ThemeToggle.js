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
            className="rounded-md w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-muted"
        >
            {dark ? (
                <Sun className="h-4 w-4 transition-all text-foreground" />
            ) : (
                <Moon className="h-4 w-4 transition-all text-foreground" />
            )}
        </Button>
    );
}
