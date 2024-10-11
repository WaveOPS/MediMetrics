// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Sidebar-specific styles

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">GEOMR</div>
            <ul>
                <li className="active">
                    <Link to="/">
                        <i className="fas fa-home"></i> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/employees">
                        <i className="fas fa-user"></i> Employees
                    </Link>
                </li>
                <li>
                    <Link to="/doctors">
                        <i className="fas fa-user-md"></i> Doctors
                    </Link>
                </li>
                <li>
                    <Link to="/daily-reports">
                        <i className="fas fa-clipboard"></i> Daily Reports
                    </Link>
                </li>
                <li>
                    <Link to="/previous-records">
                        <i className="fas fa-history"></i> Previous Records
                    </Link>
                </li>
                <li>
                    <Link to="/logout">
                        <i className="fas fa-sign-out-alt"></i> Log Out
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
