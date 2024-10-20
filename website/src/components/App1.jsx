import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App1.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import DoctorForm from './components/DoctorForm';
import Sidebar from './components/Sidebar';
import EmployeeForm from './components/EmployeeForm';
import DoctorList from './components/DoctorList'; // Import DoctorList component

const App1 = () => {
    return (
      
        <Router>
            <div className="App">
                {/* Sidebar remains static across routes */}

              
                  {/* <Login /> */}
                


                <div>
                  <Sidebar />
                </div>
                

                {/* Define Routes for different components */}
                
                
                
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeeList />} />
                        <Route path="/employeeform" element={<EmployeeForm />} />
                        <Route path="/doctors" element={<DoctorList />} />  
                        <Route path="/doctorform" element={<DoctorForm />} /> 
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App1;