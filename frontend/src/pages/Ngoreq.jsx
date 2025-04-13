import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/NgoHome.module.css"; // Custom CSS module for styling

export default function NgoHome() {
  const [donations, setDonations] = useState([]); // State to store donation requests
  const [raised, setRaised] = useState(false);

  const handleRaiseNeed = async () => {
    try {
      const ngoEmail = localStorage.getItem("ngoEmail");
      if (!ngoEmail) {
        alert("No NGO email found.");
        return;
      }
  
      // Toggle the needRaised state before sending the request
      const newNeedRaisedStatus = !raised;
      await axios.put(`http://localhost:5000/ngos/raise-need/${ngoEmail}`, {
        needRaised: newNeedRaisedStatus,
      });
  
      // Update the local state to reflect the new status
      setRaised(newNeedRaisedStatus);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to raise need.");
    }
  };
  
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const ngoEmail = localStorage.getItem("ngoEmail"); // Retrieve NGO email from localStorage

        if (!ngoEmail) {
          alert("No NGO is logged in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/donations/requests?ngo_email=${ngoEmail}`
        );
        setDonations(response.data); // Store fetched donation requests in state
      } catch (error) {
        console.error("Error fetching donation requests:", error.message);
        alert("Failed to fetch donation requests.");
      }
    };

    fetchDonations(); // Fetch donation requests on component mount
  }, []);

  const handleStatusChange = async (userEmail, ngoEmail, newStatus) => {
    try {
      const payload = {
        user_email: userEmail, // User's email
        ngo_email: ngoEmail,   // NGO's email
        status: newStatus,     // New status (Accepted or Completed)
      };
  
      const response = await axios.patch(`http://localhost:5000/donations/update-status`, payload);
  
      alert(`Donation status updated to ${newStatus}!`);
      setDonations((prev) =>
        prev.map((donation) =>
          donation.user_email === userEmail && donation.ngo_email === ngoEmail
            ? { ...donation, status: newStatus }
            : donation
        )
      ); // Update state locally
    } catch (error) {
      console.error("Failed to update donation status:", error.response?.data || error.message);
      alert("Failed to update donation status.");
    }
  };
  
  
  return (
    <div className={styles.containers}>
      <button onClick={handleRaiseNeed} disabled={raised}>
      {raised ? "Need Raised ✅" : "Raise a Need"}
    </button>
      <h2 className={styles.title}>Received Donation Requests</h2>
      {donations.length === 0 ? (
        <p>No donation requests found.</p>
      ) : (
        <div className={styles.donationList}>
          {donations.map((donation, index) => (
            <div key={index} className={styles.donationCard}>
              <p>
                <strong>User Email:</strong> {donation.user_email}
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
              <div className={styles.buttonContainer}>
              
                <button
                className={styles.acceptButton}
                onClick={() => handleStatusChange(donation.user_email, donation.ngo_email, "Accepted")}
                disabled={donation.status !== "Pending"}
                >
                Accept
                </button>
                <button
                className={styles.completedButton}
                onClick={() => handleStatusChange(donation.user_email, donation.ngo_email, "Completed")}
                disabled={donation.status !== "Accepted"}
                >
                Completed
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}