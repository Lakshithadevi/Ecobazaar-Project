import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import SellerNavbar from "../components/SellerNavbar";
import Footer from "../components/Footer";
import defaultProduct from "../assets/default-product.png";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    ecoPoints: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProduct((p) => ({ ...p, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.stock || !product.description) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
      category: product.category || "Uncategorized",
      image: product.image || defaultProduct,
      ecoPoints: product.ecoPoints ? Number(product.ecoPoints) : 50,
      price: Number(product.price),
      stock: Number(product.stock),
      sold: 0,
      dateAdded: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("ecoProducts")) || [];
    existing.unshift(newProduct);
    localStorage.setItem("ecoProducts", JSON.stringify(existing));
    localStorage.setItem("refreshSellerPages", String(Date.now()));

    alert("✅ Product added successfully!");
    navigate("/my-products");
  };

  return (
    <div className="add-product-page">
      <SellerNavbar />

      <div className="add-modal-overlay">
        <div className="add-modal">
          <div className="modal-header">
            <h2>🌱 Add New Product</h2>
            <button className="close-btn" onClick={() => navigate("/my-products")}>
              ✖
            </button>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            {/* Product Image Upload */}
            <div className="image-section">
              <img
                src={product.image || defaultProduct}
                alt="Preview"
                className="preview-image"
              />
              <label className="upload-btn">
                📸 Upload Image
                <input type="file" accept="image/*" onChange={handleImage} />
              </label>
            </div>

            {/* Form Inputs */}
            <div className="input-grid">
              <div className="input-field">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Eco Bamboo Brush"
                  required
                />
              </div>

              <div className="input-field">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Category</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option>Accessories</option>
                  <option>Home</option>
                  <option>Electronics</option>
                  <option>Stationery</option>
                  <option>Clothing</option>
                </select>
              </div>

              <div className="input-field">
                <label>Eco Points (1-100)</label>
                <input
                  type="number"
                  name="ecoPoints"
                  value={product.ecoPoints}
                  onChange={handleChange}
                  min="1"
                  max="100"
                />
              </div>
            </div>

            <div className="input-field full-width">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter short product description..."
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button type="submit" className="submit-btn">
                ➕ Add Product
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/my-products")}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddProduct;
