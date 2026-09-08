import FolderTreeView from "@/components/FolderTreeView";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FolderTree, ExternalLink } from "lucide-react";

export default function CodeShowcase() {
    return (
        <div className="max-w-4xl mx-auto w-full px-2 sm:px-4">
            <div className="text-center mb-8" data-aos="fade-up">
                <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-secondary text-foreground">
                        <FolderTree className="w-5 h-5" />
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Project Architecture
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
                    This portfolio is open-source, built using Next.js, Tailwind CSS, and shadcn/ui.
                </p>
                <div className="flex justify-center mt-4">
                    <Button
                        render={
                            <a
                                href="https://github.com/rdevz-ph/my-portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        }
                        variant="outline"
                        size="sm"
                        className="gap-2 font-mono text-xs"
                    >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Repository</span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            <Card className="border border-border bg-card/60 shadow-xs overflow-hidden" data-aos="fade-up">
                <CardHeader className="bg-muted/20 border-b border-border py-3 px-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-sm font-mono text-foreground">
                            <FolderTree className="w-4 h-4 text-muted-foreground" />
                            <span>Workspace Explorer</span>
                        </CardTitle>
                        <span className="text-[11px] font-mono text-muted-foreground">Next.js Page Router</span>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <FolderTreeView />
                </CardContent>
            </Card>
        </div>
    );
}
