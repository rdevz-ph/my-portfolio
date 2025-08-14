import { useEffect, useState } from 'react';

export default function Loader() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing build...');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 5;

                // Status simulation
                if (next >= 10 && next < 30) setStatus('Building project...');
                else if (next >= 30 && next < 60) setStatus('Optimizing assets...');
                else if (next >= 60 && next < 90) setStatus('Deploying to Vercel...');
                else if (next >= 90) setStatus('Finishing up...');

                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                return next;
            });
        }, 75); // 1.5 seconds (20 iterations * 75ms = 1500ms)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-mono text-purple-600 dark:text-purple-400 mb-6">
                {status}
            </h1>

            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="loader-wrapper">
                    <div
                        className="loader-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 font-mono">
                    {progress}%
                </p>
            </div>
        </div>
    );
}
