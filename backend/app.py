from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import config
from db import db  # Import from db.py

app = Flask(__name__)

# Configure CORS to allow specific origins
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
jwt = JWTManager(app)

# Import and register blueprints after initializing app
from routes.auth import auth_bp
from routes.donations import donations_bp
from routes.ngos import ngos_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(donations_bp, url_prefix="/donations")
app.register_blueprint(ngos_bp, url_prefix="/ngos")

if __name__ == "__main__":
    app.run(debug=True)