import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData?.role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>Clothes Donation</Link>
      <div>
        {role === "user" && (
          <>
            <Link className={styles.link} to="/ngos">NGOs</Link>
            <Link className={styles.link} to="/history">History</Link>
            <Link
              className={styles.link}
              onClick={() => {
                window.location.href = "/home#contact";
                setTimeout(() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              ContactUs
            </Link>
            <Link className={styles.link} to="/profile">Profile</Link>
            <Link className={styles.link} onClick={handleLogout}>Logout</Link>
          </>
        )}

        {role === "ngo" && (
          <>
            <Link className={styles.link} to="/ngoreq">NGO Requests</Link>
            <Link className={styles.link} to="/profile">Profile</Link>
            <Link className={styles.link} onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
}
