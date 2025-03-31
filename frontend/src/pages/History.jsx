import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/History.module.css"; // Custom CSS module for styling

export default function History() {
  const [donations, setDonations] = useState([]); // State to store donation history

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail"); // Retrieve user email from localStorage

        if (!userEmail) {
          alert("No user is logged in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/donations/history?email=${userEmail}`
        );
        setDonations(response.data); // Store fetched donations in state
      } catch (error) {
        console.error("Error fetching donation history:", error.message);
        alert("Failed to fetch donation history.");
      }
    };

    fetchDonations(); // Fetch donation history on component mount
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Donation History</h2>
      {donations.length === 0 ? (
        <p>No donation history found.</p>
      ) : (
        <div className={styles.donationList}>
          {donations.map((donation, index) => (
            <div key={index} className={styles.donationCard}>
              <p>
                <strong>NGO Name:</strong> {donation.ngo_name}
              </p>
              <p>
                <strong>NGO Email:</strong> {donation.ngo_email}
              </p>
              <p>
                <strong>Number of Clothes:</strong>{" "}
                {donation.clothes_details.number_of_clothes}
              </p>
              <p>
                <strong>Type:</strong> {donation.clothes_details.type}
              </p>
              <p>
                <strong>Takeaway Date:</strong> {donation.takeaway_date}
              </p>
              <p>
                <strong>Status:</strong> {donation.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}