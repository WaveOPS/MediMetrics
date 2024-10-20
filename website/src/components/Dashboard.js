import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dashboard.css';
import './Sidebar.css';
import './img/bg2_app.png'

//import { faUser } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        // Fetch employee count from the PHP backend
        axios.get('http://localhost/MediMetrics/website/getEmployeeCount.php') // Make sure the URL is correct
            .then(response => {
                setEmployeeCount(response.data.count);
            })
            .catch(error => {
                console.error('There was an error fetching the employee count!', error);
            });
    }, []);

    return (
        <div className="dashboard-container">
            

            {/* Main Dashboard Section */}
            <div className="main-content">
                <header>
                    <h2>DASHBOARD</h2>
                </header>

                {/* Stats Cards */}
                <div className="stats-cards">
                    <div className="card">
                        <i className="fas fa-users"></i>
                        <div>
                        
                            <h3>Total Employees  </h3>
                            <p>{employeeCount}</p> {/* Display dynamic employee count */}
                            
                        </div>
                    </div>

                    <div className="card">
                        <i className="fas fa-user-md"></i>
                        <div>
                            <h3>Doctors Registered</h3>
                            <p>20</p>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fas fa-map-marker-alt"></i>
                        <div>
                            <h3>Active Employees</h3>
                            <p>09</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
