import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart Mess Management System
        </h1>

        <p className="text-gray-600 mb-8">
          A smart solution to reduce food waste and optimize hostel mess
          operations using time-based scheduling and dietary preferences.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
