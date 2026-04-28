import { useEffect, useState } from 'react';
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

    // Reset loading on theme change to show animation during refresh
    useEffect(() => {
        setLoading({
            stats: true,
            languages: true,
            streak: true
        });
    }, [isDarkMode]);

    useEffect(() => {
        // Initial check
        setIsDarkMode(document.documentElement.classList.contains('dark'));

        // Watch for theme changes
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
    
    // Dynamic colors based on theme
    const primaryColor = isDarkMode ? "7c3aed" : "6d28d9"; // Violet-600 in light, Violet-500 in dark
    const textColor = isDarkMode ? "94a3b8" : "475569";    // Slate-400 in dark, Slate-600 in light
    const titleColor = isDarkMode ? "7c3aed" : "6d28d9";

    const currentTheme = isDarkMode ? 'dark' : 'default';
    const githubTheme = isDarkMode ? 'dark' : 'default'; 
    const streakTheme = isDarkMode ? 'dark' : 'default'; 

    const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${githubTheme}&hide_border=true&title_color=${titleColor}&icon_color=${primaryColor}&text_color=${textColor}&rank_icon=github&count_private=true`;
    const langsUrl = `https://github-top-langs-api.vercel.app/api?username=${username}&theme=${currentTheme}&hide_border=true`;
    const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${streakTheme}&hide_border=true&stroke=${primaryColor}&ring=${primaryColor}&fire=${primaryColor}&currStreakLabel=${primaryColor}&currStreakNum=${textColor}&sideLabels=${textColor}&sideNums=${textColor}&dates=${textColor}`;

    return (
        <section id="github" className="py-12">
            <div className="space-y-10" data-aos="fade-up">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
                        <Github className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        GitHub Contributions
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A real-time snapshot of my open source activity and coding habits.
                    </p>
                </div>

                <Tabs defaultValue="stats" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-muted/50 p-1">
                            <TabsTrigger value="stats" className="flex items-center gap-2 px-4 py-2">
                                <BarChart3 className="w-4 h-4" />
                                <span className="hidden sm:inline">Activity</span>
                            </TabsTrigger>
                            <TabsTrigger value="languages" className="flex items-center gap-2 px-4 py-2">
                                <Code2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Languages</span>
                            </TabsTrigger>
                            <TabsTrigger value="streak" className="flex items-center gap-2 px-4 py-2">
                                <Flame className="w-4 h-4" />
                                <span className="hidden sm:inline">Streak</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex justify-center items-center min-h-[300px] relative">
                        <TabsContent value="stats" className="w-full mt-0 focus-visible:outline-none">
                            <Card className="border-muted bg-card/30 backdrop-blur-xs overflow-hidden relative min-h-[195px]">
                                <CardContent className="p-4 sm:p-8 flex justify-center items-center min-h-[inherit]">
                                    {loading.stats && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                                            <Loader2 className="w-8 h-8 text-primary animate-spin relative z-10" />
                                            <p className="text-sm text-muted-foreground animate-pulse relative z-10">Fetching activity data...</p>
                                        </div>
                                    )}
                                    <img
                                        key={`stats-${isDarkMode}`}
                                        src={statsUrl}
                                        alt="GitHub Stats"
                                        className={cn(
                                            "w-full max-w-2xl h-auto transition-opacity duration-500",
                                            loading.stats ? "opacity-0" : "opacity-100"
                                        )}
                                        loading="lazy"
                                        onLoad={() => handleImageLoad('stats')}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="languages" className="w-full mt-0 focus-visible:outline-none">
                            <Card className="border-muted bg-card/30 backdrop-blur-xs overflow-hidden relative min-h-[300px]">
                                <CardContent className="p-4 sm:p-8 flex flex-col items-center min-h-[inherit] justify-center">
                                    {loading.languages && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                                            <Loader2 className="w-8 h-8 text-primary animate-spin relative z-10" />
                                            <p className="text-sm text-muted-foreground animate-pulse relative z-10">Analyzing top languages...</p>
                                        </div>
                                    )}
                                    <img
                                        key={`langs-${isDarkMode}`}
                                        src={langsUrl}
                                        alt="Top Languages"
                                        className={cn(
                                            "w-full max-w-2xl h-auto transition-opacity duration-500",
                                            loading.languages ? "opacity-0" : "opacity-100"
                                        )}
                                        loading="lazy"
                                        onLoad={() => handleImageLoad('languages')}
                                    />
                                    {!loading.languages && (
                                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground italic transition-opacity duration-500">
                                            <Info className="w-4 h-4 text-primary/60" />
                                            <span>Includes private repositories, internal tools, and client-side codebase.</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="streak" className="w-full mt-0 focus-visible:outline-none">
                            <Card className="border-muted bg-card/30 backdrop-blur-xs overflow-hidden relative min-h-[195px]">
                                <CardContent className="p-4 sm:p-8 flex justify-center items-center min-h-[inherit]">
                                    {loading.streak && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                                            <Loader2 className="w-8 h-8 text-primary animate-spin relative z-10" />
                                            <p className="text-sm text-muted-foreground animate-pulse relative z-10">Calculating streak...</p>
                                        </div>
                                    )}
                                    <img
                                        key={`streak-${isDarkMode}`}
                                        src={streakUrl}
                                        alt="GitHub Streak"
                                        className={cn(
                                            "w-full max-w-2xl h-auto transition-opacity duration-500",
                                            loading.streak ? "opacity-0" : "opacity-100"
                                        )}
                                        loading="lazy"
                                        onLoad={() => handleImageLoad('streak')}
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
