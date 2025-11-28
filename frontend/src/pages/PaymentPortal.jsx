import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavbar";
import Footer from "../components/Footer";
import "./PaymentPortal.css";

function PaymentPortal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity, address, total } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showNetBankingForm, setShowNetBankingForm] = useState(false);
  const [bank, setBank] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [success, setSuccess] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [orderMeta, setOrderMeta] = useState(null);
  const receiptRef = useRef();
  // Add eco points after successful payment
const currentPoints = parseFloat(localStorage.getItem("ecoPoints")) || 0;
const addedPoints = product.carbonPoints * quantity;
localStorage.setItem("ecoPoints", (currentPoints + addedPoints).toFixed(1));
window.dispatchEvent(new Event("storage"));

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h2>⚠️ No product to pay for</h2>
        <button onClick={() => navigate("/BuyerDashboard")}>Back to Home</button>
      </div>
    );
  }

  const generateTxn = (type) =>
    `TXN-${type}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePaymentDone = (method) => {
    const id = generateTxn(method.toUpperCase());
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setTxnId(id);
    setSuccess(true);

    const newOrder = {
      id: orderId,
      productName: product.name,
      image: product.image,
      price: product.price,
      quantity,
      total,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      address,
      paymentMethod: `Paid Online (${method})`,
      transactionId: id,
    };

    const existing = JSON.parse(localStorage.getItem("buyerOrders")) || [];
    localStorage.setItem("buyerOrders", JSON.stringify([...existing, newOrder]));

    setOrderMeta(newOrder);

    setTimeout(() => navigate("/orders"), 6000);
  };

  const handlePrint = () => {
    const printContent = receiptRef.current;
    const printWindow = window.open("", "_blank", "width=800,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>EcoBazaarX Payment Receipt</title>
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
          <p class="footer-note">🌿 Thank you for shopping sustainably with EcoBazaarX!</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="payment-container">
      <BuyerNavbar />

      <div className="portal-wrapper">
        {!success ? (
          <div className="portal-box">
            <h2>💳 Secure Payment Portal</h2>
            <p className="desc">
              Choose your preferred payment method to finalize your eco-friendly order 🌿
            </p>

            {/* Payment Methods */}
            <div className="method-grid">
              {["UPI", "Card", "NetBanking"].map((m) => (
                <div
                  key={m}
                  className={`method-card ${
                    selectedMethod === m ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedMethod(m);
                    setShowCardForm(false);
                    setShowNetBankingForm(false);
                  }}
                >
                  <span className="icon">
                    {m === "UPI" ? "📱" : m === "Card" ? "💳" : "🏦"}
                  </span>
                  <h4>{m}</h4>
                  <p>
                    {m === "UPI"
                      ? "Instant transfer via any UPI app"
                      : m === "Card"
                      ? "Pay with Credit / Debit card"
                      : "NetBanking through your trusted bank"}
                  </p>
                </div>
              ))}
            </div>

            {/* Dynamic Payment Sections */}
            {selectedMethod === "UPI" && (
              <div className="upi-section fadeIn">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=ecobazaarx@upi&pn=EcoBazaarX&am=100&cu=INR&size=180x180"
                  alt="UPI QR"
                  className="upi-qr"
                />
                <p>Scan this QR or use UPI ID: <strong>ecobazaarx@upi</strong></p>
                <button
                  className="pay-btn"
                  onClick={() => handlePaymentDone("UPI")}
                >
                  ✅ Payment Done (Dummy)
                </button>
              </div>
            )}

            {selectedMethod === "Card" && !showCardForm && (
              <div className="card-intro fadeIn">
                <button
                  className="open-btn"
                  onClick={() => setShowCardForm(true)}
                >
                  Enter Card Details 💳
                </button>
              </div>
            )}

            {selectedMethod === "Card" && showCardForm && (
              <div className="card-form fadeIn">
                <input
                  type="text"
                  placeholder="Card Number (16 digits)"
                  maxLength="16"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />
                <div className="card-row">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength="3"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
                <button
                  className="pay-btn"
                  onClick={() => handlePaymentDone("Card")}
                >
                  ✅ Payment Done (Dummy)
                </button>
              </div>
            )}

            {selectedMethod === "NetBanking" && !showNetBankingForm && (
              <div className="netbank-intro fadeIn">
                <button
                  className="open-btn"
                  onClick={() => setShowNetBankingForm(true)}
                >
                  Select Bank 🏦
                </button>
              </div>
            )}

            {selectedMethod === "NetBanking" && showNetBankingForm && (
              <div className="netbank-form fadeIn">
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  <option value="">-- Select Bank --</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>Axis</option>
                  <option>Kotak</option>
                </select>
                <button
                  className="pay-btn"
                  onClick={() => handlePaymentDone("NetBanking")}
                >
                  ✅ Payment Done (Dummy)
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="success-box">
            <div className="success-ring">
              <div className="success-tick">✔</div>
            </div>
            <h2>🎉 Payment Successful!</h2>
            <p>Your order has been placed successfully 🌿</p>

            {orderMeta && (
              <div ref={receiptRef} className="eco-receipt fadeIn">
                <h3>🧾 Eco Receipt</h3>
                <img src={orderMeta.image} alt={orderMeta.productName} />
                <p><strong>Order ID:</strong> {orderMeta.id}</p>
                <p><strong>Transaction ID:</strong> {orderMeta.transactionId}</p>
                <p><strong>Product:</strong> {orderMeta.productName}</p>
                <p><strong>Quantity:</strong> {orderMeta.quantity}</p>
                <p><strong>Payment:</strong> {orderMeta.paymentMethod}</p>
                <p><strong>Total Paid:</strong> ₹{orderMeta.total}</p>
                <p><strong>Date:</strong> {orderMeta.date}</p>
                <p><strong>Deliver To:</strong> {orderMeta.address}</p>
              </div>
            )}

            <button className="print-btn" onClick={handlePrint}>🖨 Print Receipt</button>
            <p className="redirect-msg">Redirecting to your Orders...</p>

            <div className="confetti-container">
              {[...Array(30)].map((_, i) => (
                <span key={i} className="leaf"></span>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default PaymentPortal;
