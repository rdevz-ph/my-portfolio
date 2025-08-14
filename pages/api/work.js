import fs from 'fs';
import path from 'path';

const workPath = path.join(process.cwd(), 'data', 'work.json');

export default function handler(req, res) {
    // Only allow in development mode
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'Work API not available in production' });
    }

    try {
        switch (req.method) {
            case 'GET':
                return getWorkExperience(req, res);
            case 'POST':
                return addWorkExperience(req, res);
            case 'PUT':
                return updateWorkExperience(req, res);
            case 'DELETE':
                return deleteWorkExperience(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Work API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function getWorkExperience(req, res) {
    try {
        const fileContent = fs.readFileSync(workPath, 'utf8');
        const workExperience = JSON.parse(fileContent);
        return res.status(200).json(workExperience);
    } catch (error) {
        console.error('Error reading work file:', error);
        return res.status(500).json({ error: 'Failed to read work experience' });
    }
}

function addWorkExperience(req, res) {
    try {
        const newWork = req.body;

        // Validate required fields
        if (!newWork.title || !newWork.company || !newWork.start_date || !newWork.description) {
            return res.status(400).json({ error: 'Title, company, start date, and description are required' });
        }

        // Validate date format
        if (!isValidDate(newWork.start_date)) {
            return res.status(400).json({ error: 'Invalid start date format' });
        }

        if (newWork.end_date && !isValidDate(newWork.end_date)) {
            return res.status(400).json({ error: 'Invalid end date format' });
        }

        // Clean up the data
        const cleanWork = {
            title: newWork.title.trim(),
            company: newWork.company.trim(),
            start_date: newWork.start_date,
            end_date: newWork.end_date || null,
            description: newWork.description.trim()
        };

        // Read current work experience
        const fileContent = fs.readFileSync(workPath, 'utf8');
        const workExperience = JSON.parse(fileContent);

        // Add new work experience
        workExperience.push(cleanWork);

        // Write back to file
        fs.writeFileSync(workPath, JSON.stringify(workExperience, null, 4));

        return res.status(201).json(workExperience);
    } catch (error) {
        console.error('Error adding work experience:', error);
        return res.status(500).json({ error: 'Failed to add work experience' });
    }
}

function updateWorkExperience(req, res) {
    try {
        const { index, ...updatedWork } = req.body;

        if (index === undefined || index < 0) {
            return res.status(400).json({ error: 'Valid index is required' });
        }

        // Validate required fields
        if (!updatedWork.title || !updatedWork.company || !updatedWork.start_date || !updatedWork.description) {
            return res.status(400).json({ error: 'Title, company, start date, and description are required' });
        }

        // Validate date format
        if (!isValidDate(updatedWork.start_date)) {
            return res.status(400).json({ error: 'Invalid start date format' });
        }

        if (updatedWork.end_date && !isValidDate(updatedWork.end_date)) {
            return res.status(400).json({ error: 'Invalid end date format' });
        }

        // Read current work experience
        const fileContent = fs.readFileSync(workPath, 'utf8');
        const workExperience = JSON.parse(fileContent);

        if (index >= workExperience.length) {
            return res.status(404).json({ error: 'Work experience not found' });
        }

        // Clean up the data
        const cleanWork = {
            title: updatedWork.title.trim(),
            company: updatedWork.company.trim(),
            start_date: updatedWork.start_date,
            end_date: updatedWork.end_date || null,
            description: updatedWork.description.trim()
        };

        // Update the work experience
        workExperience[index] = cleanWork;

        // Write back to file
        fs.writeFileSync(workPath, JSON.stringify(workExperience, null, 4));

        return res.status(200).json(workExperience);
    } catch (error) {
        console.error('Error updating work experience:', error);
        return res.status(500).json({ error: 'Failed to update work experience' });
    }
}

function deleteWorkExperience(req, res) {
    try {
        const { index } = req.body;

        if (index === undefined || index < 0) {
            return res.status(400).json({ error: 'Valid index is required' });
        }

        // Read current work experience
        const fileContent = fs.readFileSync(workPath, 'utf8');
        const workExperience = JSON.parse(fileContent);

        if (index >= workExperience.length) {
            return res.status(404).json({ error: 'Work experience not found' });
        }

        // Remove the work experience
        workExperience.splice(index, 1);

        // Write back to file
        fs.writeFileSync(workPath, JSON.stringify(workExperience, null, 4));

        return res.status(200).json(workExperience);
    } catch (error) {
        console.error('Error deleting work experience:', error);
        return res.status(500).json({ error: 'Failed to delete work experience' });
    }
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.match(/^\d{4}-\d{2}-\d{2}$/);
}
