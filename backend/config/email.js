import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const verifyEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('Servidor de correo listo para enviar mensajes');
        return true;
    } catch (err) {
        console.error('Error al configurar el servidor de correo:', err);
        return false;
    }
};

export { transporter, verifyEmailConfig };