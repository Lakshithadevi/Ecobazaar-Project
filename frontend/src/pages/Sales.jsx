import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaBox, FaLeaf, FaChartLine } from "react-icons/fa";
import SellerNavbar from "../components/SellerNavbar";
import Footer from "../components/Footer";
import "./Sales.css";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSold: 0,
    avgEcoPoints: 0,
  });

  // Load data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ecoProducts")) || [];
    const soldItems = stored.filter((p) => p.sold > 0);
    setSalesData(soldItems);

    const totalRevenue = soldItems.reduce((sum, p) => sum + p.price * p.sold, 0);
    const totalSold = soldItems.reduce((sum, p) => sum + p.sold, 0);
    const avgEcoPoints =
      soldItems.length > 0
        ? (
            soldItems.reduce((sum, p) => sum + (p.ecoPoints || 0), 0) /
            soldItems.length
          ).toFixed(1)
        : 0;

    setStats({ totalRevenue, totalSold, avgEcoPoints });
  }, []);

  return (
    <div className="sales-page">
      <SellerNavbar />

      {/* 🌿 Header */}
      <header className="sales-header">
        <h1>📈 Sales & Performance</h1>
        <p>Track your revenue, sales growth, and product performance.</p>
      </header>

      {/* 🌿 Stats Overview */}
      <div className="sales-stats">
        <div className="stat-card">
          <FaMoneyBillWave className="icon money" />
          <h3>₹{stats.totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>
        <div className="stat-card">
          <FaBox className="icon box" />
          <h3>{stats.totalSold}</h3>
          <p>Total Units Sold</p>
        </div>
        <div className="stat-card">
          <FaLeaf className="icon leaf" />
          <h3>{stats.avgEcoPoints}</h3>
          <p>Avg Eco Points</p>
        </div>
        <div className="stat-card">
          <FaChartLine className="icon chart" />
          <h3>{(stats.totalRevenue / 1000).toFixed(2)}k</h3>
          <p>Growth Indicator</p>
        </div>
      </div>

      {/* 🌿 Best Selling Products */}
      <section className="top-selling">
        <h2>🔥 Best-Selling Products</h2>
        {salesData.length === 0 ? (
          <p className="no-sales">No sales recorded yet 😢</p>
        ) : (
          <div className="product-grid">
            {salesData
              .sort((a, b) => b.sold - a.sold)
              .slice(0, 4)
              .map((p) => (
                <div className="product-card" key={p.id}>
                  <img src={p.image} alt={p.name} />
                  <div className="info">
                    <h3>{p.name}</h3>
                    <p>Sold: {p.sold}</p>
                    <p>₹{p.price * p.sold}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* 🌿 Recent Transactions */}
      <section className="recent-transactions">
        <h2>🧾 Recent Transactions</h2>
        {salesData.length === 0 ? (
          <p className="no-sales">No recent transactions available.</p>
        ) : (
          <table className="sales-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>Eco Points</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.sold}</td>
                  <td>₹{p.price * p.sold}</td>
                  <td>{p.ecoPoints}</td>
                  <td>
                    {p.dateAdded
                      ? new Date(p.dateAdded).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Sales;
