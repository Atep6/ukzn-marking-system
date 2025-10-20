import axios from 'axios';

export class AiService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async generateAnswer(question: string): Promise<string> {
        try {
            const response = await axios.post(`${this.apiUrl}/generate-answer`, { question });
            return response.data.answer;
        } catch (error) {
            throw new Error('Error generating answer: ' + error.message);
        }
    }
}