import express from "express";
import { createNote, getNotesByUser, updateNote, updateNoteState } from "../controllers/noteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createNote);
router.get("/myNotes", authMiddleware, getNotesByUser); // Obtener notas por usuario
router.put("/update/:id", authMiddleware, updateNote); // Actualizar nota por ID
router.put("/updateState/:id", authMiddleware, updateNoteState); // Actualizar estado de la nota por ID

export default router;