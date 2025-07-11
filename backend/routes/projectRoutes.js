import express from 'express';
const router = express.Router();

import { createProject, getProjects, getProjectNotes, shareProject, editProject, aviableUsers, changeProjectState, deleteProject } from '../controllers/projectController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

// Rutas para proyectos
router.post('/create', authMiddleware, adminMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.get('/:id', authMiddleware, getProjectNotes);
router.put('/invite_users', authMiddleware, adminMiddleware, shareProject)
router.put('/edit/:id', authMiddleware, adminMiddleware, editProject);
router.get('/available_users/:projectId', authMiddleware, adminMiddleware, aviableUsers);
router.patch('/update_state/:id', authMiddleware, adminMiddleware, changeProjectState);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteProject);

export default router;