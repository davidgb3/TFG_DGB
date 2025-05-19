
export const formatDateInCEST = (date) => {
    return new Date(date).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
};
