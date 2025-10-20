import React, { useState, useEffect } from 'react';
import { fetchScripts, submitGrades } from '../services/ukznApi';
import { useOfflineSync } from '../hooks/useOfflineSync';

const MarkingEditor = () => {
    const [scripts, setScripts] = useState([]);
    const [grades, setGrades] = useState({});
    const { syncOfflineData } = useOfflineSync();

    useEffect(() => {
        const loadScripts = async () => {
            const fetchedScripts = await fetchScripts();
            setScripts(fetchedScripts);
        };
        loadScripts();
    }, []);

    const handleGradeChange = (scriptId, grade) => {
        setGrades({
            ...grades,
            [scriptId]: grade,
        });
    };

    const handleSubmit = async () => {
        await submitGrades(grades);
        syncOfflineData();
    };

    return (
        <div>
            <h1>Marking Editor</h1>
            {scripts.map(script => (
                <div key={script.id}>
                    <h2>{script.title}</h2>
                    <textarea
                        placeholder="Enter comments"
                        rows={4}
                    />
                    <input
                        type="number"
                        placeholder="Enter grade"
                        value={grades[script.id] || ''}
                        onChange={(e) => handleGradeChange(script.id, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Grades</button>
        </div>
    );
};

export default MarkingEditor;