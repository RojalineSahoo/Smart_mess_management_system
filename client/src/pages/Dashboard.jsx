import MealCard from "../components/MealCard";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome, {user.roll_no}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">Breakfast</h3>
          <MealCard />
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Lunch</h3>
          <MealCard />
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Dinner</h3>
          <MealCard />
        </div>
      </div>
    </div>
  );
}
