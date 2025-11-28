import React, { useState } from "react";
import "./pages/AuthPopup.css";

function SignupPopup({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("BUYER");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signup successful for ${formData.name} as ${role}!`);
    onClose();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-popup">
        {/* ✖ Close Icon */}
        <span className="close-icon" onClick={onClose}>
          ✖
        </span>

        <h2>Create Your EcoBazaarX Account 🌿</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="auth-input"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="auth-input"
          >
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={onSwitchToLogin}>Login here</span>
        </p>

        {/* 🌍 Social signup buttons */}
        <div className="social-signup">
          <p>Or sign up with:</p>
          <div className="social-buttons">
            <a
              href="https://accounts.google.com/o/oauth2/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="social-icon"
              />
              Google
            </a>
            <a
              href="https://www.facebook.com/v11.0/dialog/oauth"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                alt="Facebook"
                className="social-icon"
              />
              Facebook
            </a>
            <a
              href="https://appleid.apple.com/auth/authorize"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
                alt="Apple"
                className="social-icon"
              />
              Apple
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPopup;
