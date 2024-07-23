import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../../../server/projects.server';

interface Project {
    project_id: number;
    name: string;
    title: string;
    technologies: string;
}

const Test: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projects = await fetchProjects();
                setProjects(projects);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.project_id}>
                        <h2>{project.name}</h2>
                        <p>{project.title}</p>
                        <p>Technologies: {project.technologies}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Test;