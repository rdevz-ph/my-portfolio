import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';

const techIcons = {
    HTML: 'html5',
    CSS: 'css3',
    JavaScript: 'javascript',
    TypeScript: 'typescript',
    PHP: 'php',
    Laravel: 'laravel',
    'Vue.js': 'vuedotjs',
    'Node.js': 'nodedotjs',
    MySQL: 'mysql',
    Git: 'git',
    TailwindCSS: 'tailwindcss',
    'Tailwind CSS': 'tailwindcss',
    Bootstrap: 'bootstrap',
    React: 'react',
    'Next.js': 'nextdotjs',
    Supabase: 'supabase',
    Python: 'python',
    Tkinter: 'python',
    SSH: 'gnubash',
    Linux: 'linux',
    Ubuntu: 'ubuntu',
    Nginx: 'nginx'
};

export default function ProjectsGrid({ projects }) {
    // Build list of years (descending)
    const years = useMemo(() => {
        const set = new Set(
            (projects ?? [])
                .map((p) => Number(p.year))
                .filter((y) => Number.isFinite(y))
        );

        return Array.from(set).sort((a, b) => b - a);
    }, [projects]);

    // default active year = latest year
    const [activeYear, setActiveYear] = useState(years[0] ?? null);

    // if projects load/update later, ensure activeYear remains valid
    useEffect(() => {
        if (!activeYear && years.length) setActiveYear(years[0]);
        if (activeYear && years.length && !years.includes(activeYear)) setActiveYear(years[0]);
    }, [years, activeYear]);

    // Filter by year
    const filteredProjects = useMemo(() => {
        if (!activeYear) return projects ?? [];
        return (projects ?? []).filter((p) => Number(p.year) === Number(activeYear));
    }, [projects, activeYear]);

    // Sort projects: pinned first, then unpinned
    const sortedProjects = useMemo(() => {
        return [...filteredProjects].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
        });
    }, [filteredProjects]);

    return (
        <div className="py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Projects
                </h2>
                <div
                    data-aos="fade-up"
                    className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-full"
                />
            </div>

            {/* Year Tabs */}
            {years.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {years.map((y) => {
                        const isActive = y === activeYear;
                        const count = (projects ?? []).filter((p) => Number(p.year) === y).length;

                        return (
                            <button
                                key={y}
                                type="button"
                                onClick={() => setActiveYear(y)}
                                className={[
                                    "px-4 py-2 rounded-full text-sm border transition",
                                    isActive
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-purple-400"
                                ].join(" ")}
                            >
                                {y} <span className="opacity-80 ml-1">({count})</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProjects.map((project, index) => (
                    <div
                        key={`${project.title}-${project.year}-${index}`}
                        className="bg-white dark:bg-gray-900 rounded-lg transition duration-500 shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                        data-aos="zoom-in-up"
                        data-aos-delay={index * 100}
                    >
                        <div className="relative">
                            {project.isPinned && (
                                <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            )}

                            <a href={project.image} data-lightbox="projects" data-title={project.title}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={300}
                                    className="w-full h-48 object-cover cursor-pointer"
                                />
                            </a>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {project.title}
                                </h3>

                                {/* optional year badge */}
                                <span className="text-xs px-2 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                                    {project.year}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {(project.technologies ?? []).map((tech, i) => {
                                    const icon = techIcons[tech] ?? null;

                                    return (
                                        <span
                                            key={i}
                                            className="flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-sm"
                                        >
                                            {icon && (
                                                <Image
                                                    src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`}
                                                    alt={tech}
                                                    width={16}
                                                    height={16}
                                                    className="w-4 h-4 filter dark:invert"
                                                    unoptimized
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

            {/* Empty state */}
            {sortedProjects.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-300 mt-10">
                    No projects found for {activeYear}.
                </div>
            )}
        </div>
    );
}
