import FolderTreeView from "@/components/FolderTreeView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FolderTree } from "lucide-react";

export default function CodeShowcase() {
    return (
        <div className="max-w-5xl mx-auto px-4 mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    About This Portfolio
                </h2>
                <div data-aos="fade-up" className="mt-4 mx-auto w-24 h-1 bg-primary rounded-full" />
            </div>

            <p
                className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
                data-aos="fade-up"
            >
                This portfolio is open source and built using <b className="text-foreground">Next.js</b>, <b className="text-foreground">Tailwind CSS</b>, and <b className="text-foreground">shadcn/ui</b>.
                Here&apos;s a look into the setup:
            </p>

            <div className="flex justify-center mb-12" data-aos="zoom-in">
                <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="h-12 px-10 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm hover:shadow-md group text-sm md:text-base font-bold text-foreground"
                >
                    <a
                        href="https://github.com/rdevz-ph/my-portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Source on GitHub
                    </a>
                </Button>
            </div>

            <Card
                className="border-muted shadow-lg overflow-hidden"
                data-aos="fade-up"
            >
                <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="flex items-center gap-3 text-primary">
                        <FolderTree className="w-6 h-6" />
                        Project Structure
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                    <FolderTreeView />
                </CardContent>
            </Card>
        </div>
    );
}
