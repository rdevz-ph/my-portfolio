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
                return prev + 5; // 5% every 150ms → ~3 seconds total
            });
        }, 150); // 150ms * 20 = 3000ms = 3s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-6">
                Welcome to Romel&apos;s Portfolio
            </h1>
            <div className="w-64 h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-purple-600 dark:bg-purple-400 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{progress}%</p>
        </div>
    );
}
