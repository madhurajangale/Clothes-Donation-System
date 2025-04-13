from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import config
from flask import Flask, request, jsonify
from flask_mail import Mail, Message
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
from routes.donation_profile import profile_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(donations_bp, url_prefix="/donations")
app.register_blueprint(ngos_bp, url_prefix="/ngos")
app.register_blueprint(profile_bp)

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'madhurajangle2004@gmail.com'
app.config['MAIL_PASSWORD'] = 'obyf xczb elyv ugsi'  # Use App Password if using Gmail
app.config['MAIL_DEFAULT_SENDER'] = 'madhurajangle2004@gmail.com'

mail = Mail(app)

@app.route('/contact/submit', methods=['POST'])
def contact_submit():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    try:
        msg = Message(subject=f"Contact Form: {subject}",
                      recipients=['madhurajangle2004@gmail.com'])  # Replace with your own email
        msg.body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        mail.send(msg)
        return jsonify({"message": "Message sent successfully"}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to send message"}), 500

@app.route('/donations/send-status-email', methods=['POST'])
def send_status_email():
    data = request.get_json()

    user_email = data.get('user_email')
    ngo_email = data.get('ngo_email')
    status = data.get('status')

    try:
        subject = f"Donation Status Update: {status}"
        body = f"Dear User,\n\nYour donation request has been updated to {status} by the NGO with email: {ngo_email}.\n\nThank you for your generosity!"
        
        msg = Message(subject=subject,
                      recipients=[user_email])  # Send email to user
        msg.body = body
        mail.send(msg)
        
        return jsonify({"message": "Status email sent successfully."}), 200
    except Exception as e:
        print("Error sending email:", e)
        return jsonify({"error": "Failed to send status email."}), 500


if __name__ == "__main__":
    app.run(debug=True)