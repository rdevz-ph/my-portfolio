import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="mt-16 pb-12">
            <Separator className="mb-8" />
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-muted-foreground text-sm font-medium">
                    &copy; {new Date().getFullYear()} Romel Brosas. All rights reserved.
                </p>
                <p className="mt-2 text-xs text-muted-foreground/60 italic">
                    Built with Next.js, Tailwind CSS and shadcn/ui
                </p>
            </div>
        </footer>
    );
}