import fs from 'fs';
import path from 'path';

const projectsPath = path.join(process.cwd(), 'data', 'projects.json');

export default function handler(req, res) {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: 'Not allowed in production' });
    }

    switch (req.method) {
        case 'GET':
            try {
                const data = fs.readFileSync(projectsPath, 'utf-8');
                const projects = JSON.parse(data);
                res.status(200).json(projects);
            } catch (error) {
                res.status(500).json({ message: 'Error reading projects file' });
            }
            break;

        case 'POST':
            try {
                const data = fs.readFileSync(projectsPath, 'utf-8');
                const projects = JSON.parse(data);

                // Add new project
                const newProject = req.body;
                projects.push(newProject);

                fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 4));
                res.status(200).json({ message: 'Project added successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error adding project' });
            }
            break;

        case 'PUT':
            try {
                const data = fs.readFileSync(projectsPath, 'utf-8');
                const projects = JSON.parse(data);

                // Update existing project
                const { index, ...projectData } = req.body;
                if (index >= 0 && index < projects.length) {
                    projects[index] = projectData;
                    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 4));
                    res.status(200).json({ message: 'Project updated successfully' });
                } else {
                    res.status(400).json({ message: 'Invalid project index' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Error updating project' });
            }
            break;

        case 'DELETE':
            try {
                const data = fs.readFileSync(projectsPath, 'utf-8');
                const projects = JSON.parse(data);

                // Delete project
                const { index } = req.body;
                if (index >= 0 && index < projects.length) {
                    projects.splice(index, 1);
                    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 4));
                    res.status(200).json({ message: 'Project deleted successfully' });
                } else {
                    res.status(400).json({ message: 'Invalid project index' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Error deleting project' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
