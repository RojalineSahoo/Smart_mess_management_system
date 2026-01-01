export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl mb-4">Student Dashboard</h1>
      <p>Welcome, {user.roll_no}</p>
    </div>
  );
}
