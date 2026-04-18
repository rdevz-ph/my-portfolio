import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, ListFilter, Pencil, Trash2, Check, X, Lightbulb, Library } from "lucide-react";

export default function SkillsAdmin() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [editingSkill, setEditingSkill] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await fetch('/api/skills');
            const data = await response.json();
            setSkills(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching skills:', error);
            setLoading(false);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();

        if (!newSkill.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter a skill name',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        if (skills.some(skill => skill.toLowerCase() === newSkill.trim().toLowerCase())) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Skill',
                text: 'This skill already exists',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        try {
            const response = await fetch('/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skill: newSkill.trim() }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Skill added successfully',
                    confirmButtonColor: '#8b5cf6',
                    timer: 1500,
                    showConfirmButton: false
                });

                setNewSkill('');
                fetchSkills();
            } else {
                throw new Error('Failed to add skill');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add skill',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    const handleEditSkill = async (index) => {
        if (!editValue.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter a skill name',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        if (skills.some((skill, i) => i !== index && skill.toLowerCase() === editValue.trim().toLowerCase())) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Skill',
                text: 'This skill already exists',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        try {
            const response = await fetch('/api/skills', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    index,
                    skill: editValue.trim()
                }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Skill updated successfully',
                    confirmButtonColor: '#8b5cf6',
                    timer: 1500,
                    showConfirmButton: false
                });

                setEditingSkill(null);
                setEditValue('');
                fetchSkills();
            } else {
                throw new Error('Failed to update skill');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update skill',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    const handleDeleteSkill = async (index) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Delete "${skills[index]}" from your skills?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/skills', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ index }),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Skill has been deleted.',
                        confirmButtonColor: '#8b5cf6',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    fetchSkills();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete skill',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    const startEditing = (index, skill) => {
        setEditingSkill(index);
        setEditValue(skill);
    };

    const cancelEditing = () => {
        setEditingSkill(null);
        setEditValue('');
    };

    const handleBulkAdd = async () => {
        const { value: skillsText } = await Swal.fire({
            title: 'Bulk Add Skills',
            html: `
                <textarea 
                    id="bulkSkills" 
                    class="swal2-textarea" 
                    placeholder="Enter skills separated by commas&#10;Example: React, Vue.js, Angular, Node.js"
                    rows="4"
                    style="width: 100%; margin: 10px 0; font-family: monospace;"
                ></textarea>
                <p style="font-size: 12px; color: #666; margin-top: 10px; text-align: left;">
                    💡 Tip: Separate each skill with a comma. Duplicates will be automatically filtered out.
                </p>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add Skills',
            confirmButtonColor: '#8b5cf6',
            preConfirm: () => {
                const textarea = document.getElementById('bulkSkills');
                return textarea.value;
            }
        });

        if (skillsText) {
            const newSkills = skillsText
                .split(',')
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0)
                .filter(skill => !skills.some(existingSkill =>
                    existingSkill.toLowerCase() === skill.toLowerCase()
                ));

            if (newSkills.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'No New Skills',
                    text: 'All entered skills already exist or were empty',
                    confirmButtonColor: '#8b5cf6'
                });
                return;
            }

            try {
                const response = await fetch('/api/skills', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ skills: newSkills }),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `Added ${newSkills.length} new skills`,
                        confirmButtonColor: '#8b5cf6'
                    });
                    fetchSkills();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add skills',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="container py-12 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium">Loading your skillset...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Card className="border-muted shadow-xl overflow-hidden">
                <CardHeader className="bg-muted/20 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Library className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Skills Inventory</CardTitle>
                                <CardDescription>Manage your technical expertise and tech stack</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={handleBulkAdd}
                            variant="outline"
                            className="w-full sm:w-auto gap-2 border-primary/20"
                        >
                            <ListFilter className="w-4 h-4" />
                            Bulk Add
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                    {/* Add New Skill Form */}
                    <Card className="bg-muted/30 border-dashed">
                        <CardContent className="p-4">
                            <form onSubmit={handleAddSkill} className="space-y-4">
                                <Label htmlFor="new-skill" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Add New Competency</Label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Input
                                        id="new-skill"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Enter skill name (e.g., React, Python, AWS)"
                                        className="flex-1 h-11 border-muted-foreground/20"
                                    />
                                    <Button type="submit" className="h-11 px-6 gap-2 min-w-[140px]">
                                        <Plus className="w-4 h-4" />
                                        Add Skill
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Skills List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                Technical Stack
                                <Badge variant="secondary" className="rounded-full">{skills.length}</Badge>
                            </h2>
                        </div>

                        {skills.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-muted rounded-xl">
                                <p className="text-muted-foreground italic">No skills added yet.</p>
                                <p className="text-sm text-muted-foreground/60 mt-2">Start building your stack above!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                {skills.map((skill, index) => (
                                    <Card key={index} className="group border-muted/60 transition-all hover:border-primary/40 hover:shadow-md">
                                        <CardContent className="p-3">
                                            {editingSkill === index ? (
                                                <div className="flex gap-1.5 items-center">
                                                    <Input
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        className="h-8 py-0 px-2 text-sm border-primary/40"
                                                        autoFocus
                                                    />
                                                    <Button
                                                        size="icon"
                                                        className="h-8 w-8 shrink-0 bg-green-600 hover:bg-green-700"
                                                        onClick={() => handleEditSkill(index)}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 shrink-0"
                                                        onClick={cancelEditing}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between items-center group-hover:translate-x-0.5 transition-transform">
                                                    <span className="font-semibold text-sm pl-1">{skill}</span>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-7 w-7 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                                                            onClick={() => startEditing(index, skill)}
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                            onClick={() => handleDeleteSkill(index)}
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>

                {skills.length > 0 && (
                    <CardFooter className="bg-primary/5 border-t p-4 flex items-start gap-3">
                        <div className="p-1 bg-primary/20 rounded-md">
                            <Lightbulb className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-xs space-y-1">
                            <p className="font-bold text-primary uppercase tracking-tighter">Pro Tips</p>
                            <p className="text-muted-foreground font-medium">Use Bulk Add to paste comma-separated lists. Hover over skills to see edit and delete actions.</p>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
