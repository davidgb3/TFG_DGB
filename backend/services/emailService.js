import { transporter } from '../config/email.js';
import User from '../models/User.js';
import Note from '../models/Note.js';

// Función para enviar correo a un usuario
const sendEmail = async (note) => {
  try {
    // Obtener el usuario asociado a la nota
    const user = await User.findById(note.userId);
    if (!user) {
      console.error('Usuario no encontrado para la nota:', note._id);
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Recordatorio de fecha de vencimiento',
      html: `
        <h2>Hola ${user.username}</h2>
        <p>Te recordamos que tienes una nota "<strong>${note.title}</strong>" con fecha límite para el: 
           <strong>${new Date(note.dueDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })}</strong>
        </p>
        <p>Contenido de la nota:</p>
        <p style="white-space: pre-line;">${note.content.replace(/\n/g, '<br>')}</p>
        <p>Este es un correo automático, por favor no responder.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
    
    // Actualizar el estado de notificación en la nota
    await Note.findByIdAndUpdate(note._id, { notificationSent: true });
    
    return true;
  } catch (err) {
    console.error('Error al enviar correo:', err);
    return false;
  }
};

// Función para verificar notas con fechas próximas
const checkDueDates = async () => {
  try {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // Buscar notas con fecha de vencimiento en el día actual y que no hayan recibido notificación
    const notes = await Note.find({
      dueDate: {
        $gte: startOfDay,
        $lt: endOfDay
      },
      notificationSent: { $ne: true }, // No se ha enviado notificación
      isCompleted: false // Solo notas no completadas
    });

    console.log(`Se encontraron ${notes.length} notas con fechas de vencimiento para hoy`);
    
    let notificationsSent = 0;
    for (const note of notes) {
      const success = await sendEmail(note);
      if (success) notificationsSent++;
    }
    
    return notificationsSent;
  } catch (err) {
    console.error('Error al verificar fechas de vencimiento:', err);
    return 0;
  }
};

export { sendEmail, checkDueDates };