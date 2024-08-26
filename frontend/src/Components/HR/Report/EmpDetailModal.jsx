/* eslint-disable react/prop-types */
import { useRef } from "react";
import { FaPrint, FaTimes } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import PrintableEmployeeDetails from "./PrintableEmployeeDetails";

const EmpDetailModal = ({ employee, onClose }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Employee_Details-${employee.name}`,
    pageStyle: `
      @page {
        margin: 10mm;
        size: auto;
      }
      @media print {
        .page-break {
            margin-top: ;
            display: block;
            page-break-before: auto;
        }
        body {
          font-size: 12pt;
          line-height: 1;
          color: #000;
        }
        .no-print {
          display: none !important;
        }
        .printable-content {
          height: 100vh;
          width: 100%;
          padding: 0;
          margin: 0;
        }
        .printable-content * {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .print-section {
          page-break-before: auto;
          page-break-after: auto;
        }
      }
    `,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-3/4 xl:w-2/3 max-h-screen">
        <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
          <h2 className="text-3xl font-semibold text-blue-950">Employee Details</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-700 no-print">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Display Employee Details */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] printable-content">
          <PrintableEmployeeDetails ref={componentRef} employee={employee} />
        </div>

        {/* Print Button */}
        <div className="p-4 flex justify-end items-center space-x-4 border-t-2 border-gray-200 no-print">
          <button
            onClick={handlePrint}
            className="text-white bg-blue-950 hover:bg-blue-800 font-semibold py-2 px-4 rounded flex items-center space-x-2"
          >
            <FaPrint className="w-5 h-5" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpDetailModal;
