import React, { useState, useEffect } from 'react';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch employees from the backend
    useEffect(() => {
        fetch('http://localhost/MediMetrics/website/get-employees.php') // Update with your actual PHP URL
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data); // Set the employee data in state
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    return (
        <div className="employee-list-page">
            <div className="header">
                <h1>Employees</h1>
                <button className="add-employee-btn">
                    <i className="fas fa-plus"></i> Add Employees
                </button>
            </div>

            <div className="search-bar">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search employees..." />
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
                        <tr key={employee.id}> {/* Assuming 'id' is the unique identifier */}
                            <td>
                                <div className="employee-info">
                                    <img src={employee.photo} alt={employee.name} className="employee-photo" />
                                    <div>
                                        <span className="employee-name">{employee.name}</span>
                                        <br />
                                        <span className="employee-username">{employee.username}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{employee.area}</td>
                            <td>{employee.employee_id}</td>
                            <td>
                                <button className="action-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
