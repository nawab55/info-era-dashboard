// import { useState, useRef } from "react";
// import api from "../../../../config/api";
// import { toast } from "react-toastify";
// import { useReactToPrint } from "react-to-print";
// import CertificatePage from "./CertificatePage";

// const PrintCertificate = () => {
//   const [regNo, setRegNo] = useState("");
//   const [certificateData, setCertificateData] = useState(null);
//   const certificateRef = useRef();

//   const handleInputChange = (e) => {
//     setRegNo(e.target.value);
//   };

//   const handleViewClick = async () => {
//     try {
//       const response = await api.get(`/api/certificate/get-by-regno/${regNo}`);
//       setCertificateData(response.data);
//     } catch (error) {
//       toast.error("Certificate not Found for this Registration Number.");
//       console.error("Error fetching certificate", error);
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => certificateRef.current,
//   });

//   return (
//     <section className="md:ml-60 bg-inherit p-4">
//       <div className="flex justify-center mb-4">
//         <div className="flex flex-col w-80">
//           <label className="text-gray-700 text-lg mb-2">Registration No</label>
//           <input
//             type="text"
//             value={regNo}
//             onChange={handleInputChange}
//             placeholder="Registration No"
//             className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 focus:placeholder:translate-x-1 transition-all duration-300 ease-in-out"
//           />
//         </div>
//         <button
//           onClick={handleViewClick}
//           className="ml-4 h-12 px-6 mt-8 bg-blue-500 text-white rounded-lg"
//         >
//           View
//         </button>
//       </div>
//       {certificateData && (
//         <>
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-blue-500 text-white">
//               <tr>
//                 <th className="py-2 px-4 border-b text-left">ID</th>
//                 <th className="py-2 px-4 border-b text-left">Year</th>
//                 <th className="py-2 px-4 border-b text-left">College Name</th>
//                 <th className="py-2 px-4 border-b text-left">Reg No</th>
//                 <th className="py-2 px-4 border-b text-left">Student Name</th>
//                 <th className="py-2 px-4 border-b text-left">Project Name</th>
//                 <th className="py-2 px-4 border-b text-left">Language</th>
//                 <th className="py-2 px-4 border-b text-left">To Date</th>
//                 <th className="py-2 px-4 border-b text-left">From Date</th>
//                 <th className="py-2 px-4 border-b text-left">Print</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="py-2 px-4 border-b text-left">{certificateData._id}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.year}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.collegeName}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.regNo}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.studentName}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.projectName}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.language}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.toDate}</td>
//                 <td className="py-2 px-4 border-b text-left">{certificateData.fromDate}</td>
//                 <td className="py-2 px-4 border-b text-left">
//                   <button
//                     onClick={handlePrint}
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg"
//                   >
//                     Print
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <div style={{ display: 'none' }}>
//             <CertificatePage ref={certificateRef} certificateData={certificateData} />
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default PrintCertificate;

import { useState, useRef } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import CertificatePage from "./CertificatePage";
import { AiOutlinePrinter } from "react-icons/ai"; // Import a print icon from react-icons

const PrintCertificate = () => {
  const [regNo, setRegNo] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const certificateRef = useRef();

  const handleInputChange = (e) => {
    setRegNo(e.target.value);
  };

  const handleViewClick = async () => {
    try {
      const response = await api.get(`/api/certificate/get-by-regno/${regNo}`);
      setCertificateData(response.data);
    } catch (error) {
      toast.error("Certificate not Found for this Registration Number.");
      console.error("Error fetching certificate", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="md:ml-60 bg-inherit p-4">
      <div className="flex justify-center mb-4">
        <div className="flex flex-col w-80">
          <label className="text-gray-700 text-lg mb-2">Registration No</label>
          <input
            type="text"
            value={regNo}
            onChange={handleInputChange}
            placeholder="Registration No"
            className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 focus:placeholder:translate-x-1 transition-all duration-300 ease-in-out"
          />
        </div>
        <button
          onClick={handleViewClick}
          className="ml-4 h-12 px-6 mt-8 bg-blue-500 text-white rounded-lg"
        >
          View
        </button>
      </div>
      {certificateData && (
        <>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Year</th>
                <th className="py-2 px-4 border-b text-left">College Name</th>
                <th className="py-2 px-4 border-b text-left">Reg No</th>
                <th className="py-2 px-4 border-b text-left">Student Name</th>
                <th className="py-2 px-4 border-b text-left">Project Name</th>
                <th className="py-2 px-4 border-b text-left">Language</th>
                <th className="py-2 px-4 border-b text-left">To Date</th>
                <th className="py-2 px-4 border-b text-left">From Date</th>
                <th className="py-2 px-4 border-b text-left">
                  Print
                  {/* <button
                    onClick={openModal} // Open modal instead of direct print
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Print
                  </button> */}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData._id}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.year}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.collegeName}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.regNo}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.studentName}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.projectName}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.language}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.toDate}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {certificateData.fromDate}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  <button
                    onClick={openModal}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Print
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white w-3/4 h-5/6 p-6 overflow-y-auto relative">
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-4xl text-gray-500 hover:text-red-700"
                >
                  &times;
                </button>
                <CertificatePage
                  ref={certificateRef}
                  certificateData={certificateData}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handlePrint}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    <AiOutlinePrinter className="mr-2" /> Print
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PrintCertificate;
