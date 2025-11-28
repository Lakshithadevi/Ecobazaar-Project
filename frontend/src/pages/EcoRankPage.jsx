import React, { useEffect, useState } from "react";
import BuyerNavbar from "../components/BuyerNavbar";
import Footer from "../components/Footer";
import "./EcoRankPage.css";

function EcoRankPage() {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [ecoRank, setEcoRank] = useState("Eco Beginner");
  const [progress, setProgress] = useState(0);
  const [offer, setOffer] = useState("");

  // Define rank levels, thresholds, and offers
  const ranks = [
    {
      name: "Eco Beginner",
      min: 0,
      max: 50,
      color: "#a7f3d0",
      offer: "Start your green journey! 🌱 Earn 10% off your first eco purchase.",
    },
    {
      name: "Nature Nurturer",
      min: 50,
      max: 100,
      color: "#6ee7b7",
      offer: "Great work! 🌿 Enjoy free shipping on all eco-friendly products this month!",
    },
    {
      name: "Green Guardian",
      min: 100,
      max: 200,
      color: "#34d399",
      offer: "You're inspiring others! 🌏 Get 15% off on your next sustainable clothing order.",
    },
    {
      name: "Eco Champion",
      min: 200,
      max: Infinity,
      color: "#059669",
      offer: "🏆 You're a true planet protector! Unlock 25% off all eco-gadgets and priority shipping!",
    },
  ];

  useEffect(() => {
    const points = parseFloat(localStorage.getItem("ecoPoints")) || 0;
    setEcoPoints(points);

    // Determine rank
    const currentRank =
      ranks.find((r) => points >= r.min && points < r.max)?.name ||
      "Eco Beginner";
    setEcoRank(currentRank);

    // Set offer
    const currentOffer =
      ranks.find((r) => points >= r.min && points < r.max)?.offer ||
      "Keep shopping green to unlock exclusive offers!";
    setOffer(currentOffer);

    // Calculate progress to next rank
    const nextRank = ranks.find((r) => points < r.max);
    const progressPercent =
      nextRank?.max === Infinity
        ? 100
        : ((points - nextRank.min) / (nextRank.max - nextRank.min)) * 100;

    setProgress(Math.min(Math.max(progressPercent, 0), 100));
  }, []);

  return (
    <div className="eco-rank-container">
      <BuyerNavbar />

      <div className="rank-content">
        <h2>🌿 Your Eco Rank</h2>
        <p className="rank-subtext">
          Earn more Eco Points by purchasing sustainable products and unlock special rewards!
        </p>

        {/* Current Rank Card */}
        <div className="current-rank-card">
          <h3>{ecoRank}</h3>
          <p className="points">Eco Points: {ecoPoints.toFixed(1)} EP</p>

          {/* Progress Bar */}
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                background: ranks.find((r) => r.name === ecoRank)?.color,
              }}
            ></div>
          </div>
          <p className="progress-text">
            {progress < 100
              ? `Progress to next rank: ${progress.toFixed(1)}%`
              : "🎉 You’ve reached the top rank!"}
          </p>

          {/* Offer Card */}
          <div className="offer-card">
            <h4>🎁 Special Offer for {ecoRank}</h4>
            <p>{offer}</p>
          </div>
        </div>

        {/* Rank Levels Table */}
        <div className="rank-table">
          <h3>Eco Rank Levels & Rewards</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Points Range</th>
                <th>Exclusive Offer</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((rank, index) => (
                <tr
                  key={index}
                  className={rank.name === ecoRank ? "active-rank" : ""}
                >
                  <td>
                    <span className="rank-name">{rank.name}</span>
                  </td>
                  <td>
                    {rank.max === Infinity
                      ? `${rank.min}+`
                      : `${rank.min} - ${rank.max - 1}`}{" "}
                    EP
                  </td>
                  <td className="offer-text">{rank.offer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EcoRankPage;
