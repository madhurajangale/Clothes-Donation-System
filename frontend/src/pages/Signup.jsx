import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "../styles/Auth.module.css"; // Import CSS module

export default function Signup() {
  const [isNGO, setIsNGO] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    age: isNGO ? undefined : "", // Only for User signup
    registration_number: isNGO ? "" : undefined, // Only for NGO signup
    ngo_name: isNGO ? "" : undefined, // Only for NGO signup
    ngo_type: isNGO ? "" : undefined, // Only for NGO signup
  });

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isNGO
      ? "http://localhost:5000/auth/ngo-signup"
      : "http://localhost:5000/auth/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error message from response
        throw new Error(errorData.error || "Server error");
      }

      const data = await response.json();
      alert(`Signup successful as ${isNGO ? "NGO" : "User"}!`);

      // Navigate to Login page after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert(error.message || "Failed to connect to server.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.toggleContainer}>
        <button
          className={!isNGO ? styles.active : ""}
          onClick={() => setIsNGO(false)}
        >
          User Signup
        </button>
        <button
          className={isNGO ? styles.active : ""}
          onClick={() => setIsNGO(true)}
        >
          NGO Signup
        </button>
      </div>

      <h2>{isNGO ? "NGO Signup" : "User Signup"}</h2>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        {/* Common Fields */}
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
        <input
          type="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        {/* User-Specific Fields */}
        {!isNGO && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        {!isNGO && (
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        )}
        {/* NGO-Specific Fields */}
        {isNGO && (
          <>
            <input
              type="text"
              name="ngo_name"
              placeholder="NGO Name"
              value={formData.ngo_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="registration_number"
              placeholder="Registration Number"
              value={formData.registration_number}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="ngo_type"
              placeholder="NGO Type"
              value={formData.ngo_type}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="/login">Login</a>
      </p>
    </div>
  );
}