const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition duration-500 hover:shadow-2xl text-center space-y-4">
        <div className="flex flex-col items-center space-y-1">
            <div className={`text-${color}-500 dark:text-${color}-400`}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {label}
            </h3>
        </div>
        <p className={`text-4xl font-bold text-${color}-600 dark:text-${color}-400`}>
            {value}
        </p>
    </div>
);

export default function StatsBox({ settings }) {
    return (
        <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StatCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>}
                label="Total Visitors"
                value={settings.visitor_count}
                color="purple"
            />
            <StatCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 20h5v-2a4 4 0 00-8 0v2h3M9 20h3v-2a4 4 0 00-8 0v2h5M12 11a4 4 0 100-8 4 4 0 000 8zM6 12a6 6 0 1112 0" />
                </svg>}
                label="Total Clients"
                value={settings.client_count}
                color="blue"
            />
            <StatCard
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                </svg>}
                label="Experience"
                value={`${settings.years_of_experience}+ years`}
                color="green"
            />
        </div>
    );
}