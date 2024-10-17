import React, { useState } from 'react';
import axios from 'axios';
import './DoctorForm.css';  // You can use similar CSS as the employee form

function AddDoctorForm() {
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    age: '',
    area: '',
    specialization: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For fullName, update the state without "Dr. " prefix
    setDoctorData({
      ...doctorData,
      [name]: name === 'fullName' ? value.replace(/^Dr\. /, '') : value,
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

    // Add prefix "Dr. " to the fullName for submission
    const formattedFullName = `Dr. ${doctorData.fullName}`;

    const formData = new FormData();
    formData.append('fullName', formattedFullName); // Use the formatted name
    for (const key in doctorData) {
      if (key !== 'fullName') {
        formData.append(key, doctorData[key]);
      }
    }

    axios
      .post('http://localhost/MediMetrics/website/submit-doctor.php', formData) // Adjust endpoint for doctors
      .then((response) => {
        console.log('Doctor added successfully:', response.data);
        handleReset(); // Reset form after submission
      })
      .catch((error) => {
        console.error('There was an error adding the doctor!', error);
      });
  };

  const handleReset = () => {
    setDoctorData({
      fullName: '',
      age: '',
      area: '',
      specialization: '',
      photo: null,
    });
  };

  return (
    <form className="doctor-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={`Dr. ${doctorData.fullName}`} // Show "Dr. " in the input
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
      <button type="submit">Add Doctor</button>
    </form>
  );
}

export default AddDoctorForm;
