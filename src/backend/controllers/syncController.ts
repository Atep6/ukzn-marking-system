import { Request, Response } from 'express';
import { SyncService } from '../services/syncService';

export class SyncController {
    private syncService: SyncService;

    constructor() {
        this.syncService = new SyncService();
    }

    public async syncData(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.syncService.syncData(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Synchronization failed', error });
        }
    }

    public async getSyncStatus(req: Request, res: Response): Promise<void> {
        try {
            const status = await this.syncService.getSyncStatus();
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve sync status', error });
        }
    }
}