import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function SettingsAdmin() {
    const [settings, setSettings] = useState({
        full_name: '',
        position: '',
        description: '',
        system_logo: '',
        system_cv_path: '',
        years_of_experience: 0,
        visitor_count: 0,
        client_count: 0
    });
    const [originalSettings, setOriginalSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Load settings on component mount
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            const data = await response.json();
            setSettings(data);
            setOriginalSettings(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                const updatedSettings = await response.json();
                setSettings(updatedSettings);
                setOriginalSettings(updatedSettings);

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Settings updated successfully',
                    confirmButtonColor: '#8b5cf6'
                });
            } else {
                throw new Error('Failed to save settings');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save settings',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setSettings(originalSettings);
    };

    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

    if (loading) {
        return (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <span className="ml-3 text-gray-400">Loading settings...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Portfolio Settings
                </h2>
                {hasChanges && (
                    <span className="bg-yellow-600 text-yellow-100 text-xs px-2 py-1 rounded-full">
                        Unsaved Changes
                    </span>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                value={settings.full_name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Position/Title
                            </label>
                            <input
                                type="text"
                                name="position"
                                value={settings.position}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={settings.description}
                                onChange={handleInputChange}
                                required
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* File Paths Section */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">File Paths</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Profile Image Path
                            </label>
                            <input
                                type="text"
                                name="system_logo"
                                value={settings.system_logo}
                                onChange={handleInputChange}
                                placeholder="/images/profile.jpg"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                CV/Resume Path
                            </label>
                            <input
                                type="text"
                                name="system_cv_path"
                                value={settings.system_cv_path}
                                onChange={handleInputChange}
                                placeholder="/files/cv.pdf"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Years of Experience
                            </label>
                            <input
                                type="number"
                                name="years_of_experience"
                                value={settings.years_of_experience}
                                onChange={handleInputChange}
                                min="0"
                                max="50"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Visitor Count
                            </label>
                            <input
                                type="number"
                                name="visitor_count"
                                value={settings.visitor_count}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Client Count
                            </label>
                            <input
                                type="number"
                                name="client_count"
                                value={settings.client_count}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={!hasChanges || saving}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${hasChanges && !saving
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {saving ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            'Save Changes'
                        )}
                    </button>

                    {hasChanges && (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
