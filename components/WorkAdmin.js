import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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

    // Load work experience on component mount
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

        // Validate dates
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
                end_date: formData.end_date || null // Convert empty string to null for current position
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
            end_date: work.end_date || '' // Convert null to empty string for form
        });
        setEditingWork(index);
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
        // Sort by start date descending (most recent first)
        return new Date(b.start_date) - new Date(a.start_date);
    });

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">
                            Work Experience Admin
                        </h1>
                        <button
                            onClick={() => {
                                setIsAdding(true);
                                setEditingWork(null);

                                // Scroll to top where the form will appear
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Add New Position
                        </button>
                    </div>

                    {/* Form */}
                    {(isAdding || editingWork !== null) && (
                        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                {isAdding ? 'Add New Work Experience' : 'Edit Work Experience'}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Job Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Full Stack Developer"
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Company *
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Tech Company Inc."
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={formData.start_date}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        End Date
                                        <span className="text-gray-500 text-xs ml-1">(Leave empty for current position)</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formData.end_date}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="4"
                                        placeholder="Describe your responsibilities, achievements, and technologies used..."
                                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    {isAdding ? 'Add Position' : 'Update Position'}
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

                    {/* Work Experience List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-white">
                            Work Experience ({workExperience.length})
                        </h2>

                        {sortedWorkExperience.map((work, index) => {
                            // Find original index for edit/delete operations
                            const originalIndex = workExperience.findIndex(w =>
                                w.title === work.title &&
                                w.company === work.company &&
                                w.start_date === work.start_date
                            );

                            return (
                                <div key={originalIndex} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-medium text-white">
                                                    {work.title}
                                                </h3>
                                                <span className="text-purple-400 font-medium">
                                                    @ {work.company}
                                                </span>
                                                {!work.end_date && (
                                                    <span className="bg-green-600 text-green-100 text-xs px-2 py-1 rounded-full font-medium">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-sm mb-2">
                                                📅 {formatDate(work.start_date)} - {formatDate(work.end_date)}
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                {work.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleEdit(originalIndex)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(originalIndex)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {workExperience.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-400">No work experience added yet.</p>
                                <p className="text-gray-500 text-sm mt-1">Click &quot;Add New Position&quot; to get started!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
