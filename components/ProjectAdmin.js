import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Plus, Pencil, Trash2, Calendar, Link as LinkIcon, Pin, Image as ImageIcon, LayoutGrid } from "lucide-react";

export default function ProjectAdmin() {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        technologies: [],
        url: '',
        isPinned: false,
        year: new Date().getFullYear()
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCheckboxChange = (checked) => {
        setFormData(prev => ({
            ...prev,
            isPinned: checked
        }));
    };

    const handleTechnologiesChange = (e) => {
        const technologies = e.target.value.split(',').map(tech => tech.trim());
        setFormData(prev => ({
            ...prev,
            technologies
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/projects', {
                method: isAdding ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    index: editingProject
                }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `Project ${isAdding ? 'added' : 'updated'} successfully`,
                    confirmButtonColor: '#8b5cf6'
                });

                setFormData({
                    title: '',
                    description: '',
                    image: '',
                    technologies: [],
                    url: '',
                    isPinned: false,
                    year: new Date().getFullYear()
                });
                setEditingProject(null);
                setIsAdding(false);
                fetchProjects();
            } else {
                throw new Error('Failed to save project');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save project',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    const handleEdit = (index) => {
        const project = projects[index];
        setFormData({
            ...project,
            technologies: project.technologies || [],
            year: project.year || new Date().getFullYear()
        });
        setEditingProject(index);
        setIsAdding(false);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleDelete = async (index) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/projects', {
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
                        text: 'Project has been deleted.',
                        confirmButtonColor: '#8b5cf6'
                    });
                    fetchProjects();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete project',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            description: '',
            image: '',
            technologies: [],
            url: '',
            isPinned: false,
            year: new Date().getFullYear()
        });
        setEditingProject(null);
        setIsAdding(false);
    };

    return (
        <div className="space-y-8">
            <Card className="border-muted shadow-xl overflow-hidden">
                <CardHeader className="bg-muted/20 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <LayoutGrid className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Project Portfolio</CardTitle>
                                <CardDescription>Manage your showcase and featured works</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                setIsAdding(true);
                                setEditingProject(null);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                    {/* Form */}
                    {(isAdding || editingProject !== null) && (
                        <Card className="border-primary/20 bg-primary/5 shadow-inner">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    {isAdding ? <Plus className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
                                    {isAdding ? 'Add New Project' : 'Edit Project'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title *</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="My Awesome Project"
                                                className="border-muted-foreground/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="image">Image Path *</Label>
                                            <div className="relative">
                                                <Input
                                                    id="image"
                                                    name="image"
                                                    value={formData.image}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="/projects/screenshot.png"
                                                    className="border-muted-foreground/20 pl-9"
                                                />
                                                <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="year">Release Year *</Label>
                                            <Input
                                                id="year"
                                                type="number"
                                                name="year"
                                                min="2000"
                                                max="2100"
                                                value={formData.year}
                                                onChange={handleInputChange}
                                                required
                                                className="border-muted-foreground/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="url">Live URL</Label>
                                            <div className="relative">
                                                <Input
                                                    id="url"
                                                    type="url"
                                                    name="url"
                                                    value={formData.url}
                                                    onChange={handleInputChange}
                                                    placeholder="https://project-demo.com"
                                                    className="border-muted-foreground/20 pl-9"
                                                />
                                                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="description">Description *</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                                rows={3}
                                                className="border-muted-foreground/20 resize-none"
                                            />
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                                            <Input
                                                id="technologies"
                                                value={formData.technologies.join(', ')}
                                                onChange={handleTechnologiesChange}
                                                placeholder="React, Next.js, Tailwind CSS, PostgreSQL"
                                                className="border-muted-foreground/20"
                                            />
                                        </div>

                                        <div className="md:col-span-2 flex items-center space-x-2 bg-background/50 p-4 rounded-lg border border-muted-foreground/10">
                                            <Checkbox
                                                id="isPinned"
                                                checked={formData.isPinned}
                                                onCheckedChange={handleCheckboxChange}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <Label
                                                    htmlFor="isPinned"
                                                    className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    Pin this project
                                                </Label>
                                                <p className="text-xs text-muted-foreground">
                                                    Featured projects will appear at the top of your portfolio.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Button type="submit" className="bg-green-600 hover:bg-green-700 h-11 px-8">
                                            {isAdding ? 'Add Project' : 'Update Project'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={handleCancel} className="h-11 px-8">
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Projects List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                Project Archive
                                <Badge variant="secondary" className="rounded-full">{projects.length}</Badge>
                            </h2>
                        </div>

                        {projects.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-muted rounded-xl bg-muted/5">
                                <p className="text-muted-foreground italic">No projects added yet.</p>
                                <Button
                                    variant="link"
                                    onClick={() => { setIsAdding(true); setEditingProject(null); }}
                                    className="mt-2 text-primary"
                                >
                                    Add your first project
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {projects
                                    .map((project, index) => ({ ...project, originalIndex: index }))
                                    .sort((a, b) => {
                                        if (a.isPinned && !b.isPinned) return -1;
                                        if (!a.isPinned && b.isPinned) return 1;
                                        return b.originalIndex - a.originalIndex;
                                    })
                                    .map((project) => (
                                        <Card key={project.originalIndex} className="group border-muted/60 transition-all hover:border-primary/40 hover:shadow-md">
                                            <CardContent className="p-4">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <h3 className="text-lg font-bold text-foreground">
                                                                {project.title}
                                                            </h3>
                                                            {project.isPinned && (
                                                                <Badge className="bg-primary/10 text-primary border-primary/20 flex gap-1 h-6">
                                                                    <Pin className="w-3 h-3 fill-current" />
                                                                    Pinned
                                                                </Badge>
                                                            )}
                                                            <Badge variant="outline" className="h-6 font-mono text-xs">
                                                                {project.year}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-muted-foreground text-sm line-clamp-2 max-w-3xl">
                                                            {project.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                                            {project.technologies?.map((tech, i) => (
                                                                <Badge key={i} variant="secondary" className="text-[10px] h-5 bg-muted/50">
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row md:flex-col gap-2 shrink-0 self-end md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() => handleEdit(project.originalIndex)}
                                                            className="gap-2 h-9 px-4"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(project.originalIndex)}
                                                            className="gap-2 h-9 px-4"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
