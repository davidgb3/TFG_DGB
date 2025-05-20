import express from 'express';
const router = express.Router();

import { createProject, getProjects, getProjectNotes } from '../controllers/projectController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

// Rutas para proyectos
router.post('/create', authMiddleware, adminMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.get('/:id/notes', authMiddleware, getProjectNotes);

export default router;