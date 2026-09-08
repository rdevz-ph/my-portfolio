import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="py-8 border-t border-border bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-primary-foreground font-mono text-[10px] font-bold">
                        RB
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                        Romel Brosas &copy; {new Date().getFullYear()}
                    </span>
                </div>
                <p className="text-xs font-mono text-muted-foreground/70">
                    Built with Next.js, Tailwind CSS &amp; shadcn/ui
                </p>
            </div>
        </footer>
    );
}