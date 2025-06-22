import express from 'express';
import {
  saveResume,
  getResumeById,
  getAISuggestions,
} from '../controllers/resumesController.js';

const router = express.Router();

router.post('/', saveResume);
router.get('/:id', getResumeById);
router.post('/:id/suggestions', getAISuggestions);

export default router;
