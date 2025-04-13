from flask import Blueprint, jsonify
from db import db  # ✅ Correct Import

ngos_bp = Blueprint('ngos', __name__)

@ngos_bp.route('/list', methods=['GET'])
def get_ngos():
    ngos = list(db.ngos.find({}, {"_id": 0}))
    return jsonify(ngos)

@ngos_bp.route('/raise-need/<string:ngo_email>', methods=["PUT"])
def raise_need_by_email(ngo_email):
    data = request.get_json()
    need_raised = data.get("needRaised")  # Get the updated needRaised value

    if need_raised is None:
        return jsonify({"error": "NeedRaised value is required"}), 400

    result = db.ngos.update_one(
        {"email": ngo_email},
        {"$set": {"needRaised": need_raised}}
    )

    if result.modified_count == 1:
        return jsonify({"message": f"Need raised successfully: {need_raised}"}), 200
    else:
        return jsonify({"error": "NGO not found or no change"}), 404
