import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages/AuthPopup.css";

function LoginPopup({ onClose, onSwitchToSignup }) {
  const [useOtp, setUseOtp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [role, setRole] = useState("BUYER");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔢 Simulate sending OTP
  const sendOtp = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setOtpSent(true);
    alert(`OTP sent to ${formData.phone}`);
  };

  // 🚀 Handle Login Navigation by Role
  const handleSubmit = (e) => {
    e.preventDefault();

    if (useOtp) {
      if (!otpSent) return alert("Please request OTP first!");
      alert(`✅ Logged in with phone ${formData.phone} as ${role}`);
    } else {
      alert(`✅ Logged in with email ${formData.email} as ${role}`);
    }

    // ✅ Close popup
    onClose();

    // ✅ Navigate based on user role
    if (role === "BUYER") {
      navigate("/BuyerDashboard", { state: { role } });
    } else if (role === "SELLER") {
      navigate("/SellerDashboard", { state: { role } });
    } else if (role === "ADMIN") {
      navigate("/AdminDashboard", { state: { role } });
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-popup">
        <span className="close-icon" onClick={onClose}>✖</span>

        <h2>Welcome to <span className="highlight">EcoBazaarX</span> 🌿</h2>
        <p className="subtitle">Shop sustainably. Live consciously.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!useOtp ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </>
          ) : (
            <>
              <div className="otp-container">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="auth-input"
                />
                {!otpSent ? (
                  <button type="button" onClick={sendOtp} className="otp-btn">
                    Send OTP
                  </button>
                ) : (
                  <button type="button" disabled className="otp-btn sent">
                    OTP Sent
                  </button>
                )}
              </div>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </>
          )}

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
            {useOtp ? "Login with OTP" : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          {useOtp ? (
            <>
              Use Email instead?{" "}
              <span onClick={() => { setUseOtp(false); setOtpSent(false); }}>
                Login with Email
              </span>
            </>
          ) : (
            <>
              Prefer mobile login?{" "}
              <span onClick={() => setUseOtp(true)}>Login with OTP</span>
            </>
          )}
        </p>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <span onClick={onSwitchToSignup}>Sign up here</span>
        </p>

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

export default LoginPopup;
