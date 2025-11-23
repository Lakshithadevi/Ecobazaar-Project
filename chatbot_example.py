# chatbot_example.py
# Example script demonstrating how to use the chatbot API

import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def test_chatbot(message, top_n=5):
    """Test the chatbot endpoint with a message"""
    url = f"{BASE_URL}/chatbot"
    payload = {
        "message": message,
        "top_n": top_n
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def print_chatbot_response(result):
    """Pretty print the chatbot response"""
    if not result:
        print("No response received")
        return
    
    print("\n" + "="*60)
    print("USER MESSAGE:")
    print(f"  {result.get('message', 'N/A')}")
    print("\n" + "-"*60)
    print("CHATBOT RESPONSE:")
    print(f"  {result.get('response', 'N/A')}")
    print("\n" + "-"*60)
    print("RECOMMENDATIONS:")
    
    recommendations = result.get('recommendations', [])
    if recommendations:
        for i, rec in enumerate(recommendations, 1):
            print(f"\n  {i}. {rec.get('name', 'N/A')}")
            print(f"     Category: {rec.get('category', 'N/A')}")
            print(f"     Price: ₹{rec.get('price', 'N/A')}")
            print(f"     Carbon Footprint: {rec.get('carbon_footprint', 'N/A')} kg CO2")
            print(f"     Product ID: {rec.get('product_id', 'N/A')}")
    else:
        print("  No recommendations found")
    
    print("="*60 + "\n")

if __name__ == "__main__":
    print("🤖 Testing EcoBazaar Chatbot API\n")
    
    # Test cases
    test_messages = [
        "I'm looking for eco-friendly kitchen products",
        "Show me products for hygiene",
        "I need something reusable and sustainable",
        "What products do you have for cleaning?",
        "Show me product 1"  # This will use product ID recommendation
    ]
    
    for message in test_messages:
        print(f"\n📤 Sending: '{message}'")
        result = test_chatbot(message)
        print_chatbot_response(result)
        
        # Small delay between requests
        import time
        time.sleep(0.5)
    
    # Test health endpoint
    print("\n🏥 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/chatbot/health")
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error: {e}")

