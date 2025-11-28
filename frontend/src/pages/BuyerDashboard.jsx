import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerDashboard.css";
import Footer from "../components/Footer";
import BuyerNavbar from "../components/BuyerNavbar";

/* ✅ Default Product Images */
import cottonBag from "../assets/cotton_bag.jpg";
import brush from "../assets/brush.webp";
import note from "../assets/notes.jpg";
import power from "../assets/powerbank.jpg";
import shirt from "../assets/shirt.jpeg";
import cover from "../assets/cover.webp";
import kurthi from "../assets/kurthi.webp";
import juteBag from "../assets/jutebag.webp";
import pbottle from "../assets/pbottle.jpg";
import pen from "../assets/pen.jpg";
import gift from "../assets/giftbox.jpeg";

/* ✅ Advertisement Images */
import ad1 from "../assets/ad1.jpg";
import ad2 from "../assets/ad2.jpg";
import ad3 from "../assets/ad2.webp";

/* 🛍️ Default Static Products with Descriptions */
const defaultProducts = [
  { id: 1, name: "Organic Cotton Tote Bag", price: 499, image: cottonBag, rating: 4.3, category: "Accessories", ecoPoints: 85, description: "Durable and eco-friendly cotton tote bag for everyday use." },
  { id: 2, name: "Bamboo Toothbrush Set", price: 299, image: brush, rating: 4.5, category: "Home", ecoPoints: 92, description: "Set of biodegradable bamboo toothbrushes that reduce plastic waste." },
  { id: 3, name: "Recycled Notebook Set", price: 199, image: note, rating: 4.4, category: "Stationery", ecoPoints: 78, description: "Stylish notebooks made from 100% recycled paper." },
  { id: 4, name: "Solar Power Bank", price: 899, image: power, rating: 4.6, category: "Electronics", ecoPoints: 90, description: "Charge your devices on the go using clean solar energy." },
  { id: 5, name: "Organic Men’s Shirt", price: 599, image: shirt, rating: 4.1, category: "Clothing", ecoPoints: 70, description: "Comfortable and breathable shirt made from pure organic cotton." },
  { id: 6, name: "Eco Phone Cover", price: 249, image: cover, rating: 3.9, category: "Accessories", ecoPoints: 65, description: "Compostable phone cover made from plant-based materials." },
  { id: 7, name: "Organic Cotton Kurthi", price: 449, image: kurthi, rating: 4.2, category: "Clothing", ecoPoints: 80, description: "Elegant and soft kurthi made from sustainable organic fibers." },
  { id: 8, name: "Handcrafted Jute Bag", price: 399, image: juteBag, rating: 4.3, category: "Accessories", ecoPoints: 88, description: "Beautiful handcrafted bag made with natural jute fibers." },
  { id: 9, name: "Plant-Based Bottle", price: 299, image: pbottle, rating: 4.4, category: "Home", ecoPoints: 95, description: "Reusable water bottle made from eco-safe plant-based materials." },
  { id: 10, name: "Bamboo Pen Set", price: 149, image: pen, rating: 4.1, category: "Stationery", ecoPoints: 60, description: "Smooth writing bamboo pens for sustainable stationery lovers." },
  { id: 11, name: "Eco Gift Box", price: 799, image: gift, rating: 4.7, category: "Home", ecoPoints: 98, description: "A perfect eco gift set featuring reusable, sustainable products." },
];

function BuyerDashboard() {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const productsRef = useRef(null);

  /* 🌿 Load cart and products */
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const sellerProducts = JSON.parse(localStorage.getItem("ecoProducts")) || [];
    const combined = [...defaultProducts, ...sellerProducts];
    setAllProducts(combined);
    setRecommended(combined.sort(() => 0.5 - Math.random()).slice(0, 8));
  }, []);

  /* 🟢 Auto scroll recommended */
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const interval = setInterval(() => {
      if (!scrollContainer || document.hidden) return;
      scrollContainer.scrollLeft += 250;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth)
        scrollContainer.scrollLeft = 0;
    }, 3000);
    return () => clearInterval(interval);
  }, [recommended]);

  /* 🌿 Ads */
  const ads = [ad1, ad2, ad3];
  const [currentAd, setCurrentAd] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, ads.length]);

  /* 🛒 Add to cart */
  const addToCart = (product, e) => {
    e?.stopPropagation();
    let cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existing = cartData.find((i) => i.id === product.id);
    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else cartData.push({ ...product, quantity: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cartData));
    setCart(cartData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleFilterClick = (cat) => {
    setCategory(cat);
    setTimeout(() => productsRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const filteredProducts = allProducts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewProduct = (p) => {
    navigate(`/product/${p.id}`, { state: { product: p } });
  };

  return (
    <div className="buyer-container">
      <BuyerNavbar cartItems={cart} onCartToggle={() => setShowCart(!showCart)} onSearch={setSearchQuery} />

      {/* 🌍 Ad Carousel */}
      <div className="ad-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="ad-track" style={{ transform: `translateX(-${currentAd * 100}%)` }}>
          {[...ads, ...ads].map((ad, i) => (
            <div className="ad-slide" key={i}>
              <img src={ad} alt={`Ad ${i}`} className="ad-img" />
            </div>
          ))}
        </div>
        <div className="ad-caption">🌍 Go Green | Shop Sustainable | Save Earth 🌱</div>
      </div>

      {/* 🌟 Recommended Products */}
      <div className="recommend-strip">
        <h3>🌟 Recommended for You</h3>
        <div className="recommend-scroll" ref={scrollRef}>
          {recommended.map((item) => (
            <div className="recommend-card-top" key={item.id}>
              <img src={item.image} alt={item.name} className="recommend-img-top" />
              <div className="recommend-info-top">
                <h4>{item.name}</h4>
                <p className="desc">{item.description}</p>
                <p>₹{item.price}</p>
                <div className="recommend-actions">
                  <button className="view-btn" onClick={() => viewProduct(item)}>👁 View</button>
                  <button className="add-btn" onClick={(e) => addToCart(item, e)}>➕ Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🛍 Product Grid */}
      <section className="catalog" ref={productsRef}>
        <h1 className="section-title">🌿 Eco-Friendly Products</h1>
        <div className="filter-bar">
          {["All", "Clothing", "Accessories", "Home", "Electronics", "Stationery"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              onClick={() => handleFilterClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-img-wrap" onClick={() => viewProduct(item)}>
                <img src={item.image} alt={item.name} className="product-img" />
              </div>
              <div className="product-info">
                <h4>{item.name}</h4>
                <p className="desc">{item.description}</p>
                <div className="price-rating">
                  <p className="product-price">₹{item.price}</p>
                  <span className="rating-inline">⭐ {item.rating || 4.0}</span>
                </div>
                <p className="carbon">♻️ Eco Points: {item.ecoPoints}</p>
                <button className="buy-btn" onClick={(e) => addToCart(item, e)}>🛒 Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showToast && <div className="toast-message">✅ Item added to cart!</div>}
      <Footer />
    </div>
  );
}

export default BuyerDashboard;
