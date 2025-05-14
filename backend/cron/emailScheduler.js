import cron from 'node-cron';
import {checkDueDates} from '../services/emailService.js';

const setupEmailScheduler = () => {
  // Ejecutar cada minuto para poder comprobar las horas exactas
  cron.schedule('* * * * *', async () => {
    console.log('Verificando fechas y horas de vencimiento...');
    const sent = await checkDueDates();
    if (sent > 0) {
      console.log(`Se enviaron ${sent} correos`);
    }
  });

  console.log('Programador de correos configurado');
};

export default setupEmailScheduler;