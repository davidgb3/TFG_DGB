import { transporter } from '../config/email.js';
import User from '../models/User.js';
import Note from '../models/Note.js';

const sendEmail = async (note) => {
  try {
    const user = await User.findById(note.userId);
    if (!user) {
      console.error('Usuario no encontrado para la nota:', note._id);
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Recordatorio de nota',
      html: `
        <h2>Hola ${user.username}</h2>
        <p>Te recordamos que tienes una nota "<strong>${note.title}</strong>" con fecha límite para el: 
           <strong>${new Date(new Date(note.dueDate).getTime() + 2 * 60 * 60 * 1000).toLocaleString('es-ES', {
             year: 'numeric',
             month: '2-digit',
             day: '2-digit',
             hour: '2-digit',
             minute: '2-digit',
           })}</strong>
        </p>
        <p>Contenido de la nota:</p>
        <p style="white-space: pre-line;">${note.content.replace(/\n/g, '<br>')}</p>
        <p>Este es un correo automático, por favor no responder.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
    return true;
  } catch (err) {
    console.error('Error al enviar correo:', err);
    return false;
  }
};

const checkDueDates = async () => {
  try {
    const now = new Date();
    const startMinute = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(), // Ajuste para CEST
      now.getMinutes()
    );
    
    const endMinute = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(), // Ajuste para CEST
      now.getMinutes() + 1
    );

    const notes = await Note.find({
      reminderDate: {
        $gte: startMinute,
        $lt: endMinute
      },
      notificationSent: { $ne: true },
      isCompleted: false
    });

    console.log(`Se encontraron ${notes.length} notas para notificar en este minuto`);
    
    let notificationsSent = 0;
    for (const note of notes) {
      console.log('Nota encontrada:', {
        id: note._id,
        title: note.title,
        reminderDate: note.reminderDate,
        horaActual: now
      });
      
      const success = await sendEmail(note);
      if (success) {
        notificationsSent++;
        await Note.findByIdAndUpdate(note._id, { notificationSent: true });
      }
    }
    
    return notificationsSent;
  } catch (err) {
    console.error('Error al verificar fechas de vencimiento:', err);
    return 0;
  }
};

export { sendEmail, checkDueDates };