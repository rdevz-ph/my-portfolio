import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

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
        }, 75);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6 text-center">
            <div className="w-full max-w-md space-y-8">
                <h1 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-primary animate-pulse">
                    {status}
                </h1>

                <div className="space-y-4">
                    <Progress value={progress} className="h-2 w-full bg-muted shadow-xs" />
                    <div className="flex justify-between items-center px-1 font-mono text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary font-bold">{progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
