import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import LoginPopup from "../LoginPopup";
import SignupPopup from "../SignupPopup";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        {/* ✅ Left Section - Logo */}
        <div className="left-section" onClick={() => navigate("/")}>
          <div className="logo">
            <img src={logo} alt="EcoBazaar Logo" className="logo-img" />
            <h3>EcoBazaar - Shopping Mart 🌿</h3>
          </div>
        </div>

        {/* ✅ Right Section - Links */}
        <div className="right-section">
          <div className="nav-links">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              Home
            </a>

            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                setShowLogin(true);
                setShowSignup(false);
              }}
            >
              Login
            </a>

            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                setShowSignup(true);
                setShowLogin(false);
              }}
            >
              Sign Up
            </a>

            <div
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </div>
          </div>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="dropdown-menu">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Home
            </a>

            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                setShowLogin(true);
                setShowSignup(false);
                setMenuOpen(false);
              }}
            >
              Login
            </a>

            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                setShowSignup(true);
                setShowLogin(false);
                setMenuOpen(false);
              }}
            >
              Sign Up
            </a>
          </div>
        )}
      </nav>

      {/* ✅ Popups */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupPopup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
