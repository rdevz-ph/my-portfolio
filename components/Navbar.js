import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, X, User, FolderHeart, MessageSquare, ChevronRight } from 'lucide-react';
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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
        cn(
            "relative px-4 py-2 block transition-all duration-200 text-sm font-medium hover:text-primary cursor-pointer",
            activeSection === id
                ? "text-primary font-bold after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary"
                : "text-muted-foreground"
        );

    const commonProps = {
        smooth: true,
        duration: 500,
        offset: -80,
        spy: true,
        activeClass: 'active',
        onSetActive: setActiveSection,
    };

    const navLinks = [
        { to: 'about', label: 'About', icon: User },
        { to: 'projects', label: 'Projects', icon: FolderHeart },
        { to: 'contact', label: 'Contact', icon: MessageSquare },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                <h1 
                    className="text-xl font-bold bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Romel&apos;s Portfolio
                </h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-1 items-center">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.to}
                            to={link.to}
                            className={linkClasses(link.to)}
                            {...commonProps}
                        >
                            {link.label}
                        </ScrollLink>
                    ))}
                    <div className="ml-4 pl-4 border-l">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile nav */}
                <div className="flex items-center space-x-2 md:hidden">
                    <ThemeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l border-muted">
                            <SheetHeader className="text-left pb-6 border-b">
                                <SheetTitle className="text-primary font-bold text-2xl">Navigation</SheetTitle>
                                <SheetDescription className="text-muted-foreground">Quick access to sections</SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <ScrollLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                        {...commonProps}
                                    >
                                        <div className={cn(
                                            "flex items-center justify-between w-full p-4 rounded-xl transition-all duration-200 group cursor-pointer",
                                            activeSection === link.to 
                                                ? "bg-primary text-primary-foreground shadow-md" 
                                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        )}>
                                            <div className="flex items-center gap-4">
                                                <link.icon className={cn(
                                                    "w-5 h-5",
                                                    activeSection === link.to ? "text-primary-foreground" : "text-primary"
                                                )} />
                                                <span className="text-lg font-bold tracking-tight">{link.label}</span>
                                            </div>
                                            <ChevronRight className={cn(
                                                "w-5 h-5 transition-transform group-hover:translate-x-1",
                                                activeSection === link.to ? "text-primary-foreground/50" : "text-muted-foreground/30"
                                            )} />
                                        </div>
                                    </ScrollLink>
                                ))}
                            </div>
                            
                            <div className="absolute bottom-8 left-0 right-0 px-6">
                                <div className="p-6 rounded-2xl bg-muted/50 border border-muted flex flex-col items-center text-center space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Version 2.0</p>
                                    <p className="text-[10px] text-muted-foreground/60 italic">Built with Next.js & shadcn/ui</p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
