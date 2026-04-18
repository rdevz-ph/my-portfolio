import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";

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
    Nginx: 'nginx'
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
        <div className="py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Projects
                </h2>
                <div
                    data-aos="fade-up"
                    className="mt-4 mx-auto w-24 h-1 bg-primary rounded-full"
                />
            </div>

            {years.length > 0 && (
                <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full mb-12">
                    <div className="flex justify-center">
                        <TabsList className="h-auto p-1 bg-muted/50 flex-wrap justify-center">
                            {years.map((y) => {
                                const count = (projects ?? []).filter((p) => Number(p.year) === y).length;
                                return (
                                    <TabsTrigger
                                        key={y}
                                        value={String(y)}
                                        className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        {y} <span className="ml-2 text-xs opacity-70">({count})</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>
                </Tabs>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProjects.map((project, index) => (
                    <Card
                        key={`${project.title}-${project.year}-${index}`}
                        className="group relative overflow-hidden border-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        data-aos="zoom-in-up"
                        data-aos-delay={index * 100}
                    >
                        <div className="relative aspect-video overflow-hidden">
                            {project.isPinned && (
                                <div className="absolute top-3 right-3 z-20">
                                    <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground px-2 py-1 gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        Pinned
                                    </Badge>
                                </div>
                            )}

                            <a href={project.image} data-lightbox="projects" data-title={project.title} className="block cursor-pointer">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">
                                        View Image
                                    </span>
                                </div>
                            </a>
                        </div>

                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-lg md:text-xl font-bold leading-tight break-words">
                                    {project.title}
                                </CardTitle>
                                <Badge variant="outline" className="shrink-0 font-mono text-[10px] h-5 mt-1">
                                    {project.year}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground text-sm leading-relaxed min-h-[4.5rem]">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {(project.technologies ?? []).map((tech, i) => {
                                    const icon = techIcons[tech] ?? null;
                                    return (
                                        <Badge
                                            key={i}
                                            variant="secondary"
                                            className="px-2 py-0.5 text-[10px] sm:text-xs font-medium flex items-center gap-1.5"
                                        >
                                            {icon && (
                                                <Image
                                                    src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`}
                                                    alt={tech}
                                                    width={12}
                                                    height={12}
                                                    className="w-3 h-3 dark:invert"
                                                    unoptimized
                                                />
                                            )}
                                            {tech}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </CardContent>

                        <CardFooter className="pt-0 border-none bg-transparent">
                            {project.url && (
                                <a
                                    href={project.url}
                                    className="inline-flex items-center text-sm font-bold text-primary hover:underline gap-1 transition-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Live Preview
                                    <ExternalLink className="size-4" />
                                </a>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {sortedProjects.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-muted rounded-3xl mt-10">
                    <p className="text-muted-foreground">No projects found for {activeYear}.</p>
                </div>
            )}
        </div>
    );
}
