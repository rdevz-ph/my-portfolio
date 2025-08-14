import fs from 'fs';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'data', 'settings.json');

export default function handler(req, res) {
    // Only allow in development mode
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'Settings API not available in production' });
    }

    try {
        switch (req.method) {
            case 'GET':
                return getSettings(req, res);
            case 'PUT':
                return updateSettings(req, res);
            default:
                res.setHeader('Allow', ['GET', 'PUT']);
                return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Settings API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function getSettings(req, res) {
    try {
        const fileContent = fs.readFileSync(settingsPath, 'utf8');
        const settings = JSON.parse(fileContent);
        return res.status(200).json(settings);
    } catch (error) {
        console.error('Error reading settings file:', error);
        return res.status(500).json({ error: 'Failed to read settings' });
    }
}

function updateSettings(req, res) {
    try {
        const newSettings = req.body;

        // Validate required fields
        const requiredFields = ['full_name', 'position', 'description'];
        for (const field of requiredFields) {
            if (!newSettings[field] || newSettings[field].trim() === '') {
                return res.status(400).json({ error: `${field} is required` });
            }
        }

        // Validate numeric fields
        const numericFields = ['years_of_experience', 'visitor_count', 'client_count'];
        for (const field of numericFields) {
            if (newSettings[field] !== undefined) {
                const value = parseInt(newSettings[field]);
                if (isNaN(value) || value < 0) {
                    return res.status(400).json({ error: `${field} must be a non-negative number` });
                }
                newSettings[field] = value;
            }
        }

        // Clean up string fields
        newSettings.full_name = newSettings.full_name.trim();
        newSettings.position = newSettings.position.trim();
        newSettings.description = newSettings.description.trim();

        if (newSettings.system_logo) {
            newSettings.system_logo = newSettings.system_logo.trim();
        }

        if (newSettings.system_cv_path) {
            newSettings.system_cv_path = newSettings.system_cv_path.trim();
        }

        // Write the updated settings
        fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 4));

        return res.status(200).json(newSettings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return res.status(500).json({ error: 'Failed to update settings' });
    }
}
