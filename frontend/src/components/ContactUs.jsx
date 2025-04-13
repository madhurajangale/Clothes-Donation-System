import React, { useState } from "react";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contact/submit", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Error sending message.");
      console.error(error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.left}>
          <h2 style={styles.title}>Contact us</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              style={{ ...styles.input, height: "100px" }}
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </form>
        </div>
        <div style={styles.right}>
          <img
            src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg" // You can replace this
            alt="Contact illustration"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f5c681",
    borderRadius: "20px",
    display: "flex",
    width: "90%",
    maxWidth: "1000px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  left: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "28px",
    color: "#444",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "#fff",
    boxShadow: "inset 0 0 5px rgba(0,0,0,0.05)",
  },
  button: {
    padding: "12px",
    borderRadius: "25px",
    backgroundColor: "#ff9900",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
  },
};
