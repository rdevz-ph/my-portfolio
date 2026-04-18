import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Pencil, Trash2, Calendar, Building2, Briefcase, ChevronUp } from "lucide-react";

export default function WorkAdmin() {
    const [workExperience, setWorkExperience] = useState([]);
    const [editingWork, setEditingWork] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        start_date: '',
        end_date: '',
        description: ''
    });

    useEffect(() => {
        fetchWorkExperience();
    }, []);

    const fetchWorkExperience = async () => {
        try {
            const response = await fetch('/api/work');
            const data = await response.json();
            setWorkExperience(data);
        } catch (error) {
            console.error('Error fetching work experience:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.start_date && formData.end_date) {
            if (new Date(formData.start_date) > new Date(formData.end_date)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Dates',
                    text: 'Start date cannot be after end date',
                    confirmButtonColor: '#ef4444'
                });
                return;
            }
        }

        try {
            const submitData = {
                ...formData,
                end_date: formData.end_date || null
            };

            const response = await fetch('/api/work', {
                method: isAdding ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...submitData,
                    index: editingWork
                }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `Work experience ${isAdding ? 'added' : 'updated'} successfully`,
                    confirmButtonColor: '#8b5cf6'
                });

                setFormData({
                    title: '',
                    company: '',
                    start_date: '',
                    end_date: '',
                    description: ''
                });
                setEditingWork(null);
                setIsAdding(false);
                fetchWorkExperience();
            } else {
                throw new Error('Failed to save work experience');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save work experience',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    const handleEdit = (index) => {
        const work = workExperience[index];
        setFormData({
            ...work,
            end_date: work.end_date || ''
        });
        setEditingWork(index);
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
                const response = await fetch('/api/work', {
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
                        text: 'Work experience has been deleted.',
                        confirmButtonColor: '#8b5cf6'
                    });
                    fetchWorkExperience();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete work experience',
                    confirmButtonColor: '#ef4444'
                });
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            company: '',
            start_date: '',
            end_date: '',
            description: ''
        });
        setEditingWork(null);
        setIsAdding(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    const sortedWorkExperience = [...workExperience].sort((a, b) => {
        return new Date(b.start_date) - new Date(a.start_date);
    });

    return (
        <div className="space-y-8">
            <Card className="border-muted shadow-xl overflow-hidden">
                <CardHeader className="bg-muted/20 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Briefcase className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Work Experience</CardTitle>
                                <CardDescription>Manage your professional career history</CardDescription>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                setIsAdding(true);
                                setEditingWork(null);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Position
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                    {/* Form */}
                    {(isAdding || editingWork !== null) && (
                        <Card className="border-primary/20 bg-primary/5 shadow-inner">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    {isAdding ? <Plus className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
                                    {isAdding ? 'Add New Work Experience' : 'Edit Work Experience'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Job Title *</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Full Stack Developer"
                                                className="border-muted-foreground/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company">Company *</Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Tech Company Inc."
                                                className="border-muted-foreground/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="start_date">Start Date *</Label>
                                            <Input
                                                id="start_date"
                                                type="date"
                                                name="start_date"
                                                value={formData.start_date}
                                                onChange={handleInputChange}
                                                required
                                                className="border-muted-foreground/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="end_date">End Date</Label>
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase">Leave empty for Present</span>
                                            </div>
                                            <Input
                                                id="end_date"
                                                type="date"
                                                name="end_date"
                                                value={formData.end_date}
                                                onChange={handleInputChange}
                                                className="border-muted-foreground/20"
                                            />
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="description">Description *</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                required
                                                rows={4}
                                                placeholder="Describe your responsibilities, achievements, and technologies used..."
                                                className="border-muted-foreground/20 resize-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Button type="submit" className="bg-green-600 hover:bg-green-700 h-11 px-8">
                                            {isAdding ? 'Add Position' : 'Update Position'}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={handleCancel} className="h-11 px-8">
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Work Experience List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                Career History
                                <Badge variant="secondary" className="rounded-full">{workExperience.length}</Badge>
                            </h2>
                        </div>

                        {sortedWorkExperience.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-muted rounded-xl bg-muted/5">
                                <div className="p-4 bg-muted/20 rounded-full w-fit mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground italic">No work experience added yet.</p>
                                <Button
                                    variant="link"
                                    onClick={() => { setIsAdding(true); setEditingWork(null); }}
                                    className="mt-2 text-primary"
                                >
                                    Add your first position
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {sortedWorkExperience.map((work, index) => {
                                    const originalIndex = workExperience.findIndex(w =>
                                        w.title === work.title &&
                                        w.company === work.company &&
                                        w.start_date === work.start_date
                                    );

                                    return (
                                        <Card key={originalIndex} className="group border-muted/60 transition-all hover:border-primary/40 hover:shadow-md">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <h3 className="text-xl font-bold text-foreground">
                                                                {work.title}
                                                            </h3>
                                                            <div className="flex items-center gap-1.5 text-primary font-bold bg-primary/5 px-3 py-1 rounded-full text-sm border border-primary/10">
                                                                <Building2 className="w-3.5 h-3.5" />
                                                                {work.company}
                                                            </div>
                                                            {!work.end_date && (
                                                                <Badge className="bg-green-500 hover:bg-green-600 font-bold uppercase tracking-widest text-[10px]">
                                                                    Current
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(work.start_date)} - {formatDate(work.end_date)}
                                                        </div>
                                                        <p className="text-muted-foreground text-sm leading-relaxed max-w-4xl">
                                                            {work.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row md:flex-col gap-2 shrink-0 self-end md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() => handleEdit(originalIndex)}
                                                            className="gap-2 h-9 px-4"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(originalIndex)}
                                                            className="gap-2 h-9 px-4"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
