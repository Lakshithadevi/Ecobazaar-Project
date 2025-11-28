import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavbar";
import Footer from "../components/Footer";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [ecoRank, setEcoRank] = useState("Eco Beginner");
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(50);
  const navigate = useNavigate();

  // 🌿 Load cart + eco points
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(savedCart);
    const points = parseFloat(localStorage.getItem("ecoPoints")) || 0;
    setEcoPoints(points);

    // Determine rank + discount
    let rank = "Eco Beginner";
    let discountValue = 0;
    let delivery = 50;

    if (points >= 50 && points < 100) {
      rank = "Nature Nurturer";
      discountValue = 10;
      delivery = 0;
    } else if (points >= 100 && points < 200) {
      rank = "Green Guardian";
      discountValue = 15;
    } else if (points >= 200) {
      rank = "Eco Champion";
      discountValue = 25;
      delivery = 0;
    } else {
      discountValue = 10;
    }

    setEcoRank(rank);
    setDiscount(discountValue);
    setDeliveryCharge(delivery);
  }, []);

  // 💚 Update cart in localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // 🔺 Remove item
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // 🔄 Change quantity
  const updateQuantity = (id, qty) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
    );
    updateCart(updated);
  };

  // 🧮 Totals
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + deliveryCharge;

  // 🚀 Proceed to buy
  const handleCheckout = (item) => {
    navigate("/BuyBox", { state: { product: item } });
  };

  return (
    <div className="cart-container">
      <BuyerNavbar ecoPoints={ecoPoints} />

      <div className="cart-content">
        <h2>🛒 My Eco Cart</h2>
        <p className="cart-subtext">
          Review your sustainable picks and proceed to checkout.
        </p>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h3>🪴 Your cart is empty.</h3>
            <button className="shop-btn" onClick={() => navigate("/BuyerDashboard")}>
              🛍 Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-img" />

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                    <div className="quantity-box">
                      <label>Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                      />
                    </div>
                    <p>
                      <strong>Total:</strong> ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <div className="cart-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      ❌ Remove
                    </button>
                    <button
                      className="buy-btn"
                      onClick={() => handleCheckout(item)}
                    >
                      ✅ Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 🌿 Summary Section */}
            <div className="cart-summary">
              <h3>🧾 Order Summary</h3>
              <p>
                <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
              </p>
              <p>
                <strong>Eco Rank:</strong> {ecoRank}
              </p>
              <p style={{ color: "#047857" }}>
                <strong>Discount ({discount}%):</strong> -₹{discountAmount.toFixed(2)}
              </p>
              <p>
                <strong>Delivery:</strong>{" "}
                {deliveryCharge === 0 ? "Free 🚚" : `₹${deliveryCharge}`}
              </p>
              <hr />
              <p className="total">
                <strong>Total Payable:</strong> ₹{total.toFixed(2)}
              </p>

              <button
                className="checkout-btn"
                onClick={() => handleCheckout(cart[0])}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
