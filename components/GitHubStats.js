import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Github, BarChart3, Code2, Flame, Info, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function GitHubStats() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState({
        stats: true,
        languages: true,
        streak: true
    });

    const handleImageLoad = (tab) => {
        setLoading(prev => ({ ...prev, [tab]: false }));
    };

    useEffect(() => {
        setLoading({
            stats: true,
            languages: true,
            streak: true
        });
    }, [isDarkMode]);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));

        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const username = "rdevz-ph";

    // Strictly Monochrome neutral palette (Zero RGB)
    const titleColor = isDarkMode ? "fafafa" : "18181b";
    const primaryColor = isDarkMode ? "e4e4e7" : "27272a";
    const textColor = isDarkMode ? "a1a1aa" : "71717a";
    const strokeColor = isDarkMode ? "27272a" : "e4e4e7";
    const ringColor = isDarkMode ? "52525b" : "a1a1aa";
    const streakLabel = isDarkMode ? "fafafa" : "18181b";

    const githubTheme = isDarkMode ? 'dark' : 'default';
    const streakTheme = isDarkMode ? 'dark' : 'default';

    const statsUrl = `https://rdevzph-github-stats.vercel.app/api?username=${username}&show_icons=true&theme=${githubTheme}&hide_border=true&title_color=${titleColor}&icon_color=${primaryColor}&text_color=${textColor}&rank_icon=github&count_private=true`;
    const langsUrl = `https://github-top-langs-api.vercel.app/api?username=${username}&theme=${githubTheme}&hide_border=true`;
    const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${streakTheme}&hide_border=true&stroke=${strokeColor}&ring=${ringColor}&fire=${primaryColor}&currStreakLabel=${streakLabel}&currStreakNum=${titleColor}&sideLabels=${textColor}&sideNums=${textColor}&dates=${textColor}`;

    return (
        <section id="github" className="py-6 sm:py-10 max-w-4xl mx-auto w-full">
            <div className="space-y-8" data-aos="fade-up">
                <div className="text-center space-y-3">
                    <div className="flex justify-center mb-1">
                        <div className="p-2 rounded-lg bg-secondary text-foreground">
                            <Github className="w-5 h-5" />
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        GitHub Contributions
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                        Activity, repositories, and development metrics tracked directly from GitHub.
                    </p>
                </div>

                <Tabs defaultValue="stats" className="w-full">
                    <div className="flex justify-center mb-6">
                        <TabsList className="bg-muted/40 border border-border p-1 h-auto rounded-lg">
                            <TabsTrigger 
                                value="stats" 
                                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
                            >
                                <BarChart3 className="w-3.5 h-3.5" />
                                <span>Activity</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="languages" 
                                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
                            >
                                <Code2 className="w-3.5 h-3.5" />
                                <span>Languages</span>
                            </TabsTrigger>
                            <TabsTrigger 
                                value="streak" 
                                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
                            >
                                <Flame className="w-3.5 h-3.5" />
                                <span>Streak</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex justify-center items-center min-h-[220px] relative">
                        <TabsContent value="stats" className="w-full mt-0 focus-visible:outline-none">
                            <Card className="border border-border bg-card/60 overflow-hidden relative min-h-[195px] shadow-xs">
                                <CardContent className="p-4 sm:p-6 flex justify-center items-center min-h-[inherit]">
                                    {loading.stats && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-background/50">
                                            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                                            <Loader2 className="w-6 h-6 text-foreground animate-spin relative z-10" />
                                            <p className="text-xs font-mono text-muted-foreground relative z-10">Fetching activity data...</p>
                                        </div>
                                    )}
                                    <Image
                                        key={`stats-${isDarkMode}`}
                                        src={statsUrl}
                                        alt="GitHub Stats"
                                        width={600}
                                        height={195}
                                        unoptimized={true}
                                        className={cn(
                                            "w-full max-w-2xl h-auto transition-opacity duration-300",
                                            loading.stats ? "opacity-0" : "opacity-100"
                                        )}
                                        onLoadingComplete={() => handleImageLoad('stats')}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="languages" className="w-full mt-0 focus-visible:outline-none">
                            <Card className="border border-border bg-card/60 overflow-hidden relative min-h-[260px] shadow-xs">
                                <CardContent className="p-4 sm:p-6 flex flex-col items-center min-h-[inherit] justify-center">
                                    {loading.languages && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-background/50">
                                            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                                            <Loader2 className="w-6 h-6 text-foreground animate-spin relative z-10" />
                                            <p className="text-xs font-mono text-muted-foreground relative z-10">Analyzing languages...</p>
                                        </div>
                                    )}
                                    <Image
                                        key={`langs-${isDarkMode}`}
                                        src={langsUrl}
                                        alt="Top Languages"
                                        width={600}
                                        height={300}
                                        unoptimized={true}
                                        className={cn(
                                            "w-full max-w-2xl h-auto transition-opacity duration-300",
                                            loading.languages ? "opacity-0" : "opacity-100"
                                        )}
                                        onLoadingComplete={() => handleImageLoad('languages')}
                                    />
                                    {!loading.languages && (
                                        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground transition-opacity duration-300">
                                            <Info className="w-3.5 h-3.5" />
                                            <span>Includes private repos and client applications.</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="streak" className="w-full mt-0 focus-visible:outline-none">
                            <Card className="border border-border bg-card/60 overflow-hidden relative min-h-[195px] shadow-xs">
                                <CardContent className="p-4 sm:p-6 flex justify-center items-center min-h-[inherit]">
                                    {loading.streak && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-background/50">
                                            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                                            <Loader2 className="w-6 h-6 text-foreground animate-spin relative z-10" />
                                            <p className="text-xs font-mono text-muted-foreground relative z-10">Calculating streak...</p>
                                        </div>
                                    )}
                                    <Image
                                        key={`streak-${isDarkMode}`}
                                        src={streakUrl}
                                        alt="GitHub Streak"
                                        width={600}
                                        height={195}
                                        unoptimized={true}
                                        className={cn(
                                            "w-full max-w-2xl h-auto transition-opacity duration-300",
                                            loading.streak ? "opacity-0" : "opacity-100"
                                        )}
                                        onLoadingComplete={() => handleImageLoad('streak')}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
