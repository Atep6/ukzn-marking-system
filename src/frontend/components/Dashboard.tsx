import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import SyncStatus from './SyncStatus';
import MarkingEditor from './MarkingEditor';

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="dashboard">
            <h1>Welcome, {user.name}</h1>
            <SyncStatus />
            <MarkingEditor />
        </div>
    );
};

export default Dashboard;