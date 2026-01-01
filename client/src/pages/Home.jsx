import "./Home.css";

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">🍴</div>

        <nav className="nav-links">
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        <div className="nav-actions">
          <a href="#" className="link">Sign In</a>
          <button className="btn btn-green">Sign Up</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay animate-hero">
          <h1>
            Zero Food Waste, Smart Mess
            <br />
            Management.
          </h1>

          <p className="hero-text">
            Empowering sustainable living through intelligent meal planning and
            responsible consumption in college messes.
          </p>

          <button className="btn btn-green">
            Login to Your Portal
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features animate-section">
        <h2>Our Core Values and Benefits</h2>

        <div className="feature-grid">
          <div className="feature-card hover-fit">
            <div className="icon">🌱</div>
            <h3>Sustainability Focus</h3>
            <p>
              Contribute to a greener planet by drastically reducing food waste
              through informed meal planning.
            </p>
          </div>

          <div className="feature-card hover-fit">
            <div className="icon">⚙️</div>
            <h3>Operational Efficiency</h3>
            <p>
              Streamline mess operations with intelligent forecasting and
              minimized excess preparation.
            </p>
          </div>

          <div className="feature-card hover-fit">
            <div className="icon">👨‍🎓</div>
            <h3>Student Convenience</h3>
            <p>
              Easily manage meal skips and dietary preferences with a
              personalized experience.
            </p>
          </div>

          <div className="feature-card hover-fit">
            <div className="icon">💰</div>
            <h3>Cost Optimization</h3>
            <p>
              Reduce unnecessary expenses for both students and administration
              through smart planning.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <span className="logo">🍴</span>
          <p>© 2025 Smart Mess Management System. All rights reserved.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>

          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
