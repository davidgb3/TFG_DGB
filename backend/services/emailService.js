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
           <strong>${new Date(note.dueDate).toLocaleString('es-ES', {
             year: 'numeric',
             month: '2-digit',
             day: '2-digit',
             hour: '2-digit',
             minute: '2-digit'
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
    // Ajustar a CEST (UTC+2)
    const cestOffset = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
    const now = new Date();
    const nowCEST = new Date(now.getTime() + cestOffset);

    console.log('Hora actual CEST:', nowCEST);

    // Buscar notas con reminderDate que coincida con la hora actual
    const notes = await Note.find({
      reminderDate: {
        // Comparar año, mes, día, hora y minuto
        $gte: new Date(
          nowCEST.getFullYear(),
          nowCEST.getMonth(),
          nowCEST.getDate(),
          nowCEST.getHours(),
          nowCEST.getMinutes()
        ),
        $lt: new Date(
          nowCEST.getFullYear(),
          nowCEST.getMonth(),
          nowCEST.getDate(),
          nowCEST.getHours(),
          nowCEST.getMinutes() + 1
        )
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
        horaActual: nowCEST
      });
      
      const success = await sendEmail(note);
      if (success) {
        notificationsSent++;
        // Marcar la notificación como enviada
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