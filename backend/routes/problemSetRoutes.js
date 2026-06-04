import express from 'express';
import { getProblems, getProblemById } from '../controllers/problemSetController.js';

const router = express.Router();

// Public routes - no auth needed
router.get('/', getProblems);
router.get('/:id', getProblemById);

export default router;