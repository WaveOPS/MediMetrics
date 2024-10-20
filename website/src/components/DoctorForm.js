import React, { useState } from 'react';
import axios from 'axios';
import LocationPicker from './LocationPicker'; // Import the LocationPicker component
import './DoctorForm.css';
import './LocationPicker.css'; // Import CSS for LocationPicker if necessary

function AddDoctorForm() {
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    age: '',
    area: '',
    specialization: '',
    photo: null,
  });

  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLng, setSelectedLng] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false); // State to control map visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setDoctorData({
      ...doctorData,
      photo: e.target.files[0],
    });
  };

  const handleLocationSelect = (lat, lng) => {
    setSelectedLat(lat);
    setSelectedLng(lng);
    setIsMapVisible(false); // Hide the map after selection
  };

  const handleMapToggle = () => {
    setIsMapVisible(!isMapVisible); // Toggle map visibility
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFullName = `Dr. ${doctorData.fullName}`;

    const formData = new FormData();
    formData.append('fullName', formattedFullName);
    for (const key in doctorData) {
      formData.append(key, doctorData[key]);
    }
    formData.append('latitude', selectedLat);
    formData.append('longitude', selectedLng);

    axios
      .post('http://localhost/MediMetrics/website/submit-doctor.php', formData)
      .then((response) => {
        console.log('Doctor added successfully:', response.data);
        // Handle successful submission (reset form, show message, etc.)
      })
      .catch((error) => {
        console.error('There was an error adding the doctor!', error);
      });
  };

  return (
    <form className="doctor-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={doctorData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={doctorData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Photo:</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
        />
      </div>
      <div className="form-group">
        <label>Area:</label>
        <input
          type="text"
          name="area"
          value={doctorData.area}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Specialization:</label>
        <input
          type="text"
          name="specialization"
          value={doctorData.specialization}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Choose Location:</label>
        <button type="button" onClick={handleMapToggle}>
          {isMapVisible ? 'Hide Map' : 'Select Location'}
        </button>
      </div>

      {/* Show the map when isMapVisible is true */}
      {isMapVisible && (
        <div className="map-container">
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </div>
      )}

      {/* Display the selected latitude and longitude below */}
      {selectedLat !== null && selectedLng !== null && (
        <div className="location-display">
          <p>Selected Location:</p>
          <p>Latitude: {selectedLat}</p>
          <p>Longitude: {selectedLng}</p>
        </div>
      )}

      <button type="submit">Add Doctor</button>
    </form>
  );
}

export default AddDoctorForm;
