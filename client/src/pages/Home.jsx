import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Smart Mess Management System</h1>
      <p>
        A role-based system for managing hostel meals with strict cutoff rules.
      </p>

      <Link to="/login">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go to Login
        </button>
      </Link>
    </div>
  );
}

export default Home;
