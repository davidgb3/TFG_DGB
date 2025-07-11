import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { verifyEmailConfig } from "./config/email.js";
import setupEmailScheduler from "./cron/emailScheduler.js";
import adminRoutes from "./routes/adminRoutes.js"; // Asegúrate de importar las rutas de administración
import createDefaultAdmin from "./helpers/AdminCreation.js";

const app = express();

// Configuración de CORS (Express maneja CORS, no Nginx)
const allowedOrigins = [
  "http://localhost:5174",
  "https://nimbusnotes.up.railway.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true, // Permitir cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Conectar a MongoDB
connectDB();
createDefaultAdmin(); // Crear el usuario administrador por defecto
await verifyEmailConfig(); // Verificar la configuración de correo

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes); // Asegúrate de importar y usar las rutas de notas
app.use("/api/projects", projectRoutes); // Asegúrate de importar y usar las rutas de proyectos
app.use("/api/admin", adminRoutes); // Asegúrate de importar y usar las rutas de administración

setupEmailScheduler(); // Configurar el programador de correos electrónicos

export default app;
