import User from '../models/User.js';
import mongoose from 'mongoose';

const editUser = async (req, res) => {
    const { username, email, role } = req.body;
    const { id } = req.params;
    
    try {
        // Validar que el id existe y es válido
        if (!id) {
            return res.status(400).json({ message: "ID de usuario no proporcionado" });
        }

        // Validar que el id tiene el formato correcto de ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID de usuario inválido" });
        }

        // Verificar si el usuario existe
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Validar campos requeridos
        if (!username && !email && !role) {
            return res.status(400).json({ message: "No se proporcionaron datos para actualizar" });
        }

        // Actualizar los campos del usuario
        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ 
            message: "Usuario actualizado exitosamente",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ 
            message: "Error al actualizar el usuario",
            error: error.message 
        });
    }
};

export { editUser };