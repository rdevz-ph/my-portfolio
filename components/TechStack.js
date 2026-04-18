import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

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
        Nginx: 'nginx'
    };

    return (
        <Card
            className="border-muted shadow-sm transition-all duration-500 mb-10 overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="100"
        >
            <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Tech Stack</h3>

                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill, index) => {
                            const iconName = techIcons[skill] || null;
                            return (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all hover:scale-110 hover:border-primary hover:bg-primary/5"
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 50}
                                >
                                    {iconName && (
                                        <Image
                                            src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${iconName}.svg`}
                                            alt={skill}
                                            width={16}
                                            height={16}
                                            className="w-4 h-4 dark:invert opacity-80"
                                            unoptimized
                                        />
                                    )}
                                    <span className="text-foreground">{skill}</span>
                                </Badge>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
