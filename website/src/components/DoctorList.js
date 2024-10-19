import React, { useState, useEffect, useRef } from 'react';
import './DoctorList.css';
import DoctorForm from './DoctorForm'; // Import DoctorForm component

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const overlayRef = useRef(null);

    // Fetch doctors from the backend
    useEffect(() => {
        fetch('http://localhost/MediMetrics/website/get-doctors.php')
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data);
            })
            .catch((error) => {
                console.error('Error fetching doctor data:', error);
            });
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowForm(false);
        }
    };

    useEffect(() => {
        if (showForm) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="doctor-list-page">
            <div className="header">
                <h1>DOCTORS</h1>
            </div>

            <div className="search-add-container">
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <button className="add-doctor-btn" onClick={toggleForm}>
                    <i className="fas fa-plus"></i> Add
                </button>
            </div>

            <table className="doctor-table">
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Area</th>
                        <th>Specialization</th>
                        <th>Doctor ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>
                                    <div className="doctor-info">
                                        <img
                                            src={`http://localhost/MediMetrics/website/${doctor.photo}`}
                                            className="doctor-photo"
                                        />
                                        <div>
                                            <span className="doctor-name">{doctor.name}</span>
                                            <br />
                                            <span className="doctor-area">{doctor.area}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.area}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.id}</td>
                                <td>
                                    <button
                                        className="action-btn"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this doctor?")) {
                                                fetch(`http://localhost/MediMetrics/website/delete-doctor.php`, {
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Content-Type': 'application/x-www-form-urlencoded'
                                                    },
                                                    body: `id=${doctor.id}`
                                                })
                                                .then(response => response.json())
                                                .then(data => {
                                                    if (data.status === 'success') {
                                                        console.log(data.message);
                                                        setDoctors(doctors.filter(doc => doc.id !== doctor.id));
                                                    } else {
                                                        console.error('Error deleting doctor:', data.message);
                                                    }
                                                })
                                                .catch(error => {
                                                    console.error('Error deleting doctor:', error);
                                                });
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No doctors found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showForm && (
                <div className="form-overlay">
                    <div className="overlay-content" ref={overlayRef}>
                        <DoctorForm />
                        <button className="close-btn" onClick={toggleForm}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorList;
