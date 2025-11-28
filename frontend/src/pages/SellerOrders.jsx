import React, { useEffect, useState } from "react";
import "./SellerOrders.css";
import SellerNavbar from "../components/SellerNavbar";
import Footer from "../components/Footer";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const sampleOrders = [
    {
      id: "ORD001",
      customer: "Lakshitha Devi",
      product: "Organic Cotton Tote Bag",
      date: "2025-11-12",
      status: "Delivered",
      total: 499,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1593032457869-41a7ed50c043?w=600",
      email: "lakshitha@example.com",
      address: "Madurai, Tamil Nadu",
    },
    {
      id: "ORD002",
      customer: "Ravi Kumar",
      product: "Solar Power Bank",
      date: "2025-11-10",
      status: "Pending",
      total: 899,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1581091215367-59ab6f4c05b6?w=600",
      email: "ravi@example.com",
      address: "Coimbatore, Tamil Nadu",
    },
    {
      id: "ORD003",
      customer: "Anjali Sharma",
      product: "Bamboo Toothbrush Set",
      date: "2025-11-09",
      status: "Shipped",
      total: 299,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1599944689219-27937c1e88a9?w=600",
      email: "anjali@example.com",
      address: "Chennai, Tamil Nadu",
    },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sellerOrders")) || sampleOrders;
    setOrders(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem("sellerOrders", JSON.stringify(updated));
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="seller-orders-container">
      <SellerNavbar />

      <section className="orders-wrapper">
        <header className="orders-header">
          <h1>📦 Seller Orders</h1>
          <p>Track, manage, and update your customer orders easily.</p>
        </header>

        {/* 🌿 Filter Bar */}
        <div className="filter-bar">
          {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* 🌿 Orders Grid */}
        <div className="orders-grid">
          {filteredOrders.length === 0 ? (
            <p className="no-orders">No orders found.</p>
          ) : (
            filteredOrders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-top">
                  <img src={order.image} alt={order.product} className="order-img" />
                </div>

                <div className="order-details">
                  <h3>{order.product}</h3>
                  <p><strong>Customer:</strong> {order.customer}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-actions">
                  {order.status !== "Delivered" && order.status !== "Cancelled" && (
                    <>
                      <button
                        className="ship-btn"
                        onClick={() => updateStatus(order.id, "Shipped")}
                      >
                        🚚 Ship
                      </button>
                      <button
                        className="deliver-btn"
                        onClick={() => updateStatus(order.id, "Delivered")}
                      >
                        ✅ Deliver
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => updateStatus(order.id, "Cancelled")}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  )}
                  <button
                    className="details-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    🔍 View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 🌿 Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedOrder.image}
              alt={selectedOrder.product}
              className="modal-img"
            />
            <h2>{selectedOrder.product}</h2>
            <div className="modal-info">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
            </div>
            <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
              {selectedOrder.status}
            </span>
            <button
              className="close-modal-btn"
              onClick={() => setSelectedOrder(null)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SellerOrders;
