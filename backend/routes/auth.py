from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import hash_password, check_password
from db import db
import uuid
import random

# List of sample NGO images
SAMPLE_NGO_IMAGES = [
    "https://1ngo.in/static/assets/img/helpNgo/slider/2.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh628CQ2QB8hoWZFukAClbV0wxmV-5TuiYn2JiRcXs23KFiZQmeUGcQX8kAW885UbFh_4&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZXn7ij84fmAt5oNfWep14W-GpwkXJT7_1V_Fw5c9KArjyY3bIJifC1zOMQ3vbtHhQtzk&usqp=CAU",
    "https://blog.akshayapatra.org/wp-content/uploads/2017/07/Banner_GPW.jpg",
    "https://ngofeed.com/blog/wp-content/uploads/2024/07/goodwill-1024x640.jpg",
    "https://content3.jdmagicbox.com/v2/comp/mumbai/u3/022pxx22.xx22.140904130744.h1u3/catalogue/surya-foundation-dombivli-east-thane-ngos-wip8yooda0.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8V_yjaSrQr8qz_t-gUrI9iEEkBi-_xD4EZhbA7_hnvuiO0bsUjVnrdoTLAoUcD-1Y8w&usqp=CAU",
]

auth_bp = Blueprint('auth', __name__)

# User Signup (Stored in 'users' Collection)
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if db.users.find_one({"email": data["email"]}):
        return jsonify({"error": "User already exists"}), 400

    user = {
        "_id": str(uuid.uuid4()),
        "name": data["name"],
        "email": data["email"],
        "password": hash_password(data["password"]),  # Hashing user password
        "phone": data["phone"],
        "address": data["address"],
        "age": data["age"]
    }
    db.users.insert_one(user)
    return jsonify({"message": "User Signup successful!"})

@auth_bp.route('/ngo-signup', methods=['POST'])
def ngo_signup():
    data = request.json

    if db.ngos.find_one({"email": data["email"]}):
        return jsonify({"error": "NGO already registered"}), 400

    # Assign a random image URL from the predefined list
    image_url = random.choice(SAMPLE_NGO_IMAGES)

    ngo = {
        "_id": str(uuid.uuid4()),
        "ngo_name": data["ngo_name"],
        "email": data["email"],
        "password": hash_password(data["password"]),  # Hashing NGO password
        "phone": data["phone"],
        "address": data["address"],
        "registration_number": data["registration_number"],
        "ngo_type": data["ngo_type"],
        "image_url": image_url,
        "needRaised": False  # 👈 New field
    }
    db.ngos.insert_one(ngo)
    return jsonify({"message": "NGO Registration successful!"})

# User Login
@auth_bp.route('/user-login', methods=['POST'])
def user_login():
    data = request.json

    # Check if the email exists in the users collection
    user = db.users.find_one({"email": data["email"]})
    if user and check_password(data["password"], user["password"]):
        # Embed user details into JWT
        access_token = create_access_token(identity={"id": user["_id"], "email": user["email"], "role": "user"})
        return jsonify({"token": access_token, "role": "user"}), 200

    return jsonify({"error": "Invalid credentials"}), 401

# NGO Login
@auth_bp.route('/ngo-login', methods=['POST'])
def ngo_login():
    data = request.json

    # Check if the email exists in the NGOs collection
    ngo = db.ngos.find_one({"email": data["email"]})
    if ngo and check_password(data["password"], ngo["password"]):
        # Embed NGO details into JWT
        access_token = create_access_token(identity={"id": ngo["_id"], "email": ngo["email"], "role": "ngo"})
        return jsonify({"token": access_token, "role": "ngo"}), 200

    return jsonify({"error": "Invalid credentials"}), 401