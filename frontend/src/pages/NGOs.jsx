import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/NGOs.module.css"; // Import CSS module for orange theme

export default function NGOs() {
  const [ngos, setNgos] = useState([]);
  const [donationFormVisible, setDonationFormVisible] = useState(false); // Track form visibility
  const [selectedNgo, setSelectedNgo] = useState(null); // Track the selected NGO for donation
  const [formData, setFormData] = useState({
    numberOfClothes: "",
    type: "",
    takeawayDate: "",
  }); // Donation form data
  const [searchQuery, setSearchQuery] = useState(""); // Track search query

  useEffect(() => {
    axios.get("http://localhost:5000/ngos/list").then((res) => setNgos(res.data));
  }, []);

  const handleDonateClick = (ngo) => {
    setSelectedNgo(ngo); // Set the selected NGO
    setDonationFormVisible(true); // Show the modal
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload

    const userEmail = localStorage.getItem("userEmail"); // Retrieve email from localStorage

    const payload = {
      user_email: userEmail, // Include user's email
      clothes_details: {
        number_of_clothes: formData.numberOfClothes,
        type: formData.type,
      },
      takeaway_date: formData.takeawayDate,
      ngo_details: {
        name: selectedNgo.ngo_name, // NGO Name
        email: selectedNgo.email, // NGO Email
      },
    };

    try {
      await axios.post("http://localhost:5000/donations/create", payload);
      alert("Donation submitted successfully!");
      setDonationFormVisible(false); // Hide the modal
      setFormData({ numberOfClothes: "", type: "", takeawayDate: "" }); // Reset form data
    } catch (error) {
      console.error("Failed to submit donation:", error.response?.data || error.message);
      alert("Failed to submit donation.");
    }
  };

  // Filter the NGOs based on the search query
  const filteredNgos = ngos.filter((ngo) =>
    ngo.ngo_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ngo.ngo_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ngo.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>NGOs & Orphanages</h2>

      {/* Search Bar */}
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search by NGO name, type, or address..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

<div className={styles.ngoList}>
  {filteredNgos.length === 0 ? (
    <p>No NGOs found.</p>
  ) : (
    filteredNgos.map((ngo, index) => (
      <div key={index} className={styles.ngoCard}>
        {/* Red dot indicator */}
        {ngo.needRaised && (
          <span className={styles.redDot} title="Need Raised"></span>
        )}

        <img src={ngo.image_url} alt={ngo.ngo_name} className={styles.ngoImage} />
        <div className={styles.ngoInfo}>
          <h3>
            {ngo.ngo_name} {ngo.needRaised && <span className={styles.redText}>🔴</span>}
          </h3>
          <p><strong>Address:</strong> {ngo.address}</p>
          <p><strong>Type:</strong> {ngo.ngo_type}</p>
          <p><strong>Phone:</strong> {ngo.phone}</p>
          <button
            className={styles.donateButton}
            onClick={() => handleDonateClick(ngo)}
          >
            Donate
          </button>
        </div>
      </div>
    ))
  )}
</div>


      {/* Modal Donation Form */}
      {donationFormVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span
              className={styles.closeButton}
              onClick={() => setDonationFormVisible(false)} // Close modal
            >
              &times;
            </span>
            <h3>Donate to {selectedNgo.ngo_name}</h3>
            <form className={styles.donationForm} onSubmit={handleFormSubmit}>
              <input
                type="number"
                name="numberOfClothes"
                placeholder="Number of Clothes"
                value={formData.numberOfClothes}
                onChange={handleFormChange}
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Type of Clothes"
                value={formData.type}
                onChange={handleFormChange}
                required
              />
              <input
                type="date"
                name="takeawayDate"
                placeholder="Takeaway Date"
                value={formData.takeawayDate}
                onChange={handleFormChange}
                required
              />
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
