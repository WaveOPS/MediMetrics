import React from 'react';
import { NavLink } from 'react-router-dom'; // Using NavLink to apply active class to the current route
import './Sidebar.css'; // Sidebar-specific styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDashboard, faHistory, faSignOut, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">MEDIMETRICS</div>
            <ul>
                {/* Using NavLink for active styling */}
                <li>
                <FontAwesomeIcon icon={faDashboard} />
                    <NavLink exact to="/" activeClassName="active" >
                        <i className="fas fa-home"></i> Dashboard
                    </NavLink>
                </li>
                <li>
                    <FontAwesomeIcon icon={faUser} />
                    <NavLink to="/employees" activeClassName="active">
                        <i className="fas fa-user" ></i>Employees
                    </NavLink>
                </li>
                <li>
                <FontAwesomeIcon icon={faUserDoctor} />
                    <NavLink to="/doctors" activeClassName="active">
                        <i className="fas fa-user-md"></i> Doctors
                    </NavLink>
                </li>
                <li>
                <FontAwesomeIcon icon={faChartLine} />
                    <NavLink to="/daily-reports" activeClassName="active">
                        <i className="fas fa-clipboard"></i> Daily Reports
                    </NavLink>
                </li>
                <li>
                <FontAwesomeIcon icon={faHistory} />
                    <NavLink to="/previous-records" activeClassName="active">
                        <i className="fas fa-history"></i> Previous Records
                    </NavLink>
                </li>
                <li>
                <FontAwesomeIcon icon={faSignOut} />
                    <NavLink to="/logout" activeClassName="active">
                        <i className="fas fa-sign-out-alt"></i> Log Out
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
