import React from "react";
import "./ProductCard.css";
import { FaStar, FaRecycle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, name, price, image, rating, ecoPoints, carbonFootprint }) {
  const navigate = useNavigate();

  // 🛒 Add to Cart Function
  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      image,
      rating,
      ecoPoints,
      carbonFootprint,
      quantity: 1,
    };

    // Get existing cart or create new
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if already added
    const existingItem = existingCart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1; // increase quantity if already in cart
    } else {
      existingCart.push(product);
    }

    // Save updated cart
    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    // Optional: Show confirmation
    alert(`✅ "${name}" added to your cart!`);

    // Navigate to cart
    navigate("/cart");
  };

  return (
    <div className="eco-card">
      {/* 🖼 Product Image */}
      <div className="eco-image-wrapper">
        <img src={image} alt={name} className="eco-image" />
      </div>

      {/* 🧾 Product Content */}
      <div className="eco-content">
        <h3 className="eco-name">{name}</h3>

        {/* ⭐ Rating + ♻️ Eco Points */}
        <div className="eco-badges">
          <div className="eco-rating">
            <FaStar /> <span>{rating}</span>
          </div>
          <div className="eco-ep">
            <FaRecycle /> <span>{ecoPoints} EP</span>
          </div>
        </div>

        {/* 💰 Price */}
        <p className="eco-price">₹{price}</p>

        {/* 🛒 Add to Cart Button */}
        <button className="eco-btn" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
