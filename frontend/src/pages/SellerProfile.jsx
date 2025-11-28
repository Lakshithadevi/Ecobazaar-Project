import React, { useState, useEffect } from "react";
import SellerNavbar from "../components/SellerNavbar";
import "./SellerDashboard.css";
import defaultProfile from "../assets/default-profile.jpg";
import Footer from "../components/Footer";
function SellerProfile() {
  // ✅ Load saved data or default
  const [seller, setSeller] = useState(() => {
    const saved = localStorage.getItem("sellerProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Eco Seller",
          email: "seller@ecobazaarx.com",
          phone: "9876543210",
          storeName: "Eco Essentials Store",
          address: "Green Street, Madurai, Tamil Nadu",
          profileImg: defaultProfile,
        };
  });

  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(seller);
  const [preview, setPreview] = useState(seller.profileImg);

  // ✅ Save profile data to localStorage
  const saveProfile = () => {
    localStorage.setItem("sellerProfile", JSON.stringify(updatedData));
    setSeller(updatedData);
    setEditing(false);
    alert("✅ Profile updated successfully!");
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // ✅ Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setUpdatedData({ ...updatedData, profileImg: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image (JPG, PNG, WEBP).");
    }
  };

  return (
    <div className="seller-container">
      <SellerNavbar />

      <div className="profile-section">
        <h2>👤 Seller Profile</h2>

        <div className="profile-card">
          {/* ✅ Profile Image */}
          <div className="profile-image">
            <img src={preview} alt="Seller" />
            {editing && (
              <>
                <label htmlFor="upload-profile" className="upload-label">
                  Change Photo
                </label>
                <input
                  type="file"
                  id="upload-profile"
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={handleImageUpload}
                  className="upload-input"
                />
              </>
            )}
          </div>

          {/* ✅ Profile Info */}
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
                <p>{seller.name}</p>
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
                <p>{seller.email}</p>
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
                <p>{seller.phone}</p>
              )}
            </div>

            <div className="info-row">
              <label>Store Name:</label>
              {editing ? (
                <input
                  type="text"
                  name="storeName"
                  value={updatedData.storeName}
                  onChange={handleChange}
                />
              ) : (
                <p>{seller.storeName}</p>
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
                <p>{seller.address}</p>
              )}
            </div>

            {/* ✅ Buttons */}
            <div className="profile-actions">
              {editing ? (
                <>
                  <button className="save-btn" onClick={saveProfile}>
                    💾 Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditing(false)}
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
          </div>
        </div>
      </div>
      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

export default SellerProfile;
