import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ViewSoldProducts.css";
import SellerNavbar from "../components/SellerNavbar";
import bagImg from "../assets/cotton_bag.jpg";
import brushImg from "../assets/brush.webp";
import shirtImg from "../assets/shirt.jpeg";
import kurtiImg from "../assets/kurthi.webp";
import Footer from "../components/Footer";

function ViewSoldProducts() {
  const [soldProducts] = useState([
    {
      id: 1,
      name: "Organic Cotton Bag",
      price: 499,
      quantity: 3,
      image: bagImg,
      buyer: "Lakshmi Devi",
      date: "2025-11-05",
    },
    {
      id: 2,
      name: "Bamboo Toothbrush Set",
      price: 299,
      quantity: 2,
      image: brushImg,
      buyer: "Anitha Raj",
      date: "2025-11-03",
    },
    {
      id: 3,
      name: "Men’s Eco Shirt",
      price: 649,
      quantity: 1,
      image: shirtImg,
      buyer: "Prakash M",
      date: "2025-11-01",
    },
    {
      id: 4,
      name: "Organic Cotton Kurti",
      price: 899,
      quantity: 2,
      image: kurtiImg,
      buyer: "Meena S",
      date: "2025-10-30",
    },
  ]);

  // ✅ Calculate totals
  const totalRevenue = soldProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalSold = soldProducts.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      soldProducts.map((item) => ({
        "Product Name": item.name,
        "Price (₹)": item.price,
        Quantity: item.quantity,
        Buyer: item.buyer,
        Date: item.date,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sold Products");
    XLSX.writeFile(workbook, "Sold_Products_Report.xlsx");
  };

  return (
    <div className="view-sold-container">
      <SellerNavbar />

      <div className="sold-content">
        <h2>📦 Sold Products Overview</h2>

        {/* ✅ Stats Section */}
        <div className="stats-bar">
          <div className="stat-card">
            <h3>Total Products Sold</h3>
            <p>{totalSold}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>₹{totalRevenue}</p>
          </div>
          <button className="export-btn" onClick={exportToExcel}>
            ⬇️ Export Report
          </button>
        </div>

        {/* ✅ Table Section */}
        <div className="sold-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Buyer</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {soldProducts.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.buyer}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

export default ViewSoldProducts;
