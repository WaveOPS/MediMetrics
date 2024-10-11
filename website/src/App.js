import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router
import './App.css';
import Dashboard from './components/Dashboard'; // Dashboard component
import EmployeeForm from './components/EmployeeForm'; // Employee Form component
import DoctorForm from './components/DoctorForm'; // Doctor Form component
import Sidebar from './components/Sidebar'; // Sidebar component

const App = () => {
    return (
        <Router>
            <div className="App">
                {/* Sidebar should be outside of the Routes block to remain static */}
                <Sidebar />

                {/* Define Routes for different components */}
                <div className="main-content">
                    <Routes>
                        {/* Dashboard route */}
                        <Route path="/" element={<Dashboard />} />
                        {/* Employee Form route */}
                        <Route path="/employees" element={<EmployeeForm />} />
                        {/* Doctor Form route */}
                        <Route path="/doctors" element={<DoctorForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
