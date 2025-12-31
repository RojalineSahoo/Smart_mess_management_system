export const isLocked = (mealTime) => {
  const now = new Date();
  const mealDate = new Date(mealTime);
  return (mealDate - now) / (1000 * 60 * 60) <= 24;
};
