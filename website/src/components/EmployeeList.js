import React, { useState, useEffect } from 'react';
import './EmployeeList.css';
import EmployeeForm from './EmployeeForm'; // Import the form

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    // Fetch employees from the backend
    useEffect(() => {
        fetch('http://localhost/MediMetrics/website/get-employees.php')
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data); // Set the employee data in state
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    // Function to toggle the form visibility
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="employee-list-page">
            <div className="header">
                <h1>EMPLOYEES</h1>
            </div>

            {/* New container for search bar and Add button */}
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
                                    {/* Use the full URL for the photo by prepending the server path */}
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
                            <td>{employee.id}</td> {/* Changed to employee.id */}
                            <td>
                                <button className="action-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Show the EmployeeForm as an overlay if showForm is true */}
            {showForm && (
                <div className="form-overlay">
                    <div className="overlay-content">
                        <EmployeeForm />
                        <button className="close-btn" onClick={toggleForm}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
