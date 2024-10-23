import React, { useState } from 'react';
import axios from 'axios';
import './DoctorForm.css';

function AddDoctorForm() {
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    age: '',
    area: '',
    specialization: '',
    photo: null,
  });

  const [selectedLat, setSelectedLat] = useState('');
  const [selectedLng, setSelectedLng] = useState('');

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
        <label>Latitude:</label>
        <input
          type="number"
          step="any"
          value={selectedLat}
          onChange={(e) => setSelectedLat(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Longitude:</label>
        <input
          type="number"
          step="any"
          value={selectedLng}
          onChange={(e) => setSelectedLng(e.target.value)}
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

      <button type="submit">Add Doctor</button>
    </form>
  );
}

export default AddDoctorForm;
