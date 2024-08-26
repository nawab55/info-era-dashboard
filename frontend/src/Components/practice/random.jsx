// import { Link } from 'react-router-dom';

// const AdminNavbar = () => {
//   return (
//     <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-gray-800 text-white" id="layout-navbar">
//       <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
//         <Link to="#" className="nav-item nav-link px-0 me-xl-4">
//           <i className="bx bx-menu bx-sm text-white"></i>
//         </Link>
//       </div>

//       <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
//         {/* Search */}
//         <div className="navbar-nav align-items-center">
//           <div className="nav-item d-flex align-items-center">
//             <i className="bx bx-search fs-4 lh-0 text-white"></i>
//             <input type="text" className="form-control border-0 shadow-none bg-gray-700 text-white placeholder-gray-400" placeholder="Search..." aria-label="Search..." />
//           </div>
//         </div>
//         {/* /Search */}

//         <ul className="navbar-nav flex-row align-items-center ms-auto">
//           {/* User */}
//           <li className="nav-item navbar-dropdown dropdown-user dropdown">
//             <Link to="#" className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
//               <div className="avatar avatar-online">
//                 <img src="../assets/img/avatars/1.png" alt="User" className="w-10 h-10 rounded-full" />
//               </div>
//             </Link>
//             <ul className="dropdown-menu dropdown-menu-end bg-gray-800 text-white">
//               <li>
//                 <Link to="#" className="dropdown-item">
//                   <div className="d-flex">
//                     <div className="flex-shrink-0 me-3">
//                       <div className="avatar avatar-online">
//                         <img src="../assets/img/avatars/1.png" alt="User" className="w-10 h-10 rounded-full" />
//                       </div>
//                     </div>
//                     <div className="flex-grow-1">
//                       <span id="Label1" className="fw-semibold d-block">Rahul Raj</span>
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <div className="dropdown-divider border-gray-600"></div>
//               </li>
//               <li>
//                 <Link to="#" className="dropdown-item">
//                   <i className="bx bx-user me-2"></i>
//                   <span className="align-middle">My Profile</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="#" className="dropdown-item">
//                   <i className="bx bx-cog me-2"></i>
//                   <span className="align-middle">Settings</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="#" className="dropdown-item">
//                   <span className="d-flex align-items-center align-middle">
//                     <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
//                     <span className="flex-grow-1 align-middle">Billing</span>
//                     <span className="flex-shrink-0 badge badge-center rounded-pill bg-red-600 w-5 h-5">4</span>
//                   </span>
//                 </Link>
//               </li>
//               <li>
//                 <div className="dropdown-divider border-gray-600"></div>
//               </li>
//               <li>
//                 <center>
//                   <Link to="#" id="LinkButton1" className="btn btn-primary btn-sm">
//                     Log Out
//                   </Link>
//                 </center>
//               </li>
//             </ul>
//           </li>
//           {/*/ User */}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default AdminNavbar;



// /* eslint-disable react/prop-types */
// import React from 'react';
// import logo from '/infoera.png';
// import headerImage from '/certificate-header.png';
// import footerImage from '/certificate-footer.png';

// const CertificatePage = React.forwardRef(({ certificateData }, ref) => {
//   return (
//     <div ref={ref} className="p-8 border border-gray-300" style={{ height: '100vh', padding: 0 }}>
//       <div style={{ width: '100%', height: '100%' }}>
//         {/* Header Image */}
//         <div>
//           <img src={headerImage} alt="Certificate Header" style={{ width: '100%', height: '200px' }} />
//         </div>

//         {/* Main Content */}
//         <div style={{ textAlign: 'center', marginTop: '-10px' }}>
//           <table style={{ width: '100%', marginBottom: '10px', height: '100px' }}>
//             <tbody>
//               <tr>
//                 <td width="20%">&nbsp;</td>
//                 <td width="20%">
//                   <img src={logo} alt="Company Logo" style={{ width: '50%' }} />
//                   <h4 style={{ marginTop: '-10px' }}>Info Era Software Services Pvt. Ltd.</h4>
//                 </td>
//                 <td width="60%">&nbsp;</td>
//               </tr>
//               <tr>
//                 <td width="20%">&nbsp;</td>
//                 <td width="40%">
//                   <h1>CERTIFICATE<br />
//                     <span style={{ fontSize: '20px', textAlign: 'center' }}>OF COMPLETION</span>
//                   </h1>
//                 </td>
//                 <td width="40%">&nbsp;</td>
//               </tr>
//               <tr>
//                 <td width="30%">&nbsp;</td>
//                 <td width="40%">
//                   <h3>To Whom It May Concern</h3>
//                 </td>
//                 <td width="30%">&nbsp;</td>
//               </tr>
//             </tbody>
//           </table>

//           <table style={{ width: '100%', marginBottom: '10px', height: '100px' }}>
//             <tbody>
//               <tr>
//                 <td width="20%">&nbsp;</td>
//                 <td width="60%">
//                   <p>
//                     This is to certify that <b>{certificateData.studentName}</b>, 
//                     a student of {certificateData.course} 
//                     <span> Final Year</span> from {certificateData.collegeName} has successfully 
//                     completed his internship at <b>Info Era Software Services Pvt. Ltd.</b> Patna 
//                     from {certificateData.fromDate} to {certificateData.toDate}.
//                   </p>
//                 </td>
//                 <td width="20%">&nbsp;</td>
//               </tr>
//             </tbody>
//           </table>

//           <table style={{ width: '100%', marginBottom: '10px', height: '100px' }}>
//             <tbody>
//               <tr>
//                 <td width="20%">&nbsp;</td>
//                 <td width="60%">
//                   <p>
//                     This work entitled <b>{certificateData.projectName}</b> done 
//                     by <span>{certificateData.studentName}</span>, 
//                     his conduct and performance during this period was excellent.
//                   </p>
//                 </td>
//                 <td width="20%">&nbsp;</td>
//               </tr>
//             </tbody>
//           </table>

//           <table style={{ width: '100%', marginBottom: '10px', height: '100px' }}>
//             <tbody>
//               <tr>
//                 <td width="25%">&nbsp;</td>
//                 <td width="50%">
//                   <p><i>We wish him all the best in his future endeavors</i></p>
//                 </td>
//                 <td width="25%">&nbsp;</td>
//               </tr>
//             </tbody>
//           </table>

//           <table style={{ width: '100%', height: '100px' }}>
//             <tbody>
//               <tr>
//                 <td width="60%">&nbsp;</td>
//                 <td width="40%">
//                   <h4 style={{ textAlign: 'center', borderTop: '1px solid black' }}>
//                     RAHUL RAJ<br />
//                     <span style={{ fontSize: '12px' }}>MANAGING DIRECTOR</span>
//                   </h4>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Footer Image */}
//         <div>
//           <img src={footerImage} alt="Certificate Footer" style={{ width: '100%', height: '80px' }} />
//         </div>
//       </div>
//     </div>
//   );
// });

// // Assigning a display name to the component to avoid the ESLint warning
// CertificatePage.displayName = 'CertificatePage';

// export default CertificatePage;