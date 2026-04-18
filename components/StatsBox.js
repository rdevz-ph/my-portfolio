import {
    EyeIcon,
    UsersIcon,
    BriefcaseIcon,
} from '@heroicons/react/24/outline';
import CountUp from 'react-countup';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StatCard = ({ icon, label, value, color, suffix, aos, delay }) => {
    // Mapping colors to shadcn-friendly classes if needed, 
    // but keeping the original logic for compatibility.
    const colorClasses = {
        green: "text-emerald-500",
        purple: "text-primary",
        blue: "text-blue-500"
    };

    return (
        <Card
            className="border-muted shadow-sm transition-all duration-500 hover:shadow-md"
            data-aos={aos}
            data-aos-delay={delay}
        >
            <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className={cn("p-3 rounded-full bg-muted", colorClasses[color] || `text-${color}-500`)}>
                        {icon}
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {label}
                        </h3>
                        <p className={cn("text-4xl font-bold tracking-tight flex items-center justify-center gap-1", colorClasses[color] || `text-${color}-600`)}>
                            <CountUp end={parseInt(value)} duration={2.5} separator="," />
                            {suffix && <span className="text-sm font-medium opacity-80 uppercase ml-1">{suffix}</span>}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function StatsBox({ settings }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            <StatCard
                icon={<BriefcaseIcon className="w-8 h-8" />}
                label="Experience"
                value={settings.years_of_experience}
                color="green"
                suffix="Years"
                aos="fade-up"
                delay="0"
            />

            <StatCard
                icon={<EyeIcon className="w-8 h-8" />}
                label="Total Visitors"
                value={settings.visitor_count}
                color="purple"
                aos="fade-up"
                delay="100"
            />

            <StatCard
                icon={<UsersIcon className="w-8 h-8" />}
                label="Total Clients"
                value={settings.client_count}
                color="blue"
                aos="fade-up"
                delay="200"
            />
        </div>
    );
}
