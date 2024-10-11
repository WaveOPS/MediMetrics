import React from 'react';
import { NavLink } from 'react-router-dom'; // Using NavLink to apply active class to the current route
import './Sidebar.css'; // Sidebar-specific styles

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">GEOMR</div>
            <ul>
                {/* Using NavLink for active styling */}
                <li>
                    <NavLink exact to="/" activeClassName="active">
                        <i className="fas fa-home"></i> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/employees" activeClassName="active">
                        <i className="fas fa-user"></i> Employees
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/doctors" activeClassName="active">
                        <i className="fas fa-user-md"></i> Doctors
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/daily-reports" activeClassName="active">
                        <i className="fas fa-clipboard"></i> Daily Reports
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/previous-records" activeClassName="active">
                        <i className="fas fa-history"></i> Previous Records
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/logout" activeClassName="active">
                        <i className="fas fa-sign-out-alt"></i> Log Out
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
