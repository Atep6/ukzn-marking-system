import { useEffect, useState } from 'react';

const useOfflineSync = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [syncStatus, setSyncStatus] = useState('Idle');

    const syncData = async () => {
        setSyncStatus('Syncing...');
        try {
            // Logic to sync offline data with the server
            // This could involve fetching local data and sending it to the backend
            // and then updating the local state based on the response
            // Example: await syncService.syncOfflineData();
            setSyncStatus('Sync successful');
        } catch (error) {
            setSyncStatus('Sync failed');
        }
    };

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            syncData();
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return { isOnline, syncStatus };
};

export default useOfflineSync;