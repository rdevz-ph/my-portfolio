import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pin, FolderGit2, Eye } from "lucide-react";

const techIcons = {
    HTML: 'html5',
    CSS: 'css3',
    JavaScript: 'javascript',
    TypeScript: 'typescript',
    PHP: 'php',
    Laravel: 'laravel',
    'Vue.js': 'vuedotjs',
    'Node.js': 'nodedotjs',
    MySQL: 'mysql',
    Git: 'git',
    TailwindCSS: 'tailwindcss',
    'Tailwind CSS': 'tailwindcss',
    Bootstrap: 'bootstrap',
    React: 'react',
    'Next.js': 'nextdotjs',
    Supabase: 'supabase',
    Python: 'python',
    Tkinter: 'python',
    SSH: 'gnubash',
    Linux: 'linux',
    Ubuntu: 'ubuntu',
    Nginx: 'nginx',
    CustomTkinter: 'python',
    PowerShell: 'powershell',
    Apache: 'apache',
    'Tesseract OCR': 'googlelens',
    Kotlin: 'kotlin',
    Android: 'android'
};

export default function ProjectsGrid({ projects }) {
    const years = useMemo(() => {
        const set = new Set(
            (projects ?? [])
                .map((p) => Number(p.year))
                .filter((y) => Number.isFinite(y))
        );
        return Array.from(set).sort((a, b) => b - a);
    }, [projects]);

    const [activeYear, setActiveYear] = useState(null);

    useEffect(() => {
        if (!activeYear && years.length) setActiveYear(String(years[0]));
        if (activeYear && years.length && !years.map(String).includes(activeYear)) setActiveYear(String(years[0]));
    }, [years, activeYear]);

    const filteredProjects = useMemo(() => {
        if (!activeYear) return projects ?? [];
        return (projects ?? []).filter((p) => String(p.year) === activeYear);
    }, [projects, activeYear]);

    const sortedProjects = useMemo(() => {
        return [...filteredProjects].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
        });
    }, [filteredProjects]);

    return (
        <div className="py-6 sm:py-10 max-w-6xl mx-auto w-full px-2 sm:px-4">
            <div className="text-center mb-10" data-aos="fade-up">
                <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-secondary text-foreground">
                        <FolderGit2 className="w-5 h-5" />
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Featured Work
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
                    A curated archive of client solutions, web applications, and production systems.
                </p>
            </div>

            {years.length > 0 && (
                <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full mb-8">
                    <div className="flex justify-center">
                        <TabsList className="bg-muted/40 border border-border p-1 h-auto rounded-lg flex-wrap justify-center">
                            {years.map((y) => {
                                const count = (projects ?? []).filter((p) => Number(p.year) === y).length;
                                return (
                                    <TabsTrigger
                                        key={y}
                                        value={String(y)}
                                        className="rounded-md px-3.5 py-1.5 text-xs font-mono data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-colors"
                                    >
                                        <span>{y}</span>
                                        <span className="ml-1.5 text-[10px] text-muted-foreground">({count})</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>
                </Tabs>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProjects.map((project, index) => (
                    <Card
                        key={`${project.title}-${project.year}-${index}`}
                        className="group relative overflow-hidden border border-border bg-card/60 transition-all duration-200 hover:border-foreground/20 hover:bg-card shadow-xs flex flex-col justify-between"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                    >
                        <div>
                            {/* Card Image */}
                            <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
                                {project.isPinned && (
                                    <div className="absolute top-2.5 right-2.5 z-20">
                                        <Badge variant="outline" className="bg-background/90 backdrop-blur-xs border-border text-foreground px-2 py-0.5 text-[10px] font-mono gap-1 shadow-xs">
                                            <Pin className="w-3 h-3 text-muted-foreground" />
                                            Featured
                                        </Badge>
                                    </div>
                                )}

                                <a href={project.image} data-lightbox="projects" data-title={project.title} className="block w-full h-full cursor-pointer relative group/img">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={600}
                                        height={340}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <span className="text-xs font-mono font-medium border border-border bg-background px-3 py-1.5 rounded-md text-foreground flex items-center gap-1.5 shadow-xs">
                                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                                            Preview Image
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {/* Header */}
                            <CardHeader className="p-4 pb-2">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-base font-bold leading-snug tracking-tight text-foreground">
                                        {project.title}
                                    </CardTitle>
                                    <Badge variant="outline" className="shrink-0 font-mono text-[10px] border-border text-muted-foreground">
                                        {project.year}
                                    </Badge>
                                </div>
                            </CardHeader>

                            {/* Description & Tech */}
                            <CardContent className="p-4 pt-1 space-y-3">
                                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {(project.technologies ?? []).map((tech, i) => {
                                        const icon = techIcons[tech] ?? null;
                                        return (
                                            <Badge
                                                key={i}
                                                variant="outline"
                                                className="px-2 py-0.5 text-[10px] font-mono border-border/70 bg-secondary/40 text-muted-foreground hover:text-foreground flex items-center gap-1"
                                            >
                                                {icon && (
                                                    <Image
                                                        src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`}
                                                        alt={tech}
                                                        width={10}
                                                        height={10}
                                                        className="w-2.5 h-2.5 dark:invert opacity-70"
                                                        unoptimized
                                                    />
                                                )}
                                                <span>{tech}</span>
                                            </Badge>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </div>

                        {/* Footer Link */}
                        <CardFooter className="p-4 pt-0 border-none bg-transparent">
                            {project.url ? (
                                <Button 
                                    render={
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    }
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full text-xs font-mono gap-1.5 border-border hover:border-foreground/30 hover:bg-secondary"
                                >
                                    <span>Live Preview</span>
                                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                                </Button>
                            ) : (
                                <div className="h-8" />
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {sortedProjects.length === 0 && (
                <div className="text-center py-16 border border-dashed border-border rounded-xl mt-6">
                    <p className="text-muted-foreground text-sm font-mono">No projects found for {activeYear}.</p>
                </div>
            )}
        </div>
    );
}
