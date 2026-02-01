/**
 * Normalizes a date to UTC midnight (00:00:00.000Z)
 * Used for DB-safe storage and comparisons
 */
export const getUtcMidnight = (date = new Date()) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
};

/**
 * Returns tomorrow's date at UTC midnight
 * Used when STUDENTS apply for meals
 */
export const getTomorrowUtcMidnight = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getUtcMidnight(tomorrow);
};

/**
 * Returns today's date at IST midnight (converted to UTC)
 * Used ONLY for ADMIN dashboard (human-facing)
 */
export const getIstMidnight = () => {
  const now = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffsetMs);

  return new Date(
    Date.UTC(
      istNow.getFullYear(),
      istNow.getMonth(),
      istNow.getDate()
    )
  );
};

/**
 * Returns tomorrow's date at IST midnight (converted to UTC)
 * Used ONLY for ADMIN dashboard "tomorrow" count
 */
export const getIstTomorrowMidnight = () => {
  const now = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffsetMs);

  istNow.setDate(istNow.getDate() + 1);

  return new Date(
    Date.UTC(
      istNow.getFullYear(),
      istNow.getMonth(),
      istNow.getDate()
    )
  );
};