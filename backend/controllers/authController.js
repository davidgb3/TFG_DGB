import jwt from "jsonwebtoken";
import User from "../models/User.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en la base de datos
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Generar un token JWT
  //Se genera un token JWT que contiene el ID del usuario (userId) y expira en 1 hora.
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1day", // El token expirará en 1 día
  });

  // Enviar el token en una cookie HttpOnly
  /*
  - httpOnly: true: La cookie no puede ser accedida por JavaScript en el frontend, lo que la hace segura contra ataques XSS.

  - secure: true: La cookie solo se envía sobre conexiones HTTPS (en producción).

  - maxAge: 3600000: La cookie expira en 1 hora (3600000 milisegundos).

  - sameSite: 'strict': La cookie solo se envía en solicitudes del mismo sitio, lo que previene ataques CSRF.
  */
  res.cookie("token", token, {
    httpOnly: true, // La cookie solo es accesible por el servidor
    secure: process.env.NODE_ENV === "production", // Solo enviar sobre HTTPS en producción
    maxAge: 24 * 60 * 60 * 1000, // Tiempo de expiración (1 dia)
    sameSite: "strict", // Prevenir ataques CSRF
  });

  res.json({ message: "Inicio de sesión exitoso", user: user.username });
};
// Controlador para el registro de usuarios
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.username === username 
          ? "El usuario ya existe" 
          : "El email ya está registrado" 
      });
    }

    // Si se está intentando crear un admin, verificar que quien lo crea es admin
    if (role === 'admin') {
      // Verificar si la solicitud viene de un admin (usando el token)
      if (!req.userId) {
        return res.status(403).json({ 
          message: "No tienes permisos para crear usuarios administradores" 
        });
      }
      
      const requestingUser = await User.findById(req.userId);
      if (!requestingUser || requestingUser.role !== 'admin') {
        return res.status(403).json({ 
          message: "Solo los administradores pueden crear otros administradores" 
        });
      }
    }

    // Crear y guardar el nuevo usuario
    const user = new User({ 
      username, 
      email, 
      password,
      role: role || 'user' // Si no se especifica rol, será usuario normal
    });
    
    await user.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

const editProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.params.id;

  // Verificar si el usuario existe
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // Actualizar los datos del usuario
  user.username = username || user.username;
  user.email = email || user.email;
  if (password) {
    user.password = password; // Aquí deberías hashear la contraseña antes de guardar
  }
  await user.save();

  res.json({ message: "Perfil actualizado", user });
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // ✅ La cookie expira inmediatamente
  });
  res.json({ message: "Sesión cerrada exitosamente" });
};

// Exportar las funciones
export { login, logout, register, editProfile };
