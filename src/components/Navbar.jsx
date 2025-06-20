import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi scroll ke section di homepage
  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHome = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
          alt="Logo"
        />
        <span>Diabetes Predictor</span>
      </div>
      <button className="navbar-toggle" onClick={() => setMenuOpen((v) => !v)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          {isHome ? (
            <button
              className="nav-btn-link"
              onClick={() => scrollToSection("features-section")}
            >
              Fitur
            </button>
          ) : (
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Fitur
            </NavLink>
          )}
        </li>
        <li>
          {isHome ? (
            <button
              className="nav-btn-link"
              onClick={() => scrollToSection("contact-section")}
            >
              Kontak
            </button>
          ) : (
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Kontak
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            to="/predict"
            className={({ isActive }) => `prediksi-btn${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Prediksi
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
