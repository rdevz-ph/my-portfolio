import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function SkillsAdmin() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [editingSkill, setEditingSkill] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [loading, setLoading] = useState(true);

    // Load skills on component mount
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

        // Check for duplicates (case insensitive)
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

        // Check for duplicates (excluding current skill)
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
                    style="width: 100%; margin: 10px 0;"
                ></textarea>
                <p style="font-size: 12px; color: #666; margin-top: 10px;">
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
            <div className="min-h-screen bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                            <span className="ml-3 text-gray-400">Loading skills...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">
                            Skills Admin
                        </h1>
                        <div className="flex gap-2">
                            <button
                                onClick={handleBulkAdd}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                            >
                                Bulk Add
                            </button>
                        </div>
                    </div>

                    {/* Add New Skill Form */}
                    <form onSubmit={handleAddSkill} className="bg-gray-900 p-4 rounded-lg mb-6">
                        <h2 className="text-lg font-semibold text-white mb-3">Add New Skill</h2>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Enter skill name (e.g., React, Python, etc.)"
                                className="flex-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Add Skill
                            </button>
                        </div>
                    </form>

                    {/* Skills List */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Technical Skills ({skills.length})
                        </h2>

                        {skills.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-400">No skills added yet.</p>
                                <p className="text-gray-500 text-sm mt-1">Add your first skill above!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {skills.map((skill, index) => (
                                    <div key={index} className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                                        {editingSkill === index ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="flex-1 px-2 py-1 text-sm border border-gray-600 rounded bg-gray-800 text-white focus:ring-1 focus:ring-purple-500"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleEditSkill(index)}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <span className="text-white font-medium">{skill}</span>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => startEditing(index, skill)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSkill(index)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {skills.length > 0 && (
                        <div className="mt-6 p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-700">
                            <h3 className="text-blue-300 font-medium mb-2">💡 Quick Tips:</h3>
                            <ul className="text-blue-200 text-sm space-y-1">
                                <li>• Use &quot;Bulk Add&quot; to quickly add multiple skills at once</li>
                                <li>• Skills are automatically sorted and displayed in your portfolio</li>
                                <li>• Click &quot;Edit&quot; to rename any skill inline</li>
                                <li>• Duplicate skills are automatically prevented</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
