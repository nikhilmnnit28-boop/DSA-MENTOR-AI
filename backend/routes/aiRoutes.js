import express from 'express';
import {
  explainConcept,
  getRecommendations,
} from '../controllers/aiController.js';

const router = express.Router();

// Public routes - no auth needed
router.post('/explain', explainConcept);
router.post('/recommend', getRecommendations);

export default router;