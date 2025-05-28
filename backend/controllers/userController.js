import User from "../models/User.js";
import {sendEmail} from "../services/emailService.js";
import Note from "../models/Note.js";
import Project from "../models/Project.js"; // Asegúrate de importar el modelo de Project

// Controlador para añadir usuarios (protegido por autenticación)
const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Crear y guardar el nuevo usuario
  const user = new User({ username, email, password });
  await user.save();

  res.status(201).json({ message: "Usuario añadido" });
};
// ✅ Nuevo controlador para obtener el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ id: user._id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos del usuario" });
  }
};

const sendEmailToUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Check if the user has any notes
    const userNotes = await Note.find({ userId: user._id });
    if (!userNotes.length) {
      return res.status(404).json({ msg: 'Usuario no tiene notas pendientes' });
    }

    // Get today's date without time component
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter notes that have reminder date matching today
    const emailPromises = userNotes
      .filter(note => {
        if (!note.reminderDate || note.isCompleted) return false;
        
        const reminderDate = new Date(note.reminderDate);
        reminderDate.setHours(0, 0, 0, 0);
        
        return reminderDate.getTime() === today.getTime();
      })
      .map(note => sendEmail(note));

    if (emailPromises.length === 0) {
      return res.json({ msg: 'No hay notas que requieran notificación hoy' });
    }

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(Boolean).length;

    if (successCount > 0) {
      res.json({ 
        msg: 'Correos enviados exitosamente',
        enviados: successCount,
        total: emailPromises.length 
      });
    } else {
      res.status(500).json({ msg: 'Error al enviar correos' });
    }
  } catch (err) {
    console.error('Error al enviar correo:', err);
    res.status(500).json({ msg: 'Error del servidor: ' + err.message });
  }
}

const fetchAllusers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export { addUser, getUserProfile, sendEmailToUser, fetchAllusers };
