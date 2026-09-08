import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export default function WorkTimeline({ experiences }) {
    return (
        <div className="max-w-4xl mx-auto w-full px-2 sm:px-4">
            <div className="text-center mb-10" data-aos="fade-up">
                <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-secondary text-foreground">
                        <Briefcase className="w-5 h-5" />
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    Work Experience
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
                    Professional journey, roles, and engineering contributions.
                </p>
            </div>

            <div className="relative border-l border-border max-w-3xl mx-auto pl-6 sm:pl-8 space-y-8">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full border-2 border-border bg-background z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        </div>
                        
                        <Card
                            className="border border-border bg-card/60 transition-colors hover:border-foreground/20 hover:bg-card shadow-xs"
                            data-aos="fade-left"
                            data-aos-delay={index * 100}
                        >
                            <CardContent className="p-5 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-base sm:text-lg font-bold text-foreground">
                                                {exp.title}
                                            </h3>
                                            {index === 0 && (
                                                <Badge variant="outline" className="text-[10px] font-mono border-border bg-secondary/50 text-foreground py-0">
                                                    Current
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground font-mono">{exp.company}</p>
                                    </div>
                                    <Badge variant="secondary" className="w-fit font-mono text-[11px] px-2.5 py-0.5 border border-border/50">
                                        {format(new Date(exp.start_date), 'MMM yyyy')} – {exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy') : 'Present'}
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
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
