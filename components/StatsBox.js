import { Briefcase, Eye, Users } from 'lucide-react';
import CountUp from 'react-countup';
import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ icon: Icon, label, value, suffix, aos, delay }) => {
    return (
        <Card
            className="border border-border bg-card/60 transition-all duration-200 hover:border-foreground/20 hover:bg-card shadow-xs"
            data-aos={aos}
            data-aos-delay={delay}
        >
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                        {label}
                    </span>
                    <div className="p-2 rounded-md bg-secondary/50 text-foreground">
                        <Icon className="w-4 h-4" />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-foreground flex items-baseline gap-1.5">
                        <CountUp end={parseInt(value) || 0} duration={2} separator="," />
                        {suffix && (
                            <span className="text-xs font-mono font-normal text-muted-foreground">
                                {suffix}
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function StatsBox({ settings }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
            <StatCard
                icon={Briefcase}
                label="Experience"
                value={settings.years_of_experience}
                suffix="Years"
                aos="fade-up"
                delay="50"
            />

            <StatCard
                icon={Eye}
                label="Total Views"
                value={settings.visitor_count}
                suffix="Visits"
                aos="fade-up"
                delay="100"
            />

            <StatCard
                icon={Users}
                label="Clients"
                value={settings.client_count}
                suffix="Served"
                aos="fade-up"
                delay="150"
            />
        </div>
    );
}
