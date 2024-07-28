import express from 'express';
import { addSoldier } from '../controllers/soldier_controller.js';

const router = express.Router();
router.post('/addSoldier', addSoldier);

export default router;
