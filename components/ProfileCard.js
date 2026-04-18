import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ProfileCard({ settings }) {
    return (
        <div
            className="flex flex-col items-center space-y-8 mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
        >
            <div className="relative group" data-aos="zoom-in">
                <div className="absolute -inset-1.5 bg-linear-to-r from-primary to-purple-400 rounded-full blur-sm opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <Avatar className="w-48 h-48 border-4 border-background shadow-2xl relative">
                    <AvatarImage src={settings.system_logo} className="object-cover" />
                    <AvatarFallback className="text-4xl">{settings.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>

            <div className="text-center space-y-3" data-aos="fade-up" data-aos-delay="200">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    {settings.full_name}
                </h1>
                <p className="text-xl sm:text-2xl text-primary font-semibold tracking-wide uppercase italic">
                    {settings.position}
                </p>
            </div>

            <div className="max-w-3xl text-center space-y-8" data-aos="fade-up" data-aos-delay="300">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {settings.description}
                </p>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="rounded-full px-10 h-12 text-sm md:text-base font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                        <a href={settings.system_cv_path} download>
                            Download CV
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
