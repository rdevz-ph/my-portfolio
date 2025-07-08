export default function TechStack({ skills }) {
    const techIcons = {
        HTML: 'html5',
        CSS: 'css3',
        JavaScript: 'javascript',
        PHP: 'php',
        Laravel: 'laravel',
        'Vue.js': 'vue-dot-js',
        'Node.js': 'node-dot-js',
        MySQL: 'mysql',
        Git: 'git',
        'TailwindCSS': 'tailwindcss',
        'Tailwind CSS': 'tailwindcss',
        Bootstrap: 'bootstrap',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition duration-500 hover:shadow-2xl mb-16">
            <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Tech Stack</h3>

                <div className="flex flex-wrap justify-center gap-2">
                    {skills.map((skill, index) => {
                        const iconName = techIcons[skill] || null;
                        return (
                            <span
                                key={index}
                                className="flex items-center space-x-2 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium transition transform hover:scale-105"
                            >
                                {iconName && (
                                    <img
                                        src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${iconName}.svg`}
                                        alt={skill}
                                        className="w-5 h-5 filter dark:invert"
                                    />
                                )}
                                <span className="text-gray-900 dark:text-white">{skill}</span>
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
