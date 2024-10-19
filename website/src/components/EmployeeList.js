import React, { useState, useEffect, useRef } from 'react';
import './EmployeeList.css';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const overlayRef = useRef(null); // Create a reference for the overlay

    // Fetch employees from the backend
    useEffect(() => {
        fetch('http://localhost/MediMetrics/website/get-employees.php')
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    // Function to toggle the form visibility
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Close form when clicking outside the form
    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowForm(false);
        }
    };

    // Add event listener for clicks when the form is open
    useEffect(() => {
        if (showForm) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        // Cleanup event listener on component unmount or form close
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]);

    return (
        <div className="employee-list-page">
            <div className="header">
                <h1>EMPLOYEES</h1>
            </div>

            <div className="search-add-container">
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search employees..." />
                </div>

                <button className="add-employee-btn" onClick={toggleForm}>
                    <i className="fas fa-plus"></i> Add
                </button>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Area</th>
                        <th>Employee ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                <div className="employee-info">
                                    <img 
                                        src={`http://localhost/MediMetrics/website/${employee.photo}`} 
                                        alt="Employee" 
                                        className="employee-photo" 
                                    />
                                    <div>
                                        <span className="employee-name">{employee.name}</span>
                                        <br />
                                        <span className="employee-username">{employee.username}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{employee.area}</td>
                            <td>{employee.id}</td>
                            <td>
                                <button className="action-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <div className="form-overlay">
                    <div className="overlay-content" ref={overlayRef}>
                        <EmployeeForm />
                        <button className="close-btn" onClick={toggleForm}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
