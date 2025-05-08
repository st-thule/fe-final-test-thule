export const formatDate = (dateString: string): string => {
  if (!dateString) throw new Error('Invalid date');
  const date = new Date(dateString);
  if (isNaN(date.getTime())) throw new Error('Invalid date');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
