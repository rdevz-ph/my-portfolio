import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProjectAdmin from '@/components/ProjectAdmin';
import SettingsAdmin from '@/components/SettingsAdmin';
import WorkAdmin from '@/components/WorkAdmin';
import SkillsAdmin from '@/components/SkillsAdmin';
import Swal from 'sweetalert2';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('projects');
    const router = useRouter();

    useEffect(() => {
        // Simple password protection for local development
        const checkAuth = () => {
            const password = localStorage.getItem('admin-auth');
            if (password === 'admin123') { // Change this password
                setIsAuthenticated(true);
            } else {
                promptPassword();
            }
            setLoading(false);
        };

        const promptPassword = async () => {
            const { value: password } = await Swal.fire({
                title: 'Admin Access',
                text: 'Enter admin password:',
                input: 'password',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Go Back',
                confirmButtonColor: '#8b5cf6'
            });

            if (password === 'admin123') { // Change this password
                localStorage.setItem('admin-auth', password);
                setIsAuthenticated(true);
            } else if (password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Password',
                    text: 'Access denied',
                    confirmButtonColor: '#ef4444'
                }).then(() => {
                    router.push('/');
                });
            } else {
                router.push('/');
            }
        };

        // Check if we're in development mode
        if (process.env.NODE_ENV === 'production') {
            Swal.fire({
                icon: 'error',
                title: 'Not Available',
                text: 'Admin panel is only available in development mode',
                confirmButtonColor: '#ef4444'
            }).then(() => {
                router.push('/');
            });
            return;
        }

        checkAuth();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin-auth');
        setIsAuthenticated(false);
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white">Access Denied</h1>
                    <p className="text-gray-400 mt-2">Please authenticate to access the admin panel</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-gray-800 shadow-sm border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-white">
                        Portfolio Admin Panel
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="text-purple-400 hover:text-purple-300"
                        >
                            View Portfolio
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-gray-900 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'projects'
                                ? 'border-purple-500 text-purple-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            📁 Projects Management
                        </button>
                        <button
                            onClick={() => setActiveTab('work')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'work'
                                ? 'border-purple-500 text-purple-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            💼 Work Experience
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'skills'
                                ? 'border-purple-500 text-purple-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            🛠️ Skills Management
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'settings'
                                ? 'border-purple-500 text-purple-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            ⚙️ Portfolio Settings
                        </button>
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-screen bg-gray-900">
                {activeTab === 'projects' && <ProjectAdmin />}
                {activeTab === 'work' && <WorkAdmin />}
                {activeTab === 'skills' && <SkillsAdmin />}
                {activeTab === 'settings' && (
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <SettingsAdmin />
                    </div>
                )}
            </div>
        </div>
    );
}
