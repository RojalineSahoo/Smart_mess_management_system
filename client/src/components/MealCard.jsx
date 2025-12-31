import { isLocked } from "../utils/timeLock";

export default function MealCard({ mealTime, onSkip }) {
  const locked = isLocked(mealTime);

  return (
    <button
      disabled={locked}
      onClick={onSkip}
      className={`px-4 py-2 text-white ${
        locked ? "bg-gray-400" : "bg-green-600"
      }`}
    >
      {locked ? "Locked" : "Skip Meal"}
    </button>
  );
}
