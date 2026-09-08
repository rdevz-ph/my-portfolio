import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu } from "lucide-react";

export default function TechStack({ skills }) {
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

    return (
        <div className="max-w-4xl mx-auto w-full" data-aos="fade-up" data-aos-delay="100">
            <Card className="border border-border bg-card/60 shadow-xs">
                <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-2">
                        <div className="p-2 rounded-lg bg-secondary text-foreground">
                            <Cpu className="w-5 h-5" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                        Technologies & Tools
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground max-w-md mx-auto">
                        Languages, frameworks, databases, and DevOps tools powering my production applications.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 pb-6 px-4 sm:px-8">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                        {skills.map((skill, index) => {
                            const iconName = techIcons[skill] || null;
                            return (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-normal border border-border/70 bg-secondary/60 hover:bg-secondary hover:border-foreground/20 transition-colors text-foreground select-none"
                                >
                                    {iconName && (
                                        <Image
                                            src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${iconName}.svg`}
                                            alt={skill}
                                            width={14}
                                            height={14}
                                            className="w-3.5 h-3.5 dark:invert opacity-75 group-hover:opacity-100"
                                            unoptimized
                                        />
                                    )}
                                    <span>{skill}</span>
                                </Badge>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
