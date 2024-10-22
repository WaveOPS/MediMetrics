import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Sidebar.css'; // Sidebar-specific styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartLine, faHistory, faSignOut, faTableList, faUser, faUserDoctor 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false); // Set authentication to false
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="sidebar">
            <div className="logo">MEDIMETRICS</div>
            <ul>
                {/* Using NavLink for active styling */}
                <li>
                    <FontAwesomeIcon icon={faTableList} />
                    <NavLink 
                        exact 
                        to="/dashboard" 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <i className="fas fa-home"></i> Dashboard
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faUser} />
                    <NavLink 
                        to="/employees" 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <i className="fas fa-user"></i> Employees
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faUserDoctor} />
                    <NavLink 
                        to="/doctors" 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <i className="fas fa-user-md"></i> Doctors
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faChartLine} />
                    <NavLink 
                        to="/daily-reports" 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <i className="fas fa-clipboard"></i> Daily Reports
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faHistory} />
                    <NavLink
                        to="/previous-records" 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <i className=" fa-history"></i> Previous Records
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faSignOut} />
                    <button onClick={handleLogout} className="logout-button">
                        <i className="fas fa-sign-out-alt"></i> Log Out
                    </button>
                    
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
