# recommender.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import numpy as np
import os

def load_products(path="data/products.csv"):
    df = pd.read_csv(path)
    df['meta'] = (
        df['name'].fillna('') + ' ' +
        df['category'].fillna('') + ' ' +
        df['tags'].fillna('') + ' ' +
        df['description'].fillna('')
    )
    return df

def train_content_based(products_csv="data/products.csv", out_model="models/cb_tfidf.joblib"):
    df = load_products(products_csv)
    tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
    tfidf_matrix = tfidf.fit_transform(df['meta'])
    os.makedirs("models", exist_ok=True)
    joblib.dump({'tfidf': tfidf, 'matrix': tfidf_matrix, 'df': df}, out_model)
    print("✅ Saved content-based model to", out_model)

def load_cb_model(path="models/cb_tfidf.joblib"):
    d = joblib.load(path)
    return d['tfidf'], d['matrix'], d['df']

def recommend_similar(product_id, top_n=5, model_path="models/cb_tfidf.joblib"):
    tfidf, matrix, df = load_cb_model(model_path)

    # make sure product_id is same type as in CSV (int)
    try:
        product_id = int(product_id)
    except (TypeError, ValueError):
        return []

    try:
        idx = df.index[df['product_id'] == product_id].tolist()[0]
    except IndexError:
        return []

    sims = cosine_similarity(matrix[idx], matrix).flatten()
    sims[idx] = -1
    top_idx = np.argsort(sims)[::-1][:top_n]

    return df.iloc[top_idx][[
        'product_id', 'name', 'category',
        'carbon_footprint', 'price', 'image_path'
    ]].to_dict(orient='records')


# 🔹 Chatbot-style recommendation using free text
def chatbot_recommend(message, top_n=5, model_path="models/cb_tfidf.joblib"):
    tfidf, matrix, df = load_cb_model(model_path)

    # treat user message like a pseudo-product description
    msg_vec = tfidf.transform([message])
    sims = cosine_similarity(msg_vec, matrix).flatten()

    top_idx = np.argsort(sims)[::-1][:top_n]

    return df.iloc[top_idx][[
        'product_id', 'name', 'category',
        'carbon_footprint', 'price', 'image_path'
    ]].to_dict(orient='records')
