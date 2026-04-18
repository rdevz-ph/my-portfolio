import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <Button
            size="icon"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 z-50 rounded-full shadow-2xl transition-all duration-300 h-12 w-12 hover:scale-110 active:scale-95",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}
            aria-label="Scroll to top"
        >
            <ChevronUp className="w-6 h-6" />
        </Button>
    );
}