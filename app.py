from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ allow React (localhost:3000) to access this API

# 🌿 Mock Eco-Friendly Products Data
eco_products = [
    {
        "name": "Bamboo Toothbrush",
        "price": "₹120",
        "carbon": "0.3 kg CO₂e",
        "image": "https://images.unsplash.com/photo-1600181951204-1e9a0a3b35f1?auto=format&fit=crop&w=400&q=80"
    },
    {
        "name": "Reusable Water Bottle",
        "price": "₹350",
        "carbon": "0.8 kg CO₂e",
        "image": "https://images.unsplash.com/photo-1609947017136-7a7f62d3077b?auto=format&fit=crop&w=400&q=80"
    },
    {
        "name": "Organic Cotton Bag",
        "price": "₹200",
        "carbon": "0.5 kg CO₂e",
        "image": "https://images.unsplash.com/photo-1611078489935-c37cfcf63f15?auto=format&fit=crop&w=400&q=80"
    },
    {
        "name": "Metal Straw Set",
        "price": "₹180",
        "carbon": "0.2 kg CO₂e",
        "image": "https://images.unsplash.com/photo-1571192776145-9f563c1df686?auto=format&fit=crop&w=400&q=80"
    },
    {
        "name": "Reusable Coffee Cup",
        "price": "₹250",
        "carbon": "0.7 kg CO₂e",
        "image": "https://images.unsplash.com/photo-1523906630133-f6934a1ab1f6?auto=format&fit=crop&w=400&q=80"
    }
]

@app.route("/")
def home():
    return jsonify({"message": "EcoBazaar Recommender API is running!"})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_data = data.get("user_data", [])

    # 🌱 Simple Logic: Recommend based on user_data (you can replace with ML)
    # Example: If user likes "1,2,3", show first three; else show all
    if user_data == [1, 2, 3]:
        recommendations = eco_products[:3]
    else:
        recommendations = eco_products

    return jsonify({"recommendations": recommendations})

if __name__ == "__main__":
    print("🌿 Starting EcoBazaar Recommender API on http://127.0.0.1:5000 ...")
    app.run(debug=True)
