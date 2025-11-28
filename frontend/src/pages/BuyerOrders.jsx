import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerNavbar from "../components/BuyerNavbar";
import Footer from "../components/Footer";
import "./BuyerDashboard.css";

// import product images
import kurtiImg from "../assets/kurthi.webp";
import bagImg from "../assets/cotton_bag.jpg";
import coverImg from "../assets/cover.webp";

function BuyerOrders() {
  const navigate = useNavigate();

  // Load orders from localStorage or demo
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("buyerOrders");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: "ORD-1001",
        productName: "Organic Cotton Kurti",
        image: kurtiImg,
        price: 335,
        quantity: 1,
        date: "2025-11-05",
        status: "Delivered",
        category: "Women",
        rating: 4.2,
        carbonPoints: 1.3,
      },
      {
        id: "ORD-1002",
        productName: "Recycled Tote Bag",
        image: bagImg,
        price: 210,
        quantity: 2,
        date: "2025-11-03",
        status: "Shipped",
        category: "Accessories",
        rating: 4.3,
        carbonPoints: 1.0,
      },
      {
        id: "ORD-1003",
        productName: "Eco Phone Cover",
        image: coverImg,
        price: 163,
        quantity: 1,
        date: "2025-11-01",
        status: "Pending",
        category: "Accessories",
        rating: 3.9,
        carbonPoints: 0.6,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("buyerOrders", JSON.stringify(orders));
  }, []);

  const updateOrders = (updated) => {
    setOrders(updated);
    localStorage.setItem("buyerOrders", JSON.stringify(updated));
  };

  // Cancel a pending order
  const cancelOrder = (id) => {
    const ok = window.confirm("Are you sure you want to cancel this order?");
    if (!ok) return;
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "Cancelled" } : o
    );
    updateOrders(updated);
    alert("Order cancelled ✅");
  };

  // Return a delivered order
  const returnOrder = (id) => {
    const ok = window.confirm(
      "Mark this order as RETURNED? (This will notify the seller.)"
    );
    if (!ok) return;
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: "Returned" } : o
    );
    updateOrders(updated);
    alert("Return processed ✅");
  };

  // Re-order (demo)
  const reorder = (order) => {
    alert(`Re-order placed for ${order.productName} (demo)`);
  };

  // ✅ View product details on image click
  const viewProductDetails = (order) => {
    const product = {
      name: order.productName,
      image: order.image,
      price: order.price,
      category: order.category || "General",
      rating: order.rating || 4.0,
      carbonFootprint: order.carbonPoints || 1.0,
      carbonPoints: order.carbonPoints || 1.0,
    };

    navigate("/product/:id", { state: { product } });
  };

  return (
    <div className="buyer-container">
      <BuyerNavbar />

      <div className="orders-section">
        <h2>🧾 My Orders</h2>
        <p className="order-subtext">
          Track your eco-friendly purchases and manage cancellations/returns.
        </p>

        {orders.length === 0 ? (
          <p className="no-orders">No orders placed yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                {/* 🖼 Clickable Product Image */}
                <img
                  src={order.image}
                  alt={order.productName}
                  className="order-img clickable"
                  onClick={() => viewProductDetails(order)}
                  title="Click to view product details"
                />

                <div className="order-details">
                  <h3>{order.productName}</h3>

                  <p>
                    <strong>Price:</strong> ₹{order.price} × {order.quantity} ={" "}
                    <b>₹{order.price * order.quantity}</b>
                  </p>

                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>

                  <div style={{ marginTop: 8 }}>
                    <span
                      className={`status-badge ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="order-actions">
                    {order.status === "Pending" && (
                      <>
                        <button
                          className="cancel-order-btn"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>

                        <button
                          className="details-btn"
                          onClick={() => viewProductDetails(order)}
                        >
                          View Details
                        </button>
                      </>
                    )}

                    {order.status === "Shipped" && (
                      <>
                        <button
                          className="track-btn"
                          onClick={() =>
                            alert(
                              "Tracking (demo): your package is on the way 🚚"
                            )
                          }
                        >
                          Track Package
                        </button>

                        <button
                          className="details-btn"
                          onClick={() => viewProductDetails(order)}
                        >
                          View Details
                        </button>
                      </>
                    )}

                    {order.status === "Delivered" && (
                      <>
                        <button
                          className="return-order-btn"
                          onClick={() => returnOrder(order.id)}
                        >
                          Return Item
                        </button>

                        <button
                          className="reorder-btn"
                          onClick={() => reorder(order)}
                        >
                          Re-order
                        </button>
                      </>
                    )}

                    {(order.status === "Returned" ||
                      order.status === "Cancelled") && (
                      <>
                        <button
                          className="reorder-btn"
                          onClick={() => reorder(order)}
                        >
                          Re-order
                        </button>
                        <button
                          className="details-btn"
                          onClick={() => viewProductDetails(order)}
                        >
                          View Details
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default BuyerOrders;
