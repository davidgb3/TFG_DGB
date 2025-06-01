import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const createDefaultAdmin = async () => {
    try {
        // Buscar si ya existe un admin con este email O username
        const adminExists = await User.findOne({ 
            $or: [
                { email: 'gbdapps50@gmail.com' },
                { username: 'Admin' }
            ]
        });
        
        if (!adminExists) {
            // Crear el usuario admin
            const adminUser = new User({
                username: 'Admin',
                email: 'gbdapps50@gmail.com',
                password: 'admin12345', // El hash se hará automáticamente por el middleware
                role: 'admin'
            });

            // Guardar en la base de datos
            await adminUser.save();
            console.log('Usuario administrador creado con éxito');
        } else {
            console.log('El usuario administrador ya existe');
        }
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    }
};

export default createDefaultAdmin;