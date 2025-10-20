import { AsyncStorage } from 'react-native';

const OFFLINE_DATA_KEY = 'offlineData';

export const saveDataOffline = async (data: any) => {
    try {
        const existingData = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        const updatedData = existingData ? JSON.parse(existingData) : [];
        updatedData.push(data);
        await AsyncStorage.setItem(OFFLINE_DATA_KEY, JSON.stringify(updatedData));
    } catch (error) {
        console.error('Error saving data offline:', error);
    }
};

export const getOfflineData = async () => {
    try {
        const data = await AsyncStorage.getItem(OFFLINE_DATA_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error retrieving offline data:', error);
        return [];
    }
};

export const clearOfflineData = async () => {
    try {
        await AsyncStorage.removeItem(OFFLINE_DATA_KEY);
    } catch (error) {
        console.error('Error clearing offline data:', error);
    }
};

export const syncOfflineData = async (syncFunction: (data: any) => Promise<void>) => {
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
        for (const data of offlineData) {
            await syncFunction(data);
        }
        await clearOfflineData();
    }
};