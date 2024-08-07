export const formatedDate = (date : string) => {
  // Convertir la cadena de fecha a un objeto Date
  const newDate = new Date(date);

  // Formatear la fecha
  const formattedDate = newDate.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  return formattedDate
}