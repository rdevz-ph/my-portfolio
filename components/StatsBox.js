import {
    EyeIcon,
    UsersIcon,
    BriefcaseIcon,
} from '@heroicons/react/24/outline'; // Make sure this is installed via `@heroicons/react`

import CountUp from 'react-countup';

const StatCard = ({ icon, label, value, color, suffix, aos, delay }) => (
    <div
        class="bg-white dark:bg-gray-900 rounded-lg transition duration-500 shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        data-aos={aos}
        data-aos-delay={delay}
    >
        <div className="flex flex-col items-center space-y-1">
            <div className={`text-${color}-500 dark:text-${color}-400`}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {label}
            </h3>
        </div>
        <p className={`text-4xl font-bold text-${color}-600 dark:text-${color}-400 flex items-center justify-center gap-1`}>
            <CountUp end={parseInt(value)} duration={2} />
            {suffix && <span className="text-lg font-medium">{suffix}</span>}
        </p>
    </div>
);

export default function StatsBox({ settings }) {
    return (
        <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StatCard
                icon={<BriefcaseIcon className="w-8 h-8" />}
                label="Experience"
                value={settings.years_of_experience}
                color="green"
                suffix="+ years"
                aos="fade-up"
                delay="0"
            />

            <StatCard
                icon={<EyeIcon className="w-6 h-6" />}
                label="Total Visitors"
                value={settings.visitor_count}
                color="purple"
                aos="fade-up"
                delay="100"
            />

            <StatCard
                icon={<UsersIcon className="w-6 h-6" />}
                label="Total Clients"
                value={settings.client_count}
                color="blue"
                aos="fade-up"
                delay="200"
            />
        </div>
    );
}
