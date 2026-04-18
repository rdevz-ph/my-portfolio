import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export default function WorkTimeline({ experiences }) {
    return (
        <div className="mb-24 px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Work Experience
                </h2>
                <div data-aos="fade-up" className="mt-4 mx-auto w-24 h-1 bg-primary rounded-full" />
            </div>

            <div className="relative border-l-2 border-muted max-w-3xl mx-auto pl-8 space-y-12">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="relative"
                    >
                        <div className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 bg-background border-2 border-primary rounded-full z-10">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        
                        <Card
                            className="border-muted transition-all duration-300 hover:shadow-lg"
                            data-aos="fade-left"
                            data-aos-delay={index * 100}
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                            {exp.title}
                                            {index === 0 && (
                                                <Badge variant="default" className="bg-primary text-primary-foreground font-semibold">
                                                    Current
                                                </Badge>
                                            )}
                                        </h3>
                                        <p className="text-lg font-medium text-primary/80">{exp.company}</p>
                                    </div>
                                    <Badge variant="secondary" className="w-fit h-fit font-mono text-xs px-3 py-1">
                                        {format(new Date(exp.start_date), 'MMM yyyy')} – {exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy') : 'Present'}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {exp.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
