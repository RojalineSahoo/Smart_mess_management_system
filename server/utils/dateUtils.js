/**
 * Normalizes a date to UTC midnight (00:00:00.000Z)
 * This prevents IST (18:30) offset issues.
 */
export const getUtcMidnight = (date = new Date()) => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

/**
 * Returns Tomorrow's date at UTC midnight
 */
export const getTomorrowUtcMidnight = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getUtcMidnight(tomorrow);
};