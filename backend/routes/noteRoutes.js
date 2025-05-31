import express from "express";
import { createNote, deleteNote, getNotesByUser, markAsImportant, updateNote, updateNoteState } from "../controllers/noteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createNote);
router.get("/myNotes", authMiddleware, getNotesByUser); // Obtener notas por usuario
router.put("/update/:id", authMiddleware, updateNote); // Actualizar nota por ID
router.patch("/updateState/:id", authMiddleware, updateNoteState); // Actualizar estado de la nota por ID
router.put("/markAsImportant/:id", authMiddleware, markAsImportant); // Marcar nota como importante por ID
router.delete("/delete/:id", authMiddleware, deleteNote); // Eliminar nota por ID

export default router;