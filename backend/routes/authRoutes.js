import express from "express";
import { login, logout, register, editProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Rutas de autenticación
router.post("/login", login);
router.post("/register", register);
router.put("/editProfile/:id", authMiddleware, editProfile)
router.post("/logout", logout);

router.get("/check-auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ 
      message: "Autenticado", 
      userId: req.userId,
      user: user.username 
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del usuario" });
  }
});

export default router;
