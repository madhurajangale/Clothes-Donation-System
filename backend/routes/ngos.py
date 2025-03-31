from flask import Blueprint, jsonify
from db import db  # ✅ Correct Import

ngos_bp = Blueprint('ngos', __name__)

@ngos_bp.route('/list', methods=['GET'])
def get_ngos():
    ngos = list(db.ngos.find({}, {"_id": 0}))
    return jsonify(ngos)
