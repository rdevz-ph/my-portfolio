import Image from 'next/image';

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
    React: 'react',
    'Next.js': 'nextdotjs'
};

export default function ProjectsGrid({ projects }) {
    return (
        <div className="py-12">

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Recent Projects
                </h2>
                <div data-aos="fade-up" className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-500 hover:shadow-xl transform hover:-translate-y-2"
                        data-aos="zoom-in-up"
                        data-aos-delay={index * 100} // staggered animation
                    >
                        <a href={project.image} data-lightbox="projects" data-title={project.title}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                className="w-full h-48 object-cover cursor-pointer"
                            />
                        </a>

                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, i) => {
                                    const icon = techIcons[tech] ?? null;
                                    return (
                                        <span
                                            key={i}
                                            className="flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-sm"
                                        >
                                            {icon && (
                                                <img
                                                    src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`}
                                                    alt={tech}
                                                    className="w-4 h-4 filter dark:invert"
                                                />
                                            )}
                                            <span className="text-gray-800 dark:text-gray-200">{tech}</span>
                                        </span>
                                    );
                                })}
                            </div>
                            {project.url && (
                                <a
                                    href={project.url}
                                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Live Preview
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
