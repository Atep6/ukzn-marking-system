import React, { useEffect, useState } from 'react';
import { fetchStudentScripts } from '../services/ukznApi';
import { Script } from '../types';

const Student: React.FC = () => {
    const [scripts, setScripts] = useState<Script[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadScripts = async () => {
            try {
                const fetchedScripts = await fetchStudentScripts();
                setScripts(fetchedScripts);
            } catch (err) {
                setError('Failed to load scripts');
            } finally {
                setLoading(false);
            }
        };

        loadScripts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Your Scripts</h1>
            <ul>
                {scripts.map(script => (
                    <li key={script.id}>
                        <h2>{script.title}</h2>
                        <p>{script.content}</p>
                        <p>Grade: {script.grade}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Student;