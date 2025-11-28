import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BuyerNavbar.css"; // Reuse BuyerNavbar styling
import logo from "../assets/logo.png";
import {
  FaUserCircle,
  FaHome,
  FaBoxOpen,
  FaChartBar,
  FaClipboardList,
  FaSignOutAlt,
  FaUser,
  FaSearch,
} from "react-icons/fa";

/* 🌿 Sample Seller Product Data */
import cottonBag from "../assets/cotton_bag.jpg";
import brush from "../assets/brush.webp";
import note from "../assets/notes.jpg";
import power from "../assets/powerbank.jpg";

const SELLER_PRODUCTS = [
  { id: 1, name: "Organic Cotton Tote Bag", price: 499, image: cottonBag },
  { id: 2, name: "Bamboo Toothbrush Set", price: 299, image: brush },
  { id: 3, name: "Recycled Notebook", price: 199, image: note },
  { id: 4, name: "Solar Power Bank", price: 899, image: power },
];

function SellerNavbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  /* ✅ Handle Logout */
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      alert("Logged out successfully ✅");
      navigate("/");
    }
  };

  /* ✅ Handle Search Trigger */
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!searchTerm.trim()) return;
      if (onSearch) onSearch(searchTerm.trim());
      else navigate("/my-products", { state: { query: searchTerm.trim() } });
      setSuggestions([]);
    }
  };

  /* ✅ Dynamic Search Suggestions */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = SELLER_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);

    setSuggestions(matches);
  }, [searchTerm]);

  /* ✅ Handle Selecting Product */
  const handleSelectProduct = (product) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/my-products/${product.id}`, { state: { product } });
  };

  const handleProfile = () => {
    setProfileOpen(false);
    setTimeout(() => navigate("/seller/profile"), 150);
  };

  return (
    <>
      {(menuOpen || profileOpen) && (
        <div
          className="overlay"
          onClick={() => {
            setMenuOpen(false);
            setProfileOpen(false);
          }}
        />
      )}

      {/* 🌿 Seller Navbar */}
      <nav className="buyer-navbar">
        {/* 🏪 Left Section */}
        <div className="buyer-left" onClick={() => navigate("/SellerDashboard")}>
          <div className="logo">
            <img src={logo} alt="EcoBazaar Logo" className="logo-img" />
            <h3>EcoBazaarX - Seller Hub 🏪</h3>
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search your products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <FaSearch className="search-icon" onClick={handleSearch} />

          {suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="suggestion-item"
                  onClick={() => handleSelectProduct(item)}
                >
                  <img src={item.image} alt={item.name} />
                  <span>
                    {item.name} — <strong>₹{item.price}</strong>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🌿 Right Section */}
        <div className="buyer-actions">
          <div className="buyer-nav-links">
            <a onClick={() => navigate("/SellerDashboard")}>
              <FaHome /> Home
            </a>

            <a onClick={() => navigate("/my-products")}>
              <FaBoxOpen /> My Products
            </a>

            <a onClick={() => navigate("/seller/sales")}>
              <FaChartBar /> Sales
            </a>

            <a onClick={() => navigate("/seller-orders")}>
              <FaClipboardList /> Orders
            </a>

            {/* 👤 Profile */}
            <div
              className="profile-btn"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <FaUserCircle size={24} />
            </div>

            {profileOpen && (
              <div className="profile-dropdown">
                <p onClick={handleProfile}>
                  <FaUser /> My Profile
                </p>
                <p className="logout" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </p>
              </div>
            )}
          </div>

          {/* 🍔 Mobile Menu */}
          <div
            className="buyer-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </nav>

      {/* 📱 Mobile Menu */}
      <div className={`buyer-menu ${menuOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={() => setMenuOpen(false)}>
          ✕
        </span>

        <a onClick={() => { navigate("/SellerDashboard"); setMenuOpen(false); }}>
          <FaHome /> Home
        </a>

        <a onClick={() => { navigate("/my-products"); setMenuOpen(false); }}>
          <FaBoxOpen /> My Products
        </a>

        <a onClick={() => { navigate("/sales"); setMenuOpen(false); }}>
          <FaChartBar /> Sales
        </a>

        <a onClick={() => { navigate("/seller-orders"); setMenuOpen(false); }}>
          <FaClipboardList /> Orders
        </a>

        <a onClick={() => { setMenuOpen(false); handleProfile(); }}>
          <FaUser /> My Profile
        </a>

        <a className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </a>
      </div>
    </>
  );
}

export default SellerNavbar;
