import axios from 'axios';

const AI_API_URL = 'https://api.example.com/generate-answer'; // Replace with actual AI API URL

export const generateAnswer = async (question: string): Promise<string> => {
    try {
        const response = await axios.post(AI_API_URL, { question });
        return response.data.answer;
    } catch (error) {
        console.error('Error generating answer:', error);
        throw new Error('Failed to generate answer');
    }
};