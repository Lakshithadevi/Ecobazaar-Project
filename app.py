# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from recommender import recommend_similar, chatbot_recommend, load_products
import re

app = Flask(__name__)
CORS(app)

def extract_product_id(message):
    """Extract product ID from user message if mentioned"""
    numbers = re.findall(r'\b\d+\b', message)
    if numbers:
        try:
            return int(numbers[0])
        except ValueError:
            return None
    return None

def generate_chatbot_response(message, recommendations):
    """Generate a friendly chatbot response with recommendations"""
    if not recommendations:
        return "I couldn't find any products matching your request. Could you try describing what you're looking for in a different way?"
    
    response = f"I found {len(recommendations)} eco-friendly product(s) that might interest you:\n\n"
    
    for i, rec in enumerate(recommendations, 1):
        response += f"{i}. **{rec['name']}** ({rec['category']})\n"
        response += f"   💰 Price: ₹{rec['price']}\n"
        response += f"   🌱 Carbon Footprint: {rec['carbon_footprint']} kg CO2\n"
        response += f"   🆔 Product ID: {rec['product_id']}\n\n"
    
    response += "Would you like more details about any of these products?"
    return response

@app.route("/")
def home():
    return jsonify({"message": "EcoBazaar ML Recommender API running!"})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    product_id = data.get("product_id")

    if product_id is None:
        return jsonify({"error": "product_id is required"}), 400

    try:
        recommendations = recommend_similar(product_id)
        
        # Format image URLs and transform response
        def format_image_url(url):
            """Format Unsplash URLs with proper parameters"""
            if not url:
                return None
            if isinstance(url, str) and "unsplash.com" in url:
                if "/photo-" in url:
                    import re
                    photo_match = re.search(r'photo-([a-zA-Z0-9-]+)', url)
                    if photo_match:
                        photo_id = photo_match.group(1)
                        return f"https://images.unsplash.com/photo-{photo_id}?w=400&h=300&fit=crop&q=80&auto=format"
                    else:
                        separator = "?" if "?" not in url else "&"
                        return f"{url}{separator}w=400&h=300&fit=crop&q=80&auto=format"
            return url
        
        # Transform recommendations to include formatted images
        transformed_recommendations = []
        for rec in recommendations:
            image_url = format_image_url(rec.get("image_path"))
            transformed_recommendations.append({
                "product_id": rec.get("product_id"),
                "name": rec.get("name"),
                "category": rec.get("category"),
                "price": rec.get("price"),
                "carbon_footprint": rec.get("carbon_footprint"),
                "image_path": image_url,  # Formatted URL
                "image": image_url,  # Also provide as 'image' for consistency
            })
        
        return jsonify({"recommendations": transformed_recommendations})
    
    except Exception as e:
        print(f"❌ Error in recommend endpoint: {e}")
        return jsonify({"error": str(e), "recommendations": []}), 500

@app.route("/recommendations", methods=["GET", "POST"])
def get_recommendations():
    """
    Homepage recommendations endpoint.
    Returns general eco-friendly product recommendations.
    """
    try:
        # Handle both GET (query params) and POST (JSON body)
        if request.method == "GET":
            top_n = int(request.args.get("top_n", 6))
        else:
            data = request.get_json() or {}
            top_n = data.get("top_n", 6)
        
        # Try to get recommendations using chatbot_recommend
        try:
            recommendations = chatbot_recommend("eco-friendly sustainable products", top_n=top_n)
        except Exception as e:
            print(f"⚠️ Error with chatbot_recommend: {e}")
            # Fallback: Get all products from CSV
            df = load_products()
            recommendations = df.head(top_n)[[
                'product_id', 'name', 'category',
                'carbon_footprint', 'price', 'image_path'
            ]].to_dict(orient='records')
        
        # Transform field names to match frontend expectations
        def format_image_url(url):
            """Format Unsplash URLs with proper parameters"""
            if not url:
                return None
            if isinstance(url, str) and "unsplash.com" in url:
                # Check if URL is complete (has photo ID)
                if "/photo-" in url:
                    # Extract photo ID if URL is incomplete
                    import re
                    photo_match = re.search(r'photo-([a-zA-Z0-9-]+)', url)
                    if photo_match:
                        photo_id = photo_match.group(1)
                        # Use Unsplash Source API format
                        return f"https://images.unsplash.com/photo-{photo_id}?w=400&h=300&fit=crop&q=80&auto=format"
                    else:
                        # Add size parameters to existing URL
                        separator = "?" if "?" not in url else "&"
                        return f"{url}{separator}w=400&h=300&fit=crop&q=80&auto=format"
            return url
        
        transformed_recommendations = []
        for rec in recommendations:
            image_url = format_image_url(rec.get("image_path"))
            transformed_recommendations.append({
                "product_id": rec.get("product_id"),
                "name": rec.get("name"),
                "category": rec.get("category"),
                "price": f"₹{rec.get('price', 0)}",
                "carbon": f"{rec.get('carbon_footprint', 0)} kg CO₂e",
                "image": image_url,
                "carbon_footprint": rec.get("carbon_footprint")
            })
        
        return jsonify({"recommendations": transformed_recommendations})
    
    except Exception as e:
        print(f"❌ Error in get_recommendations: {e}")
        # Final fallback: return empty array with error message
        return jsonify({
            "recommendations": [],
            "error": str(e)
        }), 500

@app.route("/chatbot", methods=["POST"])
def chatbot():
    """
    Chatbot endpoint that accepts natural language queries and returns product recommendations.
    
    Request body:
    {
        "message": "I'm looking for eco-friendly kitchen products"
    }
    
    Response:
    {
        "response": "Chatbot response text",
        "recommendations": [...],
        "message": "original user message"
    }
    """
    data = request.get_json()
    
    if not data or "message" not in data:
        return jsonify({"error": "message is required"}), 400
    
    message = data.get("message", "").strip()
    
    if not message:
        return jsonify({"error": "message cannot be empty"}), 400
    
    # Check if user mentioned a product ID
    product_id = extract_product_id(message)
    
    if product_id:
        # Use product-based recommendation if ID is found
        recommendations = recommend_similar(product_id)
        response_text = generate_chatbot_response(message, recommendations)
    else:
        # Use text-based chatbot recommendation
        top_n = data.get("top_n", 5)
        recommendations = chatbot_recommend(message, top_n=top_n)
        response_text = generate_chatbot_response(message, recommendations)
    
    return jsonify({
        "response": response_text,
        "recommendations": recommendations,
        "message": message
    })

@app.route("/chatbot/health", methods=["GET"])
def chatbot_health():
    """Health check endpoint for the chatbot"""
    return jsonify({
        "status": "healthy",
        "service": "EcoBazaar Chatbot",
        "features": [
            "Natural language product search",
            "Product ID-based recommendations",
            "Eco-friendly product suggestions"
        ]
    })

if __name__ == "__main__":
    print("🌿 Starting EcoBazaar ML API at http://127.0.0.1:5000")
    print("💬 Chatbot endpoint available at /chatbot")
    app.run(debug=True)
