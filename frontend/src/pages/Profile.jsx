import React, { useState, useEffect } from "react";
import "../styles/Profile.css"; // Import CSS styles

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetch(`http://localhost:5000/${storedUser.role === "ngo" ? "ngos" : "users"}/${storedUser.email}`)
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setFormData(data);
        });
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // Call backend API to update data here
    setProfile(formData);
    setEditMode(false);
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="card-container">
      <div className="card">
        <div className="top-bar"></div>

        <div className="avatar-container">
          <img
            src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt="Profile"
            className="avatar"
          />
        </div>

        <div className="info">
          {editMode ? (
            <>
              <input name="name" value={formData.name} onChange={handleChange} />
              <input name="email" value={formData.email} onChange={handleChange} />
              <input name="phone" value={formData.phone} onChange={handleChange} />
              <input name="address" value={formData.address} onChange={handleChange} />
              <input name="age" value={formData.age} onChange={handleChange} />
              <button className="btn" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <h2>Name: {profile.name}</h2>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone}</p>
              <p>Address: {profile.address}</p>
              <p>{profile.age ? `Age: ${profile.age}` : ""}</p>
              <button className="btn" onClick={() => setEditMode(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
