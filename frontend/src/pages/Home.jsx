import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginPopup from "../LoginPopup";
import SignupPopup from "../SignupPopup";
import "./Home.css";
import bannerImage from "../assets/Banner.jpg";

// 🖼️ Product Images
import cottonBag from "../assets/cotton_bag.jpg";
import brush from "../assets/brush.webp";
import note from "../assets/notes.jpg";
import power from "../assets/powerbank.jpg";
import shirt from "../assets/shirt.jpeg";
import cover from "../assets/cover.webp";
import kurthi from "../assets/kurthi.webp";
import juteBag from "../assets/jutebag.webp";
import pbottle from "../assets/pbottle.jpg";
import pen from "../assets/pen.jpg";
import gift from "../assets/giftbox.jpeg";

const products = [
  { name: "Organic Cotton Tote Bag", price: 499, image: cottonBag, carbonFootprint: 1.2 },
  { name: "Bamboo Toothbrush Set", price: 299, image: brush, carbonFootprint: 0.5 },
  { name: "Recycled Notebook Pack", price: 199, image: note, carbonFootprint: 0.8 },
  { name: "Solar Power Bank", price: 999, image: power, carbonFootprint: 2.5 },
  { name: "Eco Phone Cover", price: 249, image: cover, carbonFootprint: 0.6 },
  { name: "Organic Men’s Shirt", price: 599, image: shirt, carbonFootprint: 1.8 },
  { name: "Handcrafted Jute Bag", price: 399, image: juteBag, carbonFootprint: 1.4 },
  { name: "Plant-Based Bottle", price: 299, image: pbottle, carbonFootprint: 0.7 },
  { name: "Bamboo Pen Set", price: 149, image: pen, carbonFootprint: 0.3 },
  { name: "Eco Gift Box", price: 799, image: gift, carbonFootprint: 2.0 },
  { name: "Organic Kurthi", price: 499, image: kurthi, carbonFootprint: 1.3 },
  { name: "Recycled Notebook", price: 299, image: note, carbonFootprint: 0.9 },
];

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const productsRef = useRef(null);

  const handleExploreClick = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProductClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* 🌿 Fixed Banner Section */}
      <section
        className="banner-fixed"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0,0,0,0.45)), url(${bannerImage}) no-repeat center center / cover`,
        }}
      >
        <div className="banner-overlay">
          <h1>
            Welcome to <span>EcoBazaarX</span>
          </h1>
          <p>Shop Smart. Shop Sustainable. Track Your Carbon Footprint.</p>
          <button className="explore-btn" onClick={handleExploreClick}>
            Explore Products 🌍
          </button>
        </div>
      </section>

      {/* ✨ Features Section */}
      <section className="features">
        <h2>
          Why Choose <span>EcoBazaarX?</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>♻️ Eco-Friendly Products</h3>
            <p>Each purchase helps reduce waste and promotes a greener planet.</p>
          </div>
          <div className="feature-card">
            <h3>🌍 Carbon Tracking</h3>
            <p>Know your impact — track the carbon footprint of every product.</p>
          </div>
          <div className="feature-card">
            <h3>🤝 Local Support</h3>
            <p>Empower small-scale eco sellers making real environmental change.</p>
          </div>
        </div>
      </section>

      {/* 🛍 Product Section */}
      <section className="product-section" ref={productsRef}>
        <h2>🌿 Sustainable Products</h2>
        <div className="product-grid">
          {products.map((item, index) => (
            <div key={index} className="product-card" onClick={handleProductClick}>
              <div className="product-image">
                <img src={item.image} alt={item.name} />
                <div className="hover-info">View Details ➜</div>
              </div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <span className="carbon-tag">♻️ {item.carbonFootprint} kg CO₂</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* 🔐 Popups */}
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
    </div>
  );
}

export default Home;
