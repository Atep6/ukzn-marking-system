import React from 'react';

const SyncStatus: React.FC<{ isSyncing: boolean; lastSync: Date | null }> = ({ isSyncing, lastSync }) => {
    return (
        <div className="sync-status">
            {isSyncing ? (
                <p>Synchronizing data...</p>
            ) : (
                <p>Last synchronized: {lastSync ? lastSync.toLocaleString() : 'Never'}</p>
            )}
        </div>
    );
};

export default SyncStatus;