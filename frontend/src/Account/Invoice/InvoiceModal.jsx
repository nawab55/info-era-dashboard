/* eslint-disable react/prop-types */
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import InvoicePrintForm from "./InvoicePrint";

const InvoiceModal = ({ invoiceData, onClose }) => {
  const componentRef = useRef(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-700 focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Invoice Preview
          </h2>
        </div>
        <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="printableArea" ref={componentRef}>
            <InvoicePrintForm invoiceData={invoiceData} />
          </div>
        </div>
        <div className="p-4 flex justify-center">
          <ReactToPrint
            documentTitle={`Invoice-${invoiceData.invoiceNo}`}
            trigger={() => (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
