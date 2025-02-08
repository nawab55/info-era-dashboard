/* eslint-disable react/prop-types */
import { useEffect, useState, forwardRef } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { Eye, Edit2, FileText } from "lucide-react";
import Modal from "react-modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoicePrint from "./InvoicePrint";
import { useNavigate } from "react-router-dom";

const InvoiceReports = () => {
  // // CSS variables for animations
  const slidingLineStyle = {
    "--sliding-line": `
      @keyframes slide {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `
  };

  // Add the style tag to inject the animation
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = slidingLineStyle["--sliding-line"];
    document.head.appendChild(styleTag);
    return () => styleTag.remove();
  }, []);

  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/api/invoices/get-invoices");
        setReports(response.data.invoices);
        setFilteredReports(response.data.invoices);
      } catch (error) {
        console.error("Error fetching invoices", error);
        toast.error("Failed to fetch invoices");
      } finally {
        setTimeout(() => setIsLoading(false), 500); // Small delay for smoother transition
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = reports.filter((report) => {
        const invoiceDate = parse(report.date, "dd/MM/yyyy", new Date());
        return isWithinInterval(invoiceDate, {
          start: startOfDay(startDate),
          end: endOfDay(endDate)
        });
      });
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [startDate, endDate, reports]);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      className="flex items-center px-4 py-2 text-sm transition-colors duration-200 border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
      ref={ref}
    >
      <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-500" /> {value}
    </button>
  ));

  CustomInput.displayName = "CustomInput"; // Display name for debugging

  const handleViewClick = (report) => {
    setSelectedInvoice(report);
    setIsModalOpen(true);
  };
  const handleEditClick = (report) => {
    console.log(report);
    navigate("/account/invoiceForm", { state: { invoiceReportData: report } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice({});
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("invoice-print-form");

    html2canvas(input, {
      scale: 2, // Increase scale for better quality
      useCORS: true // Enable CORS if you have external images
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        // Adjust the image height if it exceeds the page height
        const finalImgHeight = imgHeight > pageHeight ? pageHeight : imgHeight;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, finalImgHeight);
        pdf.save("invoice.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
        toast.error("Failed to generate PDF");
      });
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container h-full p-6 mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-transparent transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Invoice Reports
          </h1>
          <div className="relative w-48 h-1 mx-auto mt-4 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-[slide_2s_linear_infinite]"
              style={{
                animation: "slide 2s linear infinite"
              }}
            />
          </div>
        </div>

        <div className="p-8 transition-all duration-300 bg-white border rounded-xl">
          <div className="flex flex-col items-center gap-6 mb-8 md:flex-row md:justify-center">
            <div className="flex items-end gap-4">
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  From Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">
                  To Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 transition-all duration-300">
                {/* <Loader className="w-12 h-12 text-blue-600 animate-spin" /> */}
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600">Loading reports...</p>
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 transition-opacity duration-300">
                <FileText className="w-16 h-16 text-gray-400" />
                <p className="mt-4 text-lg text-gray-600">
                  No reports found for the selected date range.
                </p>
              </div>
            ) : (
              <table className="min-w-full overflow-hidden bg-white border rounded-lg">
                <thead>
                  <tr className="text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500">
                    <th className="px-6 py-4 font-semibold text-left">S.No</th>
                    <th className="px-6 py-4 font-semibold text-left">
                      Customer Name
                    </th>
                    <th className="px-6 py-4 font-semibold text-left">
                      Amount
                    </th>
                    <th className="px-6 py-4 font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReports.map((report, index) => (
                    <tr
                      key={index}
                      className="transition-colors duration-200 hover:bg-blue-50"
                    >
                      <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-800">
                        {report?.buyerDetails?.customerName}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        ₹{report.totalAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => handleViewClick(report)}
                            className="flex items-center px-3 py-2 text-sm text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </button>
                          <button
                            onClick={() => handleEditClick(report)}
                            className="flex items-center px-3 py-2 text-sm text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal remains the same */}
      {selectedInvoice && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Invoice Details"
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-10"
        >
          <div className="w-full max-w-4xl p-4 mx-4 bg-white rounded-lg shadow-xl overflow-y-auto max-h-[80vh]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Invoice Details
              </h2>
              <button
                className="flex items-center justify-center text-gray-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
                onClick={closeModal}
              >
                <span className="text-4xl">×</span>
              </button>
            </div>
            <div id="invoice-print-form" className="p-4 bg-white">
              <InvoicePrint invoiceData={selectedInvoice} />
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleDownloadPDF}
              >
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceReports;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// /* eslint-disable react/display-name */
// /* eslint-disable react/prop-types */
// import { useEffect, useState, forwardRef } from "react";
// import api from "../../config/api";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";
// import { FaCalendarAlt, } from "react-icons/fa";
// import { Eye, Edit2, FileText } from "lucide-react";
// import Modal from "react-modal";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import InvoicePrint from "./InvoicePrint";
// import { useNavigate } from "react-router-dom";

// const InvoiceReports = () => {
//   const navigate = useNavigate();
//   const [reports, setReports] = useState([]);
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [selectedInvoice, setSelectedInvoice] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await api.get("/api/invoices/get-invoices");
//         setReports(response.data.invoices);
//         setFilteredReports(response.data.invoices);
//       } catch (error) {
//         console.error("Error fetching invoices", error);
//         toast.error("Failed to fetch invoices");
//       }
//     };
//     fetchInvoices();
//   }, []);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const filtered = reports.filter((report) => {
//         const invoiceDate = parse(report.date, "dd/MM/yyyy", new Date());
//         return isWithinInterval(invoiceDate, {
//           start: startOfDay(startDate),
//           end: endOfDay(endDate),
//         });
//       });
//       setFilteredReports(filtered);
//     } else {
//       setFilteredReports(reports);
//     }
//   }, [startDate, endDate, reports]);

//   const CustomInput = forwardRef(({ value, onClick }, ref) => (
//     <button
//       type="button"
//       className="flex items-center px-4 py-2 text-sm border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       onClick={onClick}
//       ref={ref}
//     >
//       <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-500" /> {value}
//     </button>
//   ));
//   const handleViewClick = (report) => {
//     setSelectedInvoice(report);
//     setIsModalOpen(true);
//   };
//   const handleEditClick = (report) => {
//     console.log(report);
//     navigate("/account/invoiceForm", { state: { invoiceReportData: report } });
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedInvoice({});
//   };

//   const handleDownloadPDF = () => {
//     const input = document.getElementById("invoice-print-form");

//     html2canvas(input, {
//       scale: 2, // Increase scale for better quality
//       useCORS: true, // Enable CORS if you have external images
//     })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const imgWidth = 210; // A4 width in mm
//         const pageHeight = 297; // A4 height in mm
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         // Adjust the image height if it exceeds the page height
//         const finalImgHeight = imgHeight > pageHeight ? pageHeight : imgHeight;
//         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, finalImgHeight);
//         pdf.save("invoice.pdf");
//       })
//       .catch((error) => {
//         console.error("Error generating PDF", error);
//         toast.error("Failed to generate PDF");
//       });
//   };

//   return (

//     <div className="flex-1 min-h-screen bg-gray-50">
//       <div className="container h-full p-6 mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-center text-blue-600">
//             Invoice Reports
//           </h1>
//           <div className="w-20 h-1 mx-auto mt-2 bg-blue-600 rounded-full"></div>
//         </div>

//         <div className="p-6 bg-white border rounded-lg">
//           <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-end md:justify-between">
//             <div className="flex flex-col gap-4 md:flex-row md:items-end">
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Start Date
//                 </label>
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   selectsStart
//                   startDate={startDate}
//                   endDate={endDate}
//                   dateFormat="dd/MM/yyyy"
//                   customInput={<CustomInput />}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   End Date
//                 </label>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   selectsEnd
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                   dateFormat="dd/MM/yyyy"
//                   customInput={<CustomInput />}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             {filteredReports.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <FileText className="w-16 h-16 text-gray-400" />
//                 <p className="mt-4 text-lg text-gray-600">
//                   No reports found for the selected date range.
//                 </p>
//               </div>
//             ) : (
//               <table className="min-w-full overflow-hidden bg-white border rounded-lg">
//                 <thead>
//                   <tr className="text-sm text-white bg-blue-600">
//                     <th className="px-6 py-4 font-semibold text-left">S.No</th>
//                     <th className="px-6 py-4 font-semibold text-left">
//                       Customer Name
//                     </th>
//                     <th className="px-6 py-4 font-semibold text-left">
//                       Amount
//                     </th>
//                     <th className="px-6 py-4 font-semibold text-center">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredReports.map((report, index) => (
//                     <tr
//                       key={index}
//                       className="transition-colors hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 text-gray-800">{index + 1}</td>
//                       <td className="px-6 py-4 text-gray-800">
//                         {report?.buyerDetails?.customerName}
//                       </td>
//                       <td className="px-6 py-4 text-gray-800">
//                         ₹{report.totalAmount.toLocaleString("en-IN")}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center justify-center space-x-3">
//                           <button
//                             onClick={() => handleViewClick(report)}
//                             className="flex items-center px-3 py-2 text-sm text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                           >
//                             <Eye className="w-4 h-4 mr-2" />
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleEditClick(report)}
//                             className="flex items-center px-3 py-2 text-sm text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                           >
//                             <Edit2 className="w-4 h-4 mr-2" />
//                             Edit
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     {selectedInvoice && (
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Invoice Details"
//         className="fixed inset-0 flex items-center justify-center"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-10"
//       >
//         <div className="w-full max-w-4xl p-4 mx-4 bg-white rounded-lg shadow-xl overflow-y-auto max-h-[80vh]">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Invoice Details
//             </h2>
//             <button
//               className="flex items-center justify-center text-gray-500 hover:text-red-700 focus:outline-none"
//               onClick={closeModal}
//             >
//               <span className="text-4xl">×</span>
//             </button>
//           </div>
//           <div id="invoice-print-form" className="p-4 bg-white">
//             <InvoicePrint invoiceData={selectedInvoice} />
//           </div>
//           <div className="flex justify-end mt-6">
//             <button
//               className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               onClick={handleDownloadPDF}
//             >
//               <FileText className="w-4 h-4 mr-2" />
//               Download PDF
//             </button>
//           </div>
//         </div>
//       </Modal>
//     )}
//     </div>
//   );
// };

// export default InvoiceReports;

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
// import { useEffect, useState, forwardRef } from "react";
// import api from "../../config/api";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";
// import { FaCalendarAlt } from "react-icons/fa";
// import { Eye, Edit2, FileText } from "lucide-react";
// import Modal from "react-modal";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import InvoicePrint from "./InvoicePrint";
// import { useNavigate } from "react-router-dom";

// const InvoiceReports = () => {
//   const navigate = useNavigate();
//   const [reports, setReports] = useState([]);
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await api.get("/api/invoices/get-invoices");
//         setReports(response.data.invoices);
//         setFilteredReports(response.data.invoices);
//       } catch (error) {
//         console.error("Error fetching invoices", error);
//         toast.error("Failed to fetch invoices");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInvoices();
//   }, []);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const filtered = reports.filter((report) => {
//         const invoiceDate = parse(report.date, "dd/MM/yyyy", new Date());
//         return isWithinInterval(invoiceDate, {
//           start: startOfDay(startDate),
//           end: endOfDay(endDate),
//         });
//       });
//       setFilteredReports(filtered);
//     } else {
//       setFilteredReports(reports);
//     }
//   }, [startDate, endDate, reports]);

//   const CustomInput = forwardRef(({ value, onClick }, ref) => (
//     <button
//       type="button"
//       className="flex items-center px-4 py-2 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
//       onClick={onClick}
//       ref={ref}
//     >
//       <FaCalendarAlt className="w-4 h-4 mr-2 text-blue-500" /> {value}
//     </button>
//   ));

//   const handleViewClick = (report) => {
//     setSelectedInvoice(report);
//     setIsModalOpen(true);
//   };

//   const handleEditClick = (report) => {
//     navigate("/account/invoiceForm", { state: { invoiceReportData: report } });
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedInvoice(null);
//   };

//   const handleDownloadPDF = () => {
//     const input = document.getElementById("invoice-print-form");

//     html2canvas(input, { scale: 2, useCORS: true })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
//         pdf.save("invoice.pdf");
//       })
//       .catch((error) => {
//         console.error("Error generating PDF", error);
//         toast.error("Failed to generate PDF");
//       });
//   };

//   return (
//     <div className="flex-1 min-h-screen bg-gray-50">
//       <div className="container p-6 mx-auto">
//         {/* Title with Animated Underline */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
//             Invoice Reports
//           </h1>
//           <div className="relative flex justify-center w-full mt-2">
//             <div className="w-40 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-moveLine"></div>
//           </div>
//         </div>

//         {/* Date Pickers */}
//         <div className="p-6 bg-white border rounded-lg shadow-md">
//           <div className="flex flex-col items-center justify-center gap-6 mb-8 md:flex-row">
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 From Date
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 dateFormat="dd/MM/yyyy"
//                 customInput={<CustomInput />}
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 To Date
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 dateFormat="dd/MM/yyyy"
//                 customInput={<CustomInput />}
//               />
//             </div>
//           </div>

//           {/* Loader or Data */}
//           {loading ? (
//             <div className="flex items-center justify-center h-40">
//               <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
//             </div>
//           ) : filteredReports.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <FileText className="w-16 h-16 text-gray-400" />
//               <p className="mt-4 text-lg text-gray-600">No reports found for the selected date range.</p>
//             </div>
//           ) : (
//             <table className="min-w-full overflow-hidden bg-white border rounded-lg shadow-sm">
//               <thead>
//                 <tr className="text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500">
//                   <th className="px-6 py-4 font-semibold text-left">S.No</th>
//                   <th className="px-6 py-4 font-semibold text-left">Customer Name</th>
//                   <th className="px-6 py-4 font-semibold text-left">Amount</th>
//                   <th className="px-6 py-4 font-semibold text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredReports.map((report, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">{index + 1}</td>
//                     <td className="px-6 py-4">{report?.buyerDetails?.customerName}</td>
//                     <td className="px-6 py-4">₹{report.totalAmount.toLocaleString("en-IN")}</td>
//                     <td className="flex items-center justify-center gap-3 px-6 py-4">
//                       <button onClick={() => handleViewClick(report)} className="btn-blue"><Eye className="w-4 h-4" /></button>
//                       <button onClick={() => handleEditClick(report)} className="btn-green"><Edit2 className="w-4 h-4" /></button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceReports;

// <div className="flex-1 max-w-full min-h-screen">
//   <div className="container h-full p-4 mx-auto bg-gray-100">
//     <div className="flex justify-center mb-6">
//       <h1
//         id="header"
//         className="p-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700"
//       >
//         Invoice Reports
//       </h1>
//     </div>
//     <div className="flex flex-col justify-between mx-12 mb-4 space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
//       <div className="flex flex-col ">
//         <label className="mb-1 font-semibold">Start Date:</label>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//           dateFormat="dd/MM/yyyy"
//           customInput={<CustomInput />}
//         />
//       </div>
//       <div className="flex flex-col">
//         <label className="mb-1 font-semibold">End Date:</label>
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate}
//           dateFormat="dd/MM/yyyy"
//           customInput={<CustomInput />}
//         />
//       </div>
//     </div>
//     <div className="overflow-x-auto">
//       {filteredReports.length === 0 ? (
//         <div className="py-4 text-center">
//           No reports found for the selected date range.
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border rounded-lg shadow-sm">
//             <thead className="text-white border-b bg-slate-600 text-nowrap">
//               <tr>
//                 <th className="px-4 py-3 font-medium text-left border">
//                   S.No
//                 </th>
//                 <th className="px-4 py-3 font-medium text-left border">
//                   Customer Name
//                 </th>
//                 <th className="px-4 py-3 font-medium text-left border">
//                   Amount
//                 </th>
//                 <th className="px-4 py-3 font-medium text-left border">
//                   View Data
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredReports.map((report, index) => (
//                 <tr
//                   key={index}
//                   className="transition duration-150 border border-gray-200 hover:bg-gray-50"
//                 >
//                   <td className="px-4 py-3 text-center text-gray-800 border border-gray-200">{index + 1}</td>
//                   <td className="px-4 py-3 text-center text-gray-800 border border-gray-200">
//                     {report?.buyerDetails?.customerName}
//                   </td>
//                   <td className="px-4 py-3 text-center text-gray-800 border border-gray-200">
//                     {report.totalAmount}
//                   </td>
//                   <td className="flex px-4 py-3 border border-gray-200 ">
//                     <button
//                       className="px-4 py-2 mx-auto text-white transition duration-200 bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                       onClick={() => handleViewClick(report)}
//                     >
//                       <FaEye/>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   </div>
//   {selectedInvoice && (
//     <Modal
//       isOpen={isModalOpen}
//       onRequestClose={closeModal}
//       contentLabel="Invoice Details"
//       className="fixed inset-0 flex items-center justify-center mt-8"
//       overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80"
//     >
//       <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-3xl overflow-y-auto max-h-[calc(100vh-100px)]">
//         <div className="flex justify-between ">
//           <h2 className="text-2xl font-bold">Invoice Details</h2>
//           <button
//             className="flex items-center justify-center text-3xl font-bold text-gray-500 hover:text-red-600 focus:outline-none"
//             onClick={closeModal}
//           >
//             &times;
//           </button>
//         </div>
//         <div
//           id="invoice-print-form"
//           style={{ margin: 0, padding: 0, fontSize: "12px", width: "100%" }}
//         >
//           <InvoicePrint invoiceData={selectedInvoice} />
//         </div>
//         <div className="flex justify-between mt-4">
//           <button
//             className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700"
//             onClick={handleDownloadPDF}
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </Modal>
//   )}
// </div>
