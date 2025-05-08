export const isPastDate = (value: string): true | string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return 'Invalid date';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date >= today) return 'Date of birth must be in the past';
  return true;
};
