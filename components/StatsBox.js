import {
    EyeIcon,
    UserGroupIcon,
    BriefcaseIcon,
} from '@heroicons/react/24/outline'; // Make sure this is installed via `@heroicons/react`

import CountUp from 'react-countup';

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition duration-500 hover:shadow-2xl text-center space-y-4 group">
        <div className="flex flex-col items-center space-y-1">
            <div className={`text-${color}-500 dark:text-${color}-400 transition-transform duration-300 group-hover:scale-110`}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {label}
            </h3>
        </div>
        <p className={`text-4xl font-bold text-${color}-600 dark:text-${color}-400`}>
            <CountUp end={parseInt(value)} duration={2} separator="," />
        </p>
    </div>
);

export default function StatsBox({ settings }) {
    return (
        <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StatCard
                icon={<EyeIcon className="w-8 h-8" />}
                label="Total Visitors"
                value={settings.visitor_count}
                color="purple"
            />

            <StatCard
                icon={<UserGroupIcon className="w-8 h-8" />}
                label="Total Clients"
                value={settings.client_count}
                color="blue"
            />

            <StatCard
                icon={<BriefcaseIcon className="w-8 h-8" />}
                label="Experience"
                value={`${settings.years_of_experience}+ years`}
                color="green"
            />
        </div>
    );
}