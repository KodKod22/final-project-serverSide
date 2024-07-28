// import { getApp } from '../server/main.js';
// import { addSoldier } from '../controllers/soldier_controller.js';
// const app = getApp();
// export const soldier_router = app.post('/addSoldier', addSoldier);
import express from 'express';
import { addSoldier } from '../controllers/soldier_controller.js';

const router = express.Router();
router.post('/addSoldier', addSoldier);

export default router;
