export const formatTimeAgo = (createdAt: string): string => {
  const postDate = new Date(createdAt);
  const now = new Date();
  /* getTime devuelve la diferencia en milisegundo, al dividirla por 1000 la pasamos a segungos */
  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  let interval = seconds / 31536000; // Segundos en un año

  if (interval > 1) {
    return `hace ${Math.floor(interval)} año${Math.floor(interval) > 1 ? 's' : ''}`;
  }
  interval = seconds / 2592000; // Segundos en un mes
  if (interval > 1) {
    return `hace ${Math.floor(interval)} mes${Math.floor(interval) > 1 ? 'es' : ''}`;
  }
  interval = seconds / 86400; // Segundos en un día
  if (interval > 1) {
    return `hace ${Math.floor(interval)} día${Math.floor(interval) > 1 ? 's' : ''}`;
  }
  interval = seconds / 3600; // Segundos en una hora
  if (interval > 1) {
    return `hace ${Math.floor(interval)} hora${Math.floor(interval) > 1 ? 's' : ''}`;
  }
  interval = seconds / 60; // Segundos en un minuto
  if (interval > 1) {
    return `hace ${Math.floor(interval)} minuto${Math.floor(interval) > 1 ? 's' : ''}`;
  }
  return `hace unos segundos`;
};