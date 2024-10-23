import React, { useEffect, useState } from 'react';
import './DailyReports.css'; // Add your CSS for styling

const DailyReports = () => {
  const [employees, setEmployees] = useState([]); // State to store the fetched employee data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [expandedRows, setExpandedRows] = useState([]); // State to track expanded rows
  const [tourPlans, setTourPlans] = useState({}); // State to store tour plans for each employee

  // Fetch employee data from your backend
  useEffect(() => {
    // Fetch employees
    fetch('http://localhost/MediMetrics/website/get-employees.php') // Adjust the URL
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data); // Store data in state
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      });

    // Fetch all tour plans at once
    fetch('http://localhost/MediMetrics/website/get-tour-plans.php') // Fetch all tour plans
      .then((response) => response.json())
      .then((data) => {
        const plansByEmployeeId = {};
        data.forEach(plan => {
          const employeeId = plan.employee_id;
          if (!plansByEmployeeId[employeeId]) {
            plansByEmployeeId[employeeId] = []; // Initialize array if it doesn't exist
          }
          plansByEmployeeId[employeeId].push(plan); // Push the plan to the corresponding employee
        });
        setTourPlans(plansByEmployeeId); // Set organized tour plans by employee ID
      })
      .catch((error) => {
        console.error('Error fetching tour plans:', error);
      });
  }, []);

  // Toggle the expansion of a row
  const toggleRowExpansion = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id)); // Collapse the row
    } else {
      setExpandedRows([...expandedRows, id]); // Expand the row
    }
  };

  // Check if the row is expanded
  const isRowExpanded = (id) => expandedRows.includes(id);

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="daily-reports-container">
      <header>
        <h1>Daily Reports</h1>
        <p>{new Date().toDateString()}</p>
      </header>

      <div className="reports-table">
        <div className="table-header">
          <span>Employees</span>
          <span>Status</span>
          <span>Currently Visiting</span>
          <span>Action</span>
        </div>

        <div className="table-content">
          {employees.map((employee) => (
            <div key={employee.id}>
              <div className="table-row" onClick={() => toggleRowExpansion(employee.id)}>
                <span className="employee-info">
                  {/* Display employee photo */}
                  <img 
                    src={`http://localhost/MediMetrics/website/${employee.photo}`} 
                    alt={`${employee.name}'s photo`} 
                    className="employee-photo"
                  />
                  {/* Display employee name */}
                  <span className="employee-name">{employee.name}</span>
                </span>
                <span className="pending-status">Pending</span> {/* Fixed status */}
                <span>{employee.visiting || 'Not Available'}</span> {/* Visiting info or fallback */}
                <span className={`dropdown-symbol ${isRowExpanded(employee.id) ? 'expanded' : ''}`}>
                  &#9660; {/* Downward chevron symbol */}
                </span>
              </div>

              {/* Expanded content */}
              {isRowExpanded(employee.id) && (
                <div className="expanded-row">
                  {tourPlans[employee.id] && tourPlans[employee.id].length > 0 ? (
                    <div>
                      <h4 style={{ marginLeft: '60px', color: '#3a7bd5' }}>Tour Plans</h4>
                      <div className="tour-plans-container">
                        <div className="tour-plans-header">
                          
                          <span style={{ marginLeft: '220px', fontWeight: 'bold' }}>Tour Status</span> {/* Tour Status Header */}
                        </div>
                        <ul className="tour-plans-list"> {/* Added class for styling */}
                          {tourPlans[employee.id].map((plan) => {
                            // Parse the doctor list from JSON string
                            const doctors = JSON.parse(plan.doctor_list);
                            return (
                              <li key={plan.id} className="tour-plan-item"> {/* Added class for styling */}
                                <span>
                                  <ul>
                                    {/* Display only doctor names */}
                                    {doctors.map((doctor, index) => (
                                      <li key={index}>
                                        {doctor.dr_name} {/* Only doctor name */}
                                      </li>
                                    ))}
                                  </ul>
                                </span>
                                <span style={{ marginLeft: '20px' }}></span> {/* Display "Pending" for each tour plan */}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p>No tour plans available for this employee.</p> // Fallback message
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyReports;
