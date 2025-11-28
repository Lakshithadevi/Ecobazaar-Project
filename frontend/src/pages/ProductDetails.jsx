import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavbar";
import "./ProductDetails.css";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(savedCart);
  }, []);

  if (!product)
    return (
      <p style={{ textAlign: "center", marginTop: "60px", color: "#0f5132" }}>
        Product not found
      </p>
    );

  // ✅ Add to Cart (stored in localStorage)
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // check if product already exists in cart
    const existingItem = existingCart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    setCart(existingCart);

    alert(`${product.name} added to cart 🛒`);
  };

  const totalEcoPoints = cart.reduce(
    (sum, item) => sum + (item.ecoPoints || item.carbonPoints || 0),
    0
  );

  // ✅ Navigate to Buy Box Page
  const handleBuyNow = () => {
    navigate("/buybox", { state: { product } });
  };

  return (
    <>
      {/* 🌿 Navbar */}
      <BuyerNavbar
        cartItems={cart}
        ecoPoints={totalEcoPoints}
        onCartToggle={() => setShowCart(!showCart)}
      />

      {/* 🛒 Cart Popup */}
      {showCart && (
        <div className="cart-popup">
          <h3>My Cart 🛒</h3>
          {cart.length === 0 ? (
            <p>No items yet</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={i} className="cart-item">
                  <span>{item.name}</span>
                  <span>
                    ₹{item.price} × {item.quantity}
                  </span>
                </div>
              ))}
              <div className="cart-summary">
                <strong>Total Items:</strong> {cart.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* 🌿 Product Details Page */}
      <div className="meesho-product-container">
        {/* Left: Image Section */}
        <div className="image-section">
          <div className="thumbnail-list">
            {[product.image, product.image, product.image].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumbnail"
                className={mainImage === img ? "active" : ""}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="main-image-box">
            <img src={mainImage} alt={product.name} />
          </div>
        </div>

        {/* Right: Product Info Section */}
        <div className="info-section">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">₹{product.price}</p>

          <div className="rating-row">
            <span className="rating-badge">⭐ {product.rating}</span>
            <span className="review-count">
              41807 Ratings, 17132 Reviews
            </span>
            <span className="trust-badge">✅ Trusted</span>
          </div>

          <p className="delivery-text">🚚 Free Delivery</p>

          <div className="size-box">
            <h4>Select Size</h4>
            <button className="size-btn">Free Size</button>
          </div>

          <div className="product-highlights">
            <h4>Product Highlights</h4>
            <div className="highlight-grid">
              <div>
                <p><strong>Material:</strong> Eco Cotton</p>
                <p><strong>Color:</strong> Natural White</p>
              </div>
              <div>
                <p><strong>Net Quantity (N):</strong> 1</p>
                <p>
                  <strong>Carbon Footprint:</strong>{" "}
                  {product.carbonFootprint || product.carbonPoints} kg CO₂e
                </p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-cart-btn" onClick={addToCart}>
              🛒 Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              🛍 Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
