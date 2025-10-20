import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
        throw new Error('Logout failed. Please try again.');
    }
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const clearCurrentUser = () => {
    localStorage.removeItem('user');
};