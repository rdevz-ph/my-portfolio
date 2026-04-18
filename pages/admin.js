import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectAdmin from '@/components/ProjectAdmin';
import SettingsAdmin from '@/components/SettingsAdmin';
import WorkAdmin from '@/components/WorkAdmin';
import SkillsAdmin from '@/components/SkillsAdmin';
import Swal from 'sweetalert2';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard, LogOut, Eye, FolderHeart, Briefcase, Wrench, Settings } from "lucide-react";

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('projects');
    const router = useRouter();

    useEffect(() => {
        // Automatically "authenticate" and finish loading
        setLoading(false);
    }, []);

    const handleLogout = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground font-mono">Loading Admin Panel...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary rounded-lg text-primary-foreground">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight hidden sm:block">
                            Portfolio <span className="text-primary">Admin</span>
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => router.push('/')}
                            className="hidden sm:flex gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            View Portfolio
                        </Button>
                        <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={handleLogout}
                            className="gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
                    <div className="flex justify-center sm:justify-start overflow-x-auto pb-2">
                        <TabsList className="bg-muted/50 p-1 h-auto">
                            <TabsTrigger value="projects" className="gap-2 py-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                <FolderHeart className="w-4 h-4" />
                                <span className="hidden sm:inline">Projects</span>
                            </TabsTrigger>
                            <TabsTrigger value="work" className="gap-2 py-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                <Briefcase className="w-4 h-4" />
                                <span className="hidden sm:inline">Experience</span>
                            </TabsTrigger>
                            <TabsTrigger value="skills" className="gap-2 py-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                <Wrench className="w-4 h-4" />
                                <span className="hidden sm:inline">Skills</span>
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="gap-2 py-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                <Settings className="w-4 h-4" />
                                <span className="hidden sm:inline">Settings</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="projects" className="mt-0 focus-visible:outline-none">
                        <ProjectAdmin />
                    </TabsContent>
                    
                    <TabsContent value="work" className="mt-0 focus-visible:outline-none">
                        <WorkAdmin />
                    </TabsContent>
                    
                    <TabsContent value="skills" className="mt-0 focus-visible:outline-none">
                        <SkillsAdmin />
                    </TabsContent>
                    
                    <TabsContent value="settings" className="mt-0 focus-visible:outline-none">
                        <div className="max-w-4xl mx-auto">
                            <SettingsAdmin />
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
