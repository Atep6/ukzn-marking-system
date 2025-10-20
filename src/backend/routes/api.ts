import { Router } from 'express';
import AuthController from '../controllers/authController';
import MarkingController from '../controllers/markingController';
import SyncController from '../controllers/syncController';

const router = Router();

// Authentication routes
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

// Marking routes
router.post('/mark-script', MarkingController.markScript);
router.get('/get-marked-scripts', MarkingController.getMarkedScripts);

// Synchronization routes
router.post('/sync-data', SyncController.syncData);
router.get('/sync-status', SyncController.getSyncStatus);

export default router;