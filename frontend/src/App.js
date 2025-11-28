import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* 🌍 Pages */
import Home from "./pages/Home";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import ViewSoldProducts from "./pages/ViewSoldProducts";
import MyProducts from "./pages/MyProducts";
import SellerOrders from "./pages/SellerOrders";
import SellerProfile from "./pages/SellerProfile";
import BuyerProfile from "./pages/BuyerProfile";
import BuyerOrders from "./pages/BuyerOrders";
import BuyBox from "./pages/BuyBox";
import PaymentPortal from "./pages/PaymentPortal";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import EcoRankPage from "./pages/EcoRankPage";
import Sales from "./pages/Sales";

/* 🔐 Popups */
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

/* 🌿 Sample Product Images */
import cottonBag from "./assets/cotton_bag.jpg";
import brush from "./assets/brush.webp";
import note from "./assets/notes.jpg";
import power from "./assets/powerbank.jpg";

function App() {
  /* 🛍️ Seller Products (Persistent State) */
  const [products, setProducts] = useState(() => {
    // ✅ Load products from localStorage or use defaults
    const saved = localStorage.getItem("sellerProducts");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Organic Cotton Tote Bag",
            price: 499,
            stock: 30,
            sold: 15,
            category: "Accessories",
            image: cottonBag,
          },
          {
            id: 2,
            name: "Bamboo Toothbrush Set",
            price: 299,
            stock: 80,
            sold: 55,
            category: "Home",
            image: brush,
          },
          {
            id: 3,
            name: "Recycled Notebook",
            price: 199,
            stock: 40,
            sold: 25,
            category: "Stationery",
            image: note,
          },
          {
            id: 4,
            name: "Solar Power Bank",
            price: 899,
            stock: 15,
            sold: 10,
            category: "Electronics",
            image: power,
          },
        ];
  });

  /* 💾 Save products to localStorage whenever updated */
  useEffect(() => {
    localStorage.setItem("sellerProducts", JSON.stringify(products));
  }, [products]);

  /* ✅ Add New Product */
  const handleAddProduct = (newProduct) => {
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const newProd = { id: newId, sold: 0, ...newProduct };
    setProducts((prev) => [...prev, newProd]);
  };

  /* ✏️ Edit Product */
  const handleEditProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  /* 🗑️ Delete Product */
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <Router>
      <Routes>
        {/* 🏠 Home Page */}
        <Route path="/" element={<Home />} />

        {/* 👤 Buyer Pages */}
        <Route path="/BuyerDashboard" element={<BuyerDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/pages/BuyerProfile" element={<BuyerProfile />} />
        <Route path="/orders" element={<BuyerOrders />} />
        <Route path="/buybox" element={<BuyBox />} />
        <Route path="/PaymentPortal" element={<PaymentPortal />} />
        <Route path="/EcoRankPage" element={<EcoRankPage />} />
        <Route path="/cart" element={<Cart />} />

        {/* 🏪 Seller Pages */}
        <Route
          path="/SellerDashboard"
          element={
            <SellerDashboard
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          }
        />
        <Route path="/view-sold-products" element={<ViewSoldProducts />} />
        <Route
          path="/my-products"
          element={
            <MyProducts
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          }
        />
        <Route path="/seller-orders" element={<SellerOrders />} />
        <Route path="/seller/profile" element={<SellerProfile />} />
        <Route path="/seller/sales" element={<Sales />} />
        <Route
          path="/seller/add-product"
          element={<AddProduct onAddProduct={handleAddProduct} />}
        />

        {/* 🧑‍💼 Admin */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* 🔐 Auth */}
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/signup" element={<SignupPopup />} />
      </Routes>
    </Router>
  );
}

export default App;
