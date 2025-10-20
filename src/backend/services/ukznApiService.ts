import axios from 'axios';

class UkznApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.ukzn.ac.za'; // Replace with the actual UKZN API base URL
    }

    async authenticateUser(username: string, password: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/login`, {
                username,
                password
            });
            return response.data;
        } catch (error) {
            throw new Error('Authentication failed: ' + error.message);
        }
    }

    async getUserData(userId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve user data: ' + error.message);
        }
    }

    async getScriptsByUser(userId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/users/${userId}/scripts`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve scripts: ' + error.message);
        }
    }

    // Additional methods for interacting with the UKZN API can be added here
}

export default new UkznApiService();