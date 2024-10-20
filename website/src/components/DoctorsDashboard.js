// import React, { useState , useEffect, useRef  } from "react";
// import './DoctorsDashboard.css'; // For styling
// import './DoctorForm'
// import AddDoctorForm from "./DoctorForm";

// const doctorsData = [
//   {
//     id: 1,
//     name: "Dr. Esthera Jackson",
//     email: "esthera@simmmple.com",
//     location: "Kharghar",
//     speciality: "Dermatologist",
//   },
//   {
//     id: 2,
//     name: "Dr. Esthera Jackson",
//     email: "esthera@simmmple.com",
//     location: "Matunga",
//     speciality: "Psychiatrist",
//   },
//   {
//     id: 3,
//     name: "Dr. Esthera Jackson",
//     email: "esthera@simmmple.com",
//     location: "Sion",
//     speciality: "Psychiatrist",
//   },
//   {
//     id: 4,
//     name: "Dr. Esthera Jackson",
//     email: "esthera@simmmple.com",
//     location: "Santacruz",
//     speciality: "Psychiatrist",
//   },
//   {
//     id: 5,
//     name: "Dr. Esthera Jackson",
//     email: "esthera@simmmple.com",
//     location: "Dadar",
//     speciality: "Psychiatrist",
//   },
//   {
//     id: 6,
//     name: "Dr. Esthera Jackson",
//     email: "esthera@simmmple.com",
//     location: "Belapur",
//     speciality: "Psychiatrist",
//   },
// ];

// function DoctorsDashboard() {
//   const [doctors, setDoctors] = useState(doctorsData);

//   const handleEdit = (id) => {
//     alert(`Edit Doctor with ID: ${id}`);
//   };

//   return (
//     <div className="dashboard">
      

//       <div className="content">
//         <h2>DOCTORS</h2>
//         <div className="search-add-container">
//                 <div className="search-bar">
//                     <i className="fas fa-search"></i>
//                     <input
//                         type="text"
//                         placeholder="Search employees..."
//                         // value={searchTerm}
//                         // onChange={handleSearchChange}
//                     />
//                 </div>
//                 <button>Add</button>
//                 {/* { <button className="add-doctor-btn" onClick={toggleForm}>
//                     <i className="fas fa-plus"></i> Add
//                 </button> } */}
//             </div>
//         <table className="doctor-table">
//           <thead>
//             <tr>
//               <th>Doctors</th>
//               <th>Location</th>
//               <th>Speciality</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td>
//                   <div className="doctor-info">
//                     <img
//                       src="https://via.placeholder.com/50"
//                       alt="Doctor"
//                       className="doctor-image"
//                     />
//                     <div>
//                       <h4>{doctor.name}</h4>
//                       <p>{doctor.email}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{doctor.location}</td>
//                 <td>{doctor.speciality}</td>
//                 <td>
//                   <button onClick={() => handleEdit(doctor.id)}>Edit</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* {showForm && (
//                 <div className="form-overlay">
//                     <div className="overlay-content" ref={overlayRef}>
//                         <AddDoctorForm />
//                         <button className="close-btn" onClick={toggleForm}>Close</button>
//                     </div>
//                 </div>
//             )} */}
//     </div>
//   );
// }

// export default DoctorsDashboard;