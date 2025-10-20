import { Request, Response } from 'express';
import { User } from '../models/user';
import { UkznApiService } from '../services/ukznApiService';

export class AuthController {
    private ukznApiService: UkznApiService;

    constructor() {
        this.ukznApiService = new UkznApiService();
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const userData = await this.ukznApiService.authenticateUser(username, password);
            if (userData) {
                const user = new User(userData);
                // Here you would typically create a session or a token
                res.status(200).json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'An error occurred during login', error });
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        // Logic for logging out the user, e.g., destroying the session or token
        res.status(200).json({ message: 'Logout successful' });
    }
}