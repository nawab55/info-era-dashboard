// import { useState } from 'react';
// import { FaPencilAlt } from 'react-icons/fa';
// import { MdClose } from 'react-icons/md';
// import { AiOutlineFilter, AiOutlineSortAscending } from 'react-icons/ai'; // Importing icons for filter and sort
// import { BsClock } from 'react-icons/bs'; // Clock Icon
// import CustomModal from '../../Components/Modal/CustomModal';  // Import your custom modal

// const LeaveApplication = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [leaveRequests, setLeaveRequests] = useState([]);  // State for Leave Request
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 9;

//   // Function to handle modal open/close
//   const handleModal = () => {
//     setOpenModal(!openModal);
//   };

//   //Function to handle leave request form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newLeaveRequest = {
//       type: event.target.leaveType.value,
//       fromDate: event.target.fromDate.value,
//       toDate: event.target.toDate.value,
//       reason: event.target.reason.value,
//       status: 'Pending',
//       appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}) // Current Date
//     };
//     setLeaveRequests([...leaveRequests, newLeaveRequest]);
//     handleModal();
//   };

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRequests = leaveRequests.slice(indexOfFirstItem, indexOfLastItem);

//   const nextPage = () => {
//     if(indexOfLastItem < leaveRequests.length){
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const previousPage = () => {
//     if(currentPage > 1 ){
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <section className="md:ml-56 mt-16 bg-gray-50 p-4">
//       {/* Top Card Section */}
//       <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
//         <div className='flex items-center my-auto'>
//           <div className='w-2 bg-purple-600 h-8 mr-3 rounded-full'></div>
//           <h1 className="text-2xl font-bold text-gray-900">Leaves</h1>
//         </div>
//         <button 
//           onClick={handleModal} 
//           className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//         >
//           <FaPencilAlt className="mr-2" />
//           Leave Request
//         </button>
//       </div>

//       {/* Leave History Section */}
//       <div className='mt-8 bg-white p-4 shadow-md rounded-lg'>
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             {/* Vertical Line */}
//             <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
//             <h2 className="text-lg font-semibold text-gray-900">Leave History</h2>
//           </div>
//           {/* Filter and Sort Icons */}
//           <div className="flex items-center space-x-4">
//           <button className="flex items-center bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
//               <AiOutlineFilter className="mr-2" />
//               Filter
//             </button>
//             <button className="flex items-center bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
//               <AiOutlineSortAscending className="mr-2" />
//               Sort
//             </button>
//           </div>
//         </div>
//         {/* Leave History Cards (Max 9 per page) */}
//         <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//           {currentRequests.map((request, index) => (
//             <div key={index} className='bg-blue-50 p-4 rounded-lg shadow-md'>
//               <div className="flex justify-between items-center mb-2">
//                 <div className="flex items-center">
//                 <BsClock className="mr-2 text-gray-500" />
//                 <span className="text-sm text-gray-600">{request.appliedDate}</span>
//                 </div>
//                 <span className="text-sm text-purple-600 font-bold">{request.status}</span>
//               </div>
//               <p className="text-md font-semibold text-blue-gray-700">{request.type}</p>
//               <div className='flex justify-between'>
//                 <p className="text-sm font-semibold text-gray-600">From :<span className='pl-2 font-normal'>{request.fromDate}</span> </p>
//                 <p className="text-sm font-semibold text-gray-600">To :<span className='pl-2 font-normal'>{request.toDate}</span></p>
//               </div>
//               <p className="text-sm font-semibold text-gray-600">Reason:<span className='ml-2 font-normal'>{request.reason}</span></p>
//             </div>
//           ))}
//         </div>
        
//         {/* Pagination */}
//         <div className="flex justify-end mt-6 space-x-2">
//         <button 
//             className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'} rounded-lg`}
//             onClick={previousPage} disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 bg-purple-600 text-white rounded-lg">{currentPage}</span>
//           <button 
//             className={`px-4 py-2 ${indexOfLastItem >= leaveRequests.length ? 'bg-gray-300' : 'bg-gray-200'} rounded-lg`}
//             onClick={nextPage} disabled={indexOfLastItem >= leaveRequests.length}
//           >
//             Next
//           </button>
//         </div>
//       </div>


 {/* Custom Modal Section */}
//  <CustomModal isOpen={openModal} onClose={handleModal}>
//  <div className="bg-blue-50 w-full p-6 rounded-lg shadow-lg">
//    {/* Modal Header */}
//    <div className="flex justify-between items-center mb-6">
//      <h2 className="text-xl font-semibold">Leave Request</h2>
//      <button onClick={handleModal} className="text-2xl">
//        <MdClose />
//      </button>
//    </div>

   {/* Form Content */}
   {/* <form onSubmit={handleSubmit}>  */}
     {/* Leave Type Dropdown */}
     {/* <div className="mb-4">
       <label className="block mb-2 text-gray-700">Leave Type</label>
       <select 
         name="leaveType" 
         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
         required
       >
         <option value="">Select Leave Type</option>
         <option value="Sick Leave">Sick Leave</option>
         <option value="Casual Leave">Casual Leave</option>
         <option value="Paid Leave">Paid Leave</option>
       </select>
     </div> */}

     {/* From Date Input */}
     {/* <div className="mb-4">
       <label className="block mb-2 text-gray-700">From Date</label>
       <input 
         type="date" 
         name="fromDate" 
         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
         required
       />
     </div> */}

     {/* To Date Input */}
     {/* <div className="mb-4">
       <label className="block mb-2 text-gray-700">To Date</label>
       <input 
         type="date" 
         name="toDate" 
         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
         required
       />
     </div> */}

     {/* Reason Input */}
     {/* <div className="mb-4">
       <label className="block mb-2 text-gray-700">Reason</label>
       <textarea 
         name="reason" 
         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
         rows="4"
         required
       />
     </div> */}

     {/* Submit Button */}
     {/* <div className="text-right">
       <button 
         type="submit" 
         className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
       >
         Submit Leave Request
       </button>
     </div>
   </form>
 </div>
</CustomModal> */}


//       {/* Custom Modal Section */}
//       <CustomModal isOpen={openModal} onClose={handleModal}>
//         <div className="bg-blue-50 w-full p-6 rounded-lg shadow-lg">
//           {/* Modal Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Leave Request</h2>
//             <button onClick={handleModal} className="text-2xl">
//               <MdClose />
//             </button>
//           </div>

//           {/* Form Content */}
//           <form onSubmit={handleSubmit}> 
//             {/* Leave Type Dropdown */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-700">Leave Type</label>
//               <select name="leaveType" className="w-full p-2 border border-gray-300 rounded-lg">
//                 <option value="">Choose Leave Type</option>
//                 <option>Casual Leave</option>
//                 <option>Sick Leave</option>
//                 <option>Paid Leave</option>
//                 <option>Monthly Leave</option>
//                 <option>Other</option>
//               </select>
//             </div>

//             {/* Date Range */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block mb-2 text-gray-700">From</label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 text-gray-700">To</label>
//                 <input type="date" name="toDate" className="w-full p-2 border border-gray-300 rounded-lg" required/>
//               </div>
//             </div>

//             {/* Reason Textarea */}
//             <div className="mb-6">
//               <label className="block mb-2 text-gray-700">Reason</label>
//               <textarea
//                 rows="4"
//                 name='reason'
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Enter your reason here"
//                 required
//               ></textarea>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={handleModal}
//                 className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg bg-gray-100 hover:bg-gray-300 transition duration-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
//               >
//                 Request Now
//               </button>
//             </div>
//           </form>
//         </div>
//       </CustomModal>
//     </section>
//   );
// };

// export default LeaveApplication;