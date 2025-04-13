import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "../styles/Auth.module.css"; // Import CSS module

export default function Login({ onLogin }) {

  const [isNGO, setIsNGO] = useState(false); // Track User/NGO toggle state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize the navigation hook

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isNGO
      ? "http://localhost:5000/auth/ngo-login"
      : "http://localhost:5000/auth/user-login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error message
        throw new Error(errorData.error || "Server error");
      }

      const data = await response.json();
      if (isNGO) {
        localStorage.setItem("ngoEmail", formData.email); // store NGO email
        localStorage.setItem("user", JSON.stringify({ email: formData.email, role: "ngo" }));
      } else {
        localStorage.setItem("userEmail", formData.email); // store user email
        localStorage.setItem("user", JSON.stringify({ email: formData.email, role: "user" }));
      }
      
      
      onLogin?.(); // trigger update in App
      
      alert(`Login successful as ${isNGO ? "NGO" : "User"}!`);
      
      

      // Navigate to appropriate page based on role
      if (isNGO) {
        navigate("/ngoreq"); // Navigate to NGO Home page
      } else {
        navigate("/home"); // Navigate to User Home page
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message || "Failed to connect to server.");
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Login Toggle Buttons */}
      <div className={styles.toggleContainer}>
        <button
          className={!isNGO ? styles.active : ""}
          onClick={() => setIsNGO(false)}
        >
          User Login
        </button>
        <button
          className={isNGO ? styles.active : ""}
          onClick={() => setIsNGO(true)}
        >
          NGO Login
        </button>
      </div>

      {/* Login Form */}
      <h2>{isNGO ? "NGO Login" : "User Login"}</h2>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="/signup">{isNGO ? "Register as NGO" : "Sign up"}</a>
      </p>
    </div>
  );
}