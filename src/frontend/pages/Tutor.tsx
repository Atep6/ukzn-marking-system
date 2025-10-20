import React from 'react';
import { useSelector } from 'react-redux';
import MarkingEditor from '../components/MarkingEditor';
import SyncStatus from '../components/SyncStatus';

const Tutor: React.FC = () => {
    const tutorData = useSelector((state: any) => state.tutor);

    return (
        <div>
            <h1>Tutor Dashboard</h1>
            <h2>Welcome, {tutorData.name}</h2>
            <MarkingEditor />
            <SyncStatus />
        </div>
    );
};

export default Tutor;