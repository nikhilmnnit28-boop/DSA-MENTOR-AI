import express from 'express';
import {
  getProblems,
  addProblem,
  updateProblem,
  deleteProblem,
  getStats,
} from '../controllers/problemController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getProblems);
router.post('/', authMiddleware, addProblem);
router.put('/:id', authMiddleware, updateProblem);
router.delete('/:id', authMiddleware, deleteProblem);
router.get('/stats', authMiddleware, getStats);

export default router;
