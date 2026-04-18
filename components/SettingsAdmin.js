import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save, RotateCcw, User, FileText, BarChart3 } from "lucide-react";

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
            <Card className="border-muted">
                <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="text-muted-foreground font-medium">Loading settings...</span>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-muted shadow-lg">
            <CardHeader className="border-b bg-muted/20">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl">Portfolio Settings</CardTitle>
                        <CardDescription>Manage your personal information and portfolio configuration</CardDescription>
                    </div>
                    {hasChanges && (
                        <div className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-yellow-500/20 uppercase tracking-wider">
                            Unsaved Changes
                        </div>
                    )}
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-8 p-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold border-b pb-2">
                            <User className="w-5 h-5" />
                            <h3>Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    value={settings.full_name}
                                    onChange={handleInputChange}
                                    required
                                    className="border-muted-foreground/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="position">Position/Title</Label>
                                <Input
                                    id="position"
                                    name="position"
                                    value={settings.position}
                                    onChange={handleInputChange}
                                    required
                                    className="border-muted-foreground/20"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={settings.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="border-muted-foreground/20 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* File Paths Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold border-b pb-2">
                            <FileText className="w-5 h-5" />
                            <h3>Assets & Links</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="system_logo">Profile Image Path</Label>
                                <Input
                                    id="system_logo"
                                    name="system_logo"
                                    value={settings.system_logo}
                                    onChange={handleInputChange}
                                    placeholder="/images/profile.jpg"
                                    className="border-muted-foreground/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="system_cv_path">CV/Resume Path</Label>
                                <Input
                                    id="system_cv_path"
                                    name="system_cv_path"
                                    value={settings.system_cv_path}
                                    onChange={handleInputChange}
                                    placeholder="/files/cv.pdf"
                                    className="border-muted-foreground/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold border-b pb-2">
                            <BarChart3 className="w-5 h-5" />
                            <h3>Portfolio Statistics</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="years_of_experience">Years of Experience</Label>
                                <Input
                                    id="years_of_experience"
                                    type="number"
                                    name="years_of_experience"
                                    value={settings.years_of_experience}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="50"
                                    className="border-muted-foreground/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="visitor_count">Visitor Count</Label>
                                <Input
                                    id="visitor_count"
                                    type="number"
                                    name="visitor_count"
                                    value={settings.visitor_count}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="border-muted-foreground/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="client_count">Client Count</Label>
                                <Input
                                    id="client_count"
                                    type="number"
                                    name="client_count"
                                    value={settings.client_count}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="border-muted-foreground/20"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t bg-muted/10 p-6 flex flex-wrap gap-4">
                    <Button
                        type="submit"
                        disabled={!hasChanges || saving}
                        className="h-11 px-8 min-w-[140px]"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>

                    {hasChanges && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            className="h-11 px-8"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}
