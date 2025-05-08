import cron from 'node-cron';
import {checkDueDates} from '../services/emailService.js';

// Configurar tarea cron para ejecutarse cada día a la medianoche
const setupEmailScheduler = () => {
  // Formato cron: segundos minutos horas díaDelMes mes díaDeLaSemana
  // '0 0 * * *' significa: "A las 00:00 todos los días"
  cron.schedule('0 0 * * *', async () => {
    console.log('Ejecutando verificación de fechas de vencimiento...');
    const sent = await checkDueDates();
    console.log(`Se enviaron ${sent} correos`);
  });

  console.log('Programador de correos configurado');
};

export default setupEmailScheduler;