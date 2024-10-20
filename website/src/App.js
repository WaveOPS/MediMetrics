import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import DoctorForm from './components/DoctorForm';
import Sidebar from './components/Sidebar';
import EmployeeForm from './components/EmployeeForm';
<<<<<<< HEAD
import DoctorsDashboard from './components/DoctorsDashboard';
=======
import DoctorList from './components/DoctorList'; // Import DoctorList component
>>>>>>> 6bcc26ef6ca573e1086a147a4adbc03fdbc7bef1

const App = () => {
    return (
        <Router>
            <div className="App">
                {/* Sidebar remains static across routes */}
                <Sidebar />

                {/* Define Routes for different components */}
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeeList />} />
                        <Route path="/employeeform" element={<EmployeeForm />} />
<<<<<<< HEAD
                        {/* <Route path="/doctors" element={<DoctorsDashboard/>} /> */}
                        <Route path="/employeeform" element={<EmployeeForm />} />
                        {/* <Route path="/doctorform" element={<DoctorForm/>} /> */}

                    
=======
                        <Route path="/doctors" element={<DoctorList />} />  {/* Doctor List route */}
                        <Route path="/doctorform" element={<DoctorForm />} /> {/* Doctor Form route */}
>>>>>>> 6bcc26ef6ca573e1086a147a4adbc03fdbc7bef1
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
