import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import DoctorForm from './components/DoctorForm';
import Sidebar from './components/Sidebar';
import EmployeeForm from './components/EmployeeForm';
import DoctorList from './components/DoctorList';
import './components/img/bg2_app.png'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

    return (
        <Router>
            <div className="App">
                {/* Conditionally render sidebar only if authenticated */}
                {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated}/>}

                <div className="main-content">
                    <Routes>
                        {/* Show Login if not authenticated */}
                        <Route 
                            path="/" 
                            element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} 
                        />
                        <Route 
                            path="/dashboard" 
                            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
                        />
                        <Route 
                            path="/employees" 
                            element={isAuthenticated ? <EmployeeList /> : <Navigate to="/" />} 
                        />
                        <Route 
                            path="/employeeform" 
                            element={isAuthenticated ? <EmployeeForm /> : <Navigate to="/" />} 
                        />
                        <Route 
                            path="/doctors" 
                            element={isAuthenticated ? <DoctorList /> : <Navigate to="/" />} 
                        />
                        <Route 
                            path="/doctorform" 
                            element={isAuthenticated ? <DoctorForm /> : <Navigate to="/" />} 
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
