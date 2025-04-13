from flask import Blueprint, jsonify
from db import db

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/users/<email>', methods=['GET'])
def get_user_profile(email):
    user = db.users.find_one({"email": email}, {"password": 0})  # Exclude password
    if user:
        user["_id"] = str(user["_id"])  # Convert ObjectId to string if needed
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404


@profile_bp.route('/ngos/<email>', methods=['GET'])
def get_ngo_profile(email):
    ngo = db.ngos.find_one({"email": email}, {"password": 0})  # Exclude password
    if ngo:
        ngo["_id"] = str(ngo["_id"])
        return jsonify(ngo), 200
    return jsonify({"error": "NGO not found"}), 404
