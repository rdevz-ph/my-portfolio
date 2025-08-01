import fs from 'fs';
import path from 'path';

const skillsPath = path.join(process.cwd(), 'data', 'skills.json');

export default function handler(req, res) {
    // Only allow in development mode
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'Skills API not available in production' });
    }

    try {
        switch (req.method) {
            case 'GET':
                return getSkills(req, res);
            case 'POST':
                return addSkills(req, res);
            case 'PUT':
                return updateSkill(req, res);
            case 'DELETE':
                return deleteSkill(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Skills API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function getSkills(req, res) {
    try {
        const fileContent = fs.readFileSync(skillsPath, 'utf8');
        const skills = JSON.parse(fileContent);
        return res.status(200).json(skills);
    } catch (error) {
        console.error('Error reading skills file:', error);
        return res.status(500).json({ error: 'Failed to read skills' });
    }
}

function addSkills(req, res) {
    try {
        const { skill, skills: bulkSkills } = req.body;

        // Read current skills
        const fileContent = fs.readFileSync(skillsPath, 'utf8');
        const currentSkills = JSON.parse(fileContent);

        let newSkills = [];

        if (skill) {
            // Single skill addition
            if (!skill || typeof skill !== 'string' || !skill.trim()) {
                return res.status(400).json({ error: 'Valid skill name is required' });
            }

            const trimmedSkill = skill.trim();

            // Check for duplicates (case insensitive)
            if (currentSkills.some(s => s.toLowerCase() === trimmedSkill.toLowerCase())) {
                return res.status(400).json({ error: 'Skill already exists' });
            }

            newSkills = [trimmedSkill];
        } else if (bulkSkills && Array.isArray(bulkSkills)) {
            // Bulk skills addition
            newSkills = bulkSkills
                .filter(s => s && typeof s === 'string' && s.trim())
                .map(s => s.trim())
                .filter(s => !currentSkills.some(existing =>
                    existing.toLowerCase() === s.toLowerCase()
                ));
        } else {
            return res.status(400).json({ error: 'Valid skill or skills array is required' });
        }

        if (newSkills.length === 0) {
            return res.status(400).json({ error: 'No new skills to add' });
        }

        // Add new skills
        const updatedSkills = [...currentSkills, ...newSkills];

        // Write back to file
        fs.writeFileSync(skillsPath, JSON.stringify(updatedSkills, null, 4));

        return res.status(201).json(updatedSkills);
    } catch (error) {
        console.error('Error adding skills:', error);
        return res.status(500).json({ error: 'Failed to add skills' });
    }
}

function updateSkill(req, res) {
    try {
        const { index, skill } = req.body;

        if (index === undefined || index < 0) {
            return res.status(400).json({ error: 'Valid index is required' });
        }

        if (!skill || typeof skill !== 'string' || !skill.trim()) {
            return res.status(400).json({ error: 'Valid skill name is required' });
        }

        // Read current skills
        const fileContent = fs.readFileSync(skillsPath, 'utf8');
        const skills = JSON.parse(fileContent);

        if (index >= skills.length) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        const trimmedSkill = skill.trim();

        // Check for duplicates (excluding current skill)
        if (skills.some((s, i) => i !== index && s.toLowerCase() === trimmedSkill.toLowerCase())) {
            return res.status(400).json({ error: 'Skill already exists' });
        }

        // Update the skill
        skills[index] = trimmedSkill;

        // Write back to file
        fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 4));

        return res.status(200).json(skills);
    } catch (error) {
        console.error('Error updating skill:', error);
        return res.status(500).json({ error: 'Failed to update skill' });
    }
}

function deleteSkill(req, res) {
    try {
        const { index } = req.body;

        if (index === undefined || index < 0) {
            return res.status(400).json({ error: 'Valid index is required' });
        }

        // Read current skills
        const fileContent = fs.readFileSync(skillsPath, 'utf8');
        const skills = JSON.parse(fileContent);

        if (index >= skills.length) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        // Remove the skill
        skills.splice(index, 1);

        // Write back to file
        fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 4));

        return res.status(200).json(skills);
    } catch (error) {
        console.error('Error deleting skill:', error);
        return res.status(500).json({ error: 'Failed to delete skill' });
    }
}
