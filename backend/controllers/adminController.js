
const editUser = async (req, res) => {
    const { id, username, email, role } = req.body;
    
    try {
        // Verificar si el usuario existe
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos del usuario
        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();
        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};

export { editUser };