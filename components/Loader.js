import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Terminal } from "lucide-react";

export default function Loader() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing runtime...');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 5;

                if (next >= 15 && next < 35) setStatus('Loading components...');
                else if (next >= 35 && next < 65) setStatus('Compiling shaders & styles...');
                else if (next >= 65 && next < 90) setStatus('Synchronizing state...');
                else if (next >= 90) setStatus('Ready');

                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                return next;
            });
        }, 70);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6 text-center">
            <div className="w-full max-w-sm p-6 rounded-xl border border-border bg-card/60 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-3 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-foreground" />
                        <span className="text-foreground font-semibold">system</span>
                    </div>
                    <span>v2.0</span>
                </div>

                <div className="space-y-3 text-left font-mono">
                    <p className="text-xs text-foreground font-medium">
                        {status}
                    </p>
                    <Progress value={progress} className="h-1.5 w-full bg-muted" />
                    <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-semibold text-foreground">{progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
