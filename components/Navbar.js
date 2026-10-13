import { useEffect, useState, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, User, FolderHeart, MessageSquare, ChevronRight, Github } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('about');
    const isManualScroll = useRef(false);
    const scrollTimeout = useRef(null);

    const navLinks = [
        { to: 'about', label: 'About', icon: User },
        { to: 'github', label: 'GitHub', icon: Github },
        { to: 'projects', label: 'Projects', icon: FolderHeart },
        { to: 'contact', label: 'Contact', icon: MessageSquare },
    ];

    const handleLinkClick = (id) => {
        setActiveSection(id);
        isManualScroll.current = true;
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            isManualScroll.current = false;
        }, 650);
    };

    useEffect(() => {
        const sectionIds = ['contact', 'projects', 'github', 'about'];

        const handleScroll = () => {
            if (isManualScroll.current) return;

            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // When scrolled near or to the bottom of the page, activate 'contact'
            if (windowHeight + scrollPosition >= documentHeight - 120) {
                setActiveSection('contact');
                return;
            }

            const navOffset = 140;
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.getBoundingClientRect().top;
                    if (top <= navOffset) {
                        setActiveSection(id);
                        return;
                    }
                }
            }

            setActiveSection('about');
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    const linkClasses = (id) =>
        cn(
            "relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer select-none",
            activeSection === id
                ? "bg-secondary text-secondary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        );

    const commonProps = {
        smooth: true,
        duration: 500,
        offset: -80,
    };

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex justify-between items-center">
                {/* Brand / Logo */}
                <div 
                    className="flex items-center gap-2.5 cursor-pointer group select-none"
                    onClick={() => {
                        handleLinkClick('about');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-xs font-bold tracking-tighter shadow-xs">
                        RB
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
                            Romel Brosas
                        </span>
                        <Badge variant="outline" className="inline-flex text-[10px] font-mono py-0 px-1.5 border-border text-muted-foreground">
                            dev
                        </Badge>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    <div className="flex items-center gap-1 p-1 bg-muted/30 border border-border/50 rounded-lg">
                        {navLinks.map((link) => (
                            <ScrollLink
                                key={link.to}
                                to={link.to}
                                className={linkClasses(link.to)}
                                onClick={() => handleLinkClick(link.to)}
                                {...commonProps}
                            >
                                {link.label}
                            </ScrollLink>
                        ))}
                    </div>
                    <div className="ml-3 pl-3 border-l border-border">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile nav */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger 
                            render={<Button variant="ghost" size="icon" className="text-foreground hover:bg-muted" />}
                        >
                            <Menu className="w-5 h-5" />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l border-border bg-background">
                            <SheetHeader className="text-left pb-4 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-mono text-xs font-bold">
                                        RB
                                    </div>
                                    <SheetTitle className="text-base font-semibold text-foreground">Navigation</SheetTitle>
                                </div>
                                <SheetDescription className="text-xs text-muted-foreground">Quick access to portfolio sections</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 flex flex-col gap-1.5">
                                {navLinks.map((link) => (
                                    <ScrollLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => {
                                            handleLinkClick(link.to);
                                            setIsOpen(false);
                                        }}
                                        {...commonProps}
                                    >
                                        <div className={cn(
                                            "flex items-center justify-between w-full p-3 rounded-lg text-sm transition-colors cursor-pointer",
                                            activeSection === link.to 
                                                ? "bg-primary text-primary-foreground font-medium shadow-xs" 
                                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        )}>
                                            <div className="flex items-center gap-3">
                                                <link.icon className={cn(
                                                    "w-4 h-4",
                                                    activeSection === link.to ? "text-primary-foreground" : "text-muted-foreground"
                                                )} />
                                                <span>{link.label}</span>
                                            </div>
                                            <ChevronRight className={cn(
                                                "w-4 h-4 transition-transform",
                                                activeSection === link.to ? "text-primary-foreground/70" : "text-muted-foreground/40"
                                            )} />
                                        </div>
                                    </ScrollLink>
                                ))}
                            </div>
                            
                            <div className="absolute bottom-6 left-0 right-0 px-6">
                                <div className="p-4 rounded-lg bg-muted/40 border border-border flex flex-col items-center text-center space-y-1">
                                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">v2.0 • shadcn/ui</p>
                                    <p className="text-[10px] text-muted-foreground/70">Clean & Modern Portfolio</p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
