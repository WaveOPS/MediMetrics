import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard'; // Dashboard component
import EmployeeList from './components/EmployeeList'; // Employee List component
import DoctorForm from './components/DoctorForm'; // Doctor Form component
import Sidebar from './components/Sidebar'; // Sidebar component
import EmployeeForm from './components/EmployeeForm';
import DoctorsDashboard from './components/DoctorsDashboard';

const App = () => {
    return (
        <Router>
            <div className="App">
                {/* Sidebar remains static across routes */}
                <Sidebar />

                {/* Define Routes for different components */}
                <div className="main-content">
                    <Routes>
                        {/* Dashboard route */}
                        <Route path="/" element={<Dashboard />} />
                        {/* Employee List route */}
                        <Route path="/employees" element={<EmployeeList />} />
                        {/* Doctor Form route */}
                        <Route path="/employeeform" element={<EmployeeForm />} />
                        {/* <Route path="/doctors" element={<DoctorsDashboard/>} /> */}
                        <Route path="/employeeform" element={<EmployeeForm />} />
                        {/* <Route path="/doctorform" element={<DoctorForm/>} /> */}

                    
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
