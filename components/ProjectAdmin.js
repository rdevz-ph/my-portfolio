import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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
        isPinned: false
    });

    // Load projects on component mount
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
                    isPinned: false
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
            technologies: project.technologies || []
        });
        setEditingProject(index);
        setIsAdding(false);

        // Scroll to top where the form is located
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
            isPinned: false
        });
        setEditingProject(null);
        setIsAdding(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">
                            Project Admin
                        </h1>
                        <button
                            onClick={() => {
                                setIsAdding(true);
                                setEditingProject(null);

                                // Scroll to top where the form will appear
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Add New Project
                        </button>
                    </div>

                    {/* Form */}
                    {(isAdding || editingProject !== null) && (
                        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                {isAdding ? 'Add New Project' : 'Edit Project'}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Image Path
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="/projects/image.png"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Technologies (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.technologies.join(', ')}
                                        onChange={handleTechnologiesChange}
                                        placeholder="React, Next.js, Tailwind CSS"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        URL (optional)
                                    </label>
                                    <input
                                        type="url"
                                        name="url"
                                        value={formData.url}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isPinned"
                                            checked={formData.isPinned}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="text-sm font-medium text-gray-300">
                                            Pin this project (featured)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    {isAdding ? 'Add Project' : 'Update Project'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Projects List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-white">
                            Existing Projects ({projects.length})
                        </h2>

                        {projects
                            .map((project, index) => ({ ...project, originalIndex: index }))
                            .sort((a, b) => {
                                // First sort by pinned status (pinned first)
                                if (a.isPinned && !b.isPinned) return -1;
                                if (!a.isPinned && b.isPinned) return 1;
                                // Then sort by original index in reverse (newest first)
                                return b.originalIndex - a.originalIndex;
                            })
                            .map((project, sortedIndex) => (
                                <div key={project.originalIndex} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-medium text-white">
                                                    {project.title}
                                                </h3>
                                                {project.isPinned && (
                                                    <span className="bg-purple-600 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">
                                                        📌 Pinned
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-sm mb-2">
                                                {project.description.substring(0, 100)}...
                                            </p>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {project.technologies?.map((tech, i) => (
                                                    <span key={i} className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 text-sm hover:underline"
                                                >
                                                    {project.url}
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleEdit(project.originalIndex)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.originalIndex)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
