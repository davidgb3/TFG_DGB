import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
    if (!req.userId) {
        return res.status(401).json({ message: "No autenticado" });
    }

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({ 
                message: "Acceso denegado - Se requieren permisos de administrador" 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error en adminMiddleware:', error);
        res.status(500).json({ message: "Error al verificar permisos de administrador" });
    }
};

export default adminMiddleware;