import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css"; // Import CSS Module

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>Clothes Donation</Link>
      <div>
        <Link className={styles.link} to="/ngos">NGOs</Link>
        <Link className={styles.link} to="/history">History</Link>
        <Link className={styles.link} to="/profile">Profile</Link>
        <Link className={styles.link} to="/login">Logout</Link>
      </div>
    </nav>
  );
}
