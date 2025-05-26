import express from "express";
import { addUser, fetchAllusers, getUserProfile, sendEmailToUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ruta para añadir usuarios (protegida por autenticación)
router.post("/", addUser);
router.post("/:id/sendEmail", sendEmailToUser);

// ✅ Nueva ruta para obtener información del usuario autenticado
router.get("/me", authMiddleware, getUserProfile);

router.post("/getUsers", authMiddleware, fetchAllusers);

export default router;
