import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavbar";
import Footer from "../components/Footer";
import "./BuyBox.css";

function BuyBox() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderMeta, setOrderMeta] = useState(null);
  const [ecoRank, setEcoRank] = useState("Eco Beginner");
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(50);

  const receiptRef = useRef();

  // 🌿 Determine Eco Rank and Discount Offer (always run before conditional return)
  useEffect(() => {
    const points = parseFloat(localStorage.getItem("ecoPoints")) || 0;
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
      delivery = 50;
    } else if (points >= 200) {
      rank = "Eco Champion";
      discountValue = 25;
      delivery = 0;
    } else {
      rank = "Eco Beginner";
      discountValue = 10;
    }

    setEcoRank(rank);
    setDiscount(discountValue);
    setDeliveryCharge(delivery);
  }, []);

  // 🧮 Calculations
  const subtotal = product ? product.price * quantity : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + deliveryCharge;

  // 💾 Save order in localStorage
  const saveOrder = (paymentLabel) => {
    setIsProcessing(true);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId =
      paymentLabel === "Cash on Delivery"
        ? `COD-${Math.floor(100000 + Math.random() * 900000)}`
        : `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      productName: product.name,
      image: product.image,
      price: product.price,
      quantity,
      subtotal,
      discount,
      total,
      ecoRank,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      address,
      paymentMethod: paymentLabel,
      transactionId,
    };

    const existingOrders = JSON.parse(localStorage.getItem("buyerOrders")) || [];
    localStorage.setItem("buyerOrders", JSON.stringify([...existingOrders, newOrder]));

    // 🌱 Add Eco Points (5 per item)
    const currentPoints = parseFloat(localStorage.getItem("ecoPoints")) || 0;
    const addedPoints = quantity * 5;
    localStorage.setItem("ecoPoints", (currentPoints + addedPoints).toFixed(1));
    window.dispatchEvent(new Event("storage"));

    setOrderMeta(newOrder);
    setShowReceipt(true);
    setIsProcessing(false);

    // Redirect after 5 seconds
    setTimeout(() => {
      navigate("/orders");
    }, 5000);
  };

  // 🏡 Confirm Purchase
  const handleConfirmPurchase = () => {
    if (!address.trim()) {
      alert("Please enter your full delivery address 🏡");
      return;
    }

    if (paymentMethod === "COD") {
      saveOrder("Cash on Delivery");
    } else {
      navigate("/PaymentPortal", {
        state: { product, quantity, address, total },
      });
    }
  };

  // 🖨 Print Receipt
  const handlePrint = () => {
    const printContent = receiptRef.current;
    const printWindow = window.open("", "_blank", "width=800,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>EcoBazaarX Receipt</title>
          <style>
            body {
              font-family: 'Poppins', sans-serif;
              background: #f7fff8;
              padding: 30px;
              color: #0f5132;
            }
            h2 { text-align: center; color: #198754; }
            .receipt-box {
              border: 2px solid #b2e5c2;
              border-radius: 15px;
              padding: 25px;
              max-width: 600px;
              margin: 0 auto;
              background: #fff;
              box-shadow: 0 0 15px rgba(25,135,84,0.2);
            }
            img {
              width: 120px;
              border-radius: 10px;
              display: block;
              margin: 0 auto 15px;
            }
            p { margin: 5px 0; font-size: 15px; }
            .footer-note {
              text-align: center;
              font-style: italic;
              color: #2e7d5b;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <p class="footer-note">🌿 Thank you for supporting sustainable living with EcoBazaarX!</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // ✅ Render fallback AFTER hooks
  if (!product) {
    return (
      <div className="buybox-empty">
        <h2>❌ No product selected</h2>
        <button onClick={() => navigate("/BuyerDashboard")}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="buybox-container">
      <BuyerNavbar />

      <div className="buybox-content">
        <div className="buybox-card">
          {/* 🌿 Left Section */}
          <div className="buybox-left">
            <div className="floating-card">
              <img src={product.image} alt={product.name} className="buybox-image" />
            </div>
            <div className="product-summary">
              <h2>{product.name}</h2>
              <p className="product-price">₹{product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Carbon Points:</strong> {product.carbonPoints}</p>
              <p><strong>Delivery:</strong> Free doorstep delivery in 3–5 business days</p>
              <p className="eco-note">
                🌱 Each purchase contributes to a cleaner planet — thank you for choosing sustainable products.
              </p>
            </div>
          </div>

          {/* 🌸 Right Section */}
          <div className="buybox-right">
            <h3>🛒 Confirm Your Order</h3>

            {/* Quantity */}
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                placeholder="Full address (house no., street, landmark, pin code)"
                rows="4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Payment */}
            <div className="form-group payment-section">
              <label>Payment Method</label>
              <div className="payment-grid">
                <div
                  className={`payment-card ${paymentMethod === "COD" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  💵 Cash on Delivery
                </div>
                <div
                  className={`payment-card ${paymentMethod === "Online" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("Online")}
                >
                  💳 Pay Online
                </div>
              </div>
            </div>

            {/* 🌿 Order Summary */}
            <div className="order-summary">
              <h4>Order Summary</h4>
              <p><strong>Subtotal:</strong> ₹{subtotal}</p>
              <p><strong>Eco Rank:</strong> {ecoRank}</p>
              <p style={{ color: "#047857" }}>
                <strong>Discount ({discount}%):</strong> -₹{discountAmount.toFixed(2)}
              </p>
              <p><strong>Delivery:</strong> {deliveryCharge === 0 ? "Free 🚚" : `₹${deliveryCharge}`}</p>
              <hr />
              <p className="total-payable"><strong>Total Payable:</strong> ₹{total.toFixed(2)}</p>
            </div>

            <div className="action-buttons">
              <button
                className="confirm-btn"
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "✅ Place Order"}
              </button>
              <button className="cancel-btn" onClick={() => navigate(-1)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ COD Receipt Popup */}
      {showReceipt && orderMeta && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="success-ring">
              <div className="success-tick">✔</div>
            </div>
            <h2>🎉 Order Confirmed!</h2>
            <p>Your order has been placed successfully 🌿</p>

            <div ref={receiptRef} className="eco-receipt fadeIn">
              <h3>🧾 Eco Receipt</h3>
              <img src={orderMeta.image} alt={orderMeta.productName} />
              <p><strong>Order ID:</strong> {orderMeta.id}</p>
              <p><strong>Transaction ID:</strong> {orderMeta.transactionId}</p>
              <p><strong>Eco Rank:</strong> {orderMeta.ecoRank}</p>
              <p><strong>Discount Applied:</strong> {orderMeta.discount}%</p>
              <p><strong>Total Paid:</strong> ₹{orderMeta.total}</p>
              <p><strong>Date:</strong> {orderMeta.date}</p>
              <p><strong>Deliver To:</strong> {orderMeta.address}</p>
            </div>

            <button className="print-btn" onClick={handlePrint}>🖨 Print Receipt</button>
            <p className="redirect-msg">Redirecting to your Orders...</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default BuyBox;
