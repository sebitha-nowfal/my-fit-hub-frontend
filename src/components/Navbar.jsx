import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import "./Navbar.css"; // CSS file

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoImg} alt="Logo" className="logo-img" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div 
        className="hamburger" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/workouts" onClick={() => setMenuOpen(false)}>Workouts</Link>
        <Link to="/nutrition" onClick={() => setMenuOpen(false)}>Nutrition</Link>
        <Link to="/yoga" onClick={() => setMenuOpen(false)}>Yoga</Link>
        <Link to="/trainers" onClick={() => setMenuOpen(false)}>Trainer</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>LOGIN</Link>
      </div>

    </nav>
  );
};

export default Navbar;
