import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css'; // You can add custom styling for the header here

const Header = () => {
    const location = useLocation();
    let pageTitle = '';

    // Determine the page title based on the current route
    switch (location.pathname) {
        case '/':
            pageTitle = 'Dashboard';
            break;
        case '/employees':
            pageTitle = 'Employee List';
            break;
        case '/doctors':
            pageTitle = 'Doctor List';
            break;
        default:
            pageTitle = 'Dashboard';
    }

    return (
        <header className="header">
            <h1>{pageTitle}</h1>
        </header>
    );
};

export default Header;
