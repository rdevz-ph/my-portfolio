import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowDownRight, Mail } from "lucide-react";
import { Link as ScrollLink } from 'react-scroll';

export default function ProfileCard({ settings }) {
    return (
        <div
            className="flex flex-col items-center text-center space-y-6 pt-6 sm:pt-10"
            data-aos="fade-up"
            data-aos-delay="100"
        >
            {/* Status Pill */}
            <div data-aos="fade-down" data-aos-delay="50">
                <Badge 
                    variant="outline" 
                    className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono font-normal border-border bg-muted/30 text-muted-foreground"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                    </span>
                    Available for projects & full-time roles
                </Badge>
            </div>

            {/* Avatar */}
            <div className="relative" data-aos="zoom-in" data-aos-delay="150">
                <div className="p-1 rounded-full border border-border bg-card shadow-xs">
                    <Avatar className="w-32 h-32 sm:w-36 sm:h-36 border-2 border-background">
                        <AvatarImage src={settings.system_logo} alt={settings.full_name} className="object-cover" />
                        <AvatarFallback className="text-3xl font-mono font-bold bg-muted text-foreground">
                            {settings.full_name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Name and Title */}
            <div className="space-y-2 max-w-2xl" data-aos="fade-up" data-aos-delay="200">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                    {settings.full_name}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground font-mono">
                    {settings.position}
                </p>
            </div>

            {/* Bio */}
            <div className="max-w-2xl space-y-6" data-aos="fade-up" data-aos-delay="250">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {settings.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
                    <Button 
                        render={<a href={settings.system_cv_path} download />} 
                        size="default" 
                        className="font-medium gap-2 shadow-xs"
                    >
                        <Download className="w-4 h-4" />
                        Download CV
                    </Button>

                    <ScrollLink
                        to="projects"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="cursor-pointer"
                    >
                        <Button variant="outline" size="default" className="gap-2">
                            View Projects
                            <ArrowDownRight className="w-4 h-4" />
                        </Button>
                    </ScrollLink>

                    <ScrollLink
                        to="contact"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="cursor-pointer"
                    >
                        <Button variant="ghost" size="default" className="gap-2 text-muted-foreground hover:text-foreground">
                            <Mail className="w-4 h-4" />
                            Contact
                        </Button>
                    </ScrollLink>
                </div>
            </div>
        </div>
    );
}
