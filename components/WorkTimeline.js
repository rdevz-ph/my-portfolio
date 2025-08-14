import { format } from 'date-fns';

export default function WorkTimeline({ experiences }) {
    return (
        <div className="mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Work Experience
                </h2>
                <div data-aos="fade-up" className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 rounded-full"></div>
            </div>

            <ol className="relative border-s border-gray-300 dark:border-gray-700">
                {experiences.map((exp, index) => (
                    <li
                        key={index}
                        className="mb-10 ms-6"
                    >
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 6h-4V4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM9 4h6v2H9V4ZM3 20V8h18v12H3Z" />
                            </svg>
                        </span>
                        <div
                            className="bg-white dark:bg-gray-900 rounded-lg transition duration-500 shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-duration="600"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                {exp.title}
                                {index === 0 && (
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">
                                        Latest
                                    </span>
                                )}
                            </h3>
                            <p className="text-purple-600 dark:text-purple-400 font-medium">{exp.company}</p>
                            <time className="block mb-2 text-sm text-gray-400 dark:text-gray-500">
                                {format(new Date(exp.start_date), 'MMM yyyy')} – {exp.end_date ? format(new Date(exp.end_date), 'MMM yyyy') : 'Present'}
                            </time>
                            <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
