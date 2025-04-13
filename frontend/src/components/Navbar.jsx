import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css"; // Import CSS Module

export default function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>Clothes Donation</Link>
      <div>
        <Link className={styles.link} to="/ngos">NGOs</Link>
        <Link className={styles.link} to="/history">History</Link>
        <Link
              className={styles.link}
              onClick={() => {
                window.location.href = "/home#contact";
                setTimeout(() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100); // slight delay for navigation
              }}
            >
              ContactUs
            </Link>

        <Link className={styles.link} to="/profile">Profile</Link>
        <Link className={styles.link} onClick={handleLogout}>Logout</Link>
      </div>
    </nav>
  );
}
