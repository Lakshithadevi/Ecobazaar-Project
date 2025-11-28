import React, { useState, useEffect } from "react";
import BuyerNavbar from "../components/BuyerNavbar";
import "./BuyerProfile.css";
import defaultProfile from "../assets/default-profile.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function BuyerProfile() {
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState(() => {
    const saved = localStorage.getItem("buyerProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Eco Buyer",
          email: "buyer@ecobazaarx.com",
          phone: "9876543210",
          address: "12, Green Street, Chennai, Tamil Nadu",
          ecoPoints: parseFloat(localStorage.getItem("ecoPoints")) || 120,
          profileImg: defaultProfile,
        };
  });

  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(buyer);
  const [preview, setPreview] = useState(buyer.profileImg);

  // 🌱 Sync ecoPoints from localStorage automatically
  useEffect(() => {
    const syncEcoPoints = () => {
      const updatedPoints =
        parseFloat(localStorage.getItem("ecoPoints")) || buyer.ecoPoints;
      setBuyer((prev) => ({ ...prev, ecoPoints: updatedPoints }));
      setUpdatedData((prev) => ({ ...prev, ecoPoints: updatedPoints }));
    };

    syncEcoPoints();
    window.addEventListener("storage", syncEcoPoints);
    return () => window.removeEventListener("storage", syncEcoPoints);
  }, []);

  // 🌿 Determine eco rank based on points
  const getEcoRank = (points) => {
    if (points >= 300) return { rank: "🌍 Platinum Hero", color: "#00b894" };
    if (points >= 200) return { rank: "🌿 Gold Guardian", color: "#ffd700" };
    if (points >= 120) return { rank: "🍃 Silver Saver", color: "#a8dadc" };
    return { rank: "🌱 Bronze Beginner", color: "#cd7f32" };
  };

  const ecoRank = getEcoRank(buyer.ecoPoints);

  // ✅ Save updated profile
  const saveProfile = () => {
    const updatedProfile = { ...updatedData, profileImg: preview };
    localStorage.setItem("buyerProfile", JSON.stringify(updatedProfile));
    setBuyer(updatedProfile);
    setEditing(false);
    alert("✅ Profile updated successfully!");
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // ✅ Upload new image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image (JPG, PNG, or WEBP).");
    }
  };

  // ✅ Remove photo → reset to default
  const handleRemovePhoto = () => {
    setPreview(defaultProfile);
    alert("🖼️ Profile photo reset to default.");
  };

  return (
    <div className="buyer-container">
      <BuyerNavbar ecoPoints={buyer.ecoPoints} />

      <div className="profile-section">
        <div className="profile-card">
          {/* 🌿 Eco Rank Badge — top right corner */}
          <div
            className="eco-rank-badge top-right"
            style={{ background: ecoRank.color }}
          >
            {ecoRank.rank}
          </div>
          {/* 🌿 Profile Image */}
          <div className="profile-image">
            <img src={preview} alt="Buyer" className="profile-img" />
          </div>

          {/* 🌿 Profile Details */}
          <div className="profile-details">
            <div className="info-row">
              <label>Name:</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{buyer.name}</p>
              )}
            </div>

            <div className="info-row">
              <label>Email:</label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleChange}
                />
              ) : (
                <p>{buyer.email}</p>
              )}
            </div>

            <div className="info-row">
              <label>Phone:</label>
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={updatedData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{buyer.phone}</p>
              )}
            </div>

            <div className="info-row">
              <label>Address:</label>
              {editing ? (
                <textarea
                  name="address"
                  rows="2"
                  value={updatedData.address}
                  onChange={handleChange}
                />
              ) : (
                <p>{buyer.address}</p>
              )}
            </div>

            <div className="info-row">
              <label>EcoPoints:</label>
              <p className="eco-points">♻️ {buyer.ecoPoints.toFixed(1)} EP</p>
            </div>

            {/* 🌿 Action Buttons */}
            <div className="profile-actions">
              {editing ? (
                <>
                  <button className="save-btn" onClick={saveProfile}>
                    💾 Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setEditing(false);
                      setPreview(buyer.profileImg);
                      setUpdatedData(buyer);
                    }}
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {/* 🌿 Move Change/Remove Photo to bottom */}
            {editing && (
              <div className="photo-buttons bottom-buttons">
                <label htmlFor="upload-photo" className="upload-label">
                  📸 Change Photo
                </label>
                <input
                  type="file"
                  id="upload-photo"
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={handleImageUpload}
                  className="upload-input"
                />
                <button className="remove-photo-btn" onClick={handleRemovePhoto}>
                  ❌ Remove Photo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BuyerProfile;
