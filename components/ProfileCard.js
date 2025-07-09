import Image from 'next/image';

export default function ProfileCard({ settings }) {
    return (
        <div
            className="flex flex-col items-center space-y-8 mb-16"
            data-aos="fade-up"
            data-aos-delay="100"
        >
            <div className="relative group" data-aos="zoom-in">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <Image
                    src={settings.system_logo}
                    alt="Profile Image"
                    width={192}
                    height={192}
                    className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg transform transition duration-500 hover:scale-105"
                />
            </div>

            <div className="text-center space-y-2" data-aos="fade-up" data-aos-delay="200">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {settings.full_name}
                </h1>
                <p className="text-xl text-purple-600 dark:text-purple-400 font-medium">
                    {settings.position}
                </p>
            </div>

            <div className="max-w-3xl text-center space-y-4" data-aos="fade-up" data-aos-delay="300">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {settings.description}
                </p>
                <a
                    href={settings.system_cv_path}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition transform hover:scale-105 shadow-lg"
                    download
                >
                    Download CV
                    <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
