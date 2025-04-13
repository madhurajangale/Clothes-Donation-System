from flask import Blueprint, request, jsonify
from db import db
import uuid

donations_bp = Blueprint('donations', __name__)

@donations_bp.route('/create', methods=['POST'])
def create_donation():
    try:
        data = request.json

        user_email = data.get("user_email")
        if not user_email:
            return jsonify({"error": "User email is required"}), 400

        # Look up user details from DB
        user = db.users.find_one({"email": user_email})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Build donation object
        donation = {
            "_id": str(uuid.uuid4()),
            "user_email": user_email,
            "user_phone": user.get("phone"),
            "user_address": user.get("address"),
            "clothes_details": data.get("clothes_details"),
            "takeaway_date": data.get("takeaway_date"),
            "ngo_name": data.get("ngo_details", {}).get("name"),
            "ngo_email": data.get("ngo_details", {}).get("email"),
            "status": "Pending",
            "created_at": str(uuid.uuid1()),  # UUID1 includes timestamp
        }

        db.donations.insert_one(donation)
        return jsonify({"message": "Donation successfully created!"}), 201

    except Exception as e:
        print("Error creating donation:", e)
        return jsonify({"error": "Failed to create donation"}), 500

@donations_bp.route('/history', methods=['GET'])
def donation_history():
    try:
        email = request.args.get("email")  # Retrieve email from query params

        if not email:
            return jsonify({"error": "Email is required"}), 400

        # Query the database for donations matching the user's email
        donations = list(db.donations.find({"user_email": email}, {"_id": 0}))  # Exclude MongoDB ID

        return jsonify(donations), 200
    except Exception as e:
        print("Error fetching donation history:", e)
        return jsonify({"error": "Failed to fetch donation history"}), 500

@donations_bp.route('/requests', methods=['GET'])
def get_donation_requests():
    try:
        ngo_email = request.args.get("ngo_email")  # Retrieve NGO email from query params

        if not ngo_email:
            return jsonify({"error": "NGO email is required"}), 400

        # Query donations for the specified NGO email
        donations = list(db.donations.find({"ngo_email": ngo_email}, {"_id": 0}))  # Exclude MongoDB ID

        return jsonify(donations), 200
    except Exception as e:
        print("Error fetching donation requests:", e)
        return jsonify({"error": "Failed to fetch donation requests"}), 500
    
@donations_bp.route('/update-status', methods=['PATCH'])
def update_donation_status():
    try:
        data = request.json
        user_email = data.get("user_email")
        ngo_email = data.get("ngo_email")
        new_status = data.get("status")

        if not user_email or not ngo_email or not new_status:  # Validate fields
            return jsonify({"error": "User email, NGO email, and status are required"}), 400

        # Update the status in the donations collection
        result = db.donations.update_one(
            {"user_email": user_email, "ngo_email": ngo_email},
            {"$set": {"status": new_status}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Donation not found"}), 404

        return jsonify({"message": "Donation status updated successfully!"}), 200
    except Exception as e:
        print("Error updating donation status:", e)
        return jsonify({"error": "Failed to update donation status"}), 500
    
    
