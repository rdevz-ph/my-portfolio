import { useEffect, useState } from 'react';

export default function Loader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-6 leading-snug">
                Welcome to Romel&apos;s Portfolio
            </h1>

            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="loader-wrapper">
                    <div
                        className="loader-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{progress}%</p>
            </div>
        </div>
    );
}
