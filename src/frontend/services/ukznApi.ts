import axios from 'axios';

const UKZN_API_BASE_URL = 'https://api.ukzn.ac.za'; // Replace with the actual UKZN API base URL

export const fetchUserData = async (userId) => {
    try {
        const response = await axios.get(`${UKZN_API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user data: ' + error.message);
    }
};

export const fetchScripts = async (studentId) => {
    try {
        const response = await axios.get(`${UKZN_API_BASE_URL}/students/${studentId}/scripts`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching scripts: ' + error.message);
    }
};

export const submitMarks = async (scriptId, marks) => {
    try {
        const response = await axios.post(`${UKZN_API_BASE_URL}/scripts/${scriptId}/marks`, { marks });
        return response.data;
    } catch (error) {
        throw new Error('Error submitting marks: ' + error.message);
    }
};