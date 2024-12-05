/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useEffect, useState, forwardRef } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import Modal from "react-modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoicePrint from "./InvoicePrint"; // Make sure to create and import this component

const InvoiceReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get("/api/invoices/get-invoices");
        setReports(response.data.invoices);
        setFilteredReports(response.data.invoices);
      } catch (error) {
        console.error("Error fetching invoices", error);
        toast.error("Failed to fetch invoices");
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
          end: endOfDay(endDate),
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
      className="flex items-center p-2 border rounded-md"
      onClick={onClick}
      ref={ref}
    >
      <FaCalendarAlt className="mr-2" /> {value}
    </button>
  ));

  const handleViewClick = (report) => {
    setSelectedInvoice(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice({});
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("invoice-print-form");

    html2canvas(input, {
      scale: 2, // Increase scale for better quality
      useCORS: true, // Enable CORS if you have external images
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
    <div className="flex-1 max-w-full min-h-screen">
      <div className="container mx-auto p-4 h-full bg-gray-100">
        <div className="flex justify-center mb-6">
          <h1
            id="header"
            className="p-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700 text-2xl"
          >
            Invoice Reports
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 mx-12 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col ">
            <label className="font-semibold mb-1">Start Date:</label>
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
            <label className="font-semibold mb-1">End Date:</label>
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
        <div className="overflow-x-auto">
          {filteredReports.length === 0 ? (
            <div className="text-center py-4">
              No reports found for the selected date range.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg shadow-sm">
                <thead className="bg-slate-600 text-nowrap text-white border-b">
                  <tr>
                    <th className="py-3 px-4 text-left border font-medium">
                      S.No
                    </th>
                    <th className="py-3 px-4 text-left border font-medium">
                      Customer Name
                    </th>
                    <th className="py-3 px-4 text-left border font-medium">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-left border font-medium">
                      View Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report, index) => (
                    <tr
                      key={index}
                      className="border border-gray-200 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="py-3 px-4 border border-gray-200 text-center text-gray-800">{index + 1}</td>
                      <td className="py-3 px-4 border border-gray-200 text-center text-gray-800">
                        {report?.buyerDetails?.customerName}
                      </td>
                      <td className="py-3 px-4 border border-gray-200 text-center text-gray-800">
                        {report.totalAmount}
                      </td>
                      <td className="py-3 px-4 border flex border-gray-200 ">
                        <button
                          className="bg-blue-600 text-white px-4  mx-auto py-2 rounded-lg shadow 
                                   hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none 
                                   transition duration-200"
                          onClick={() => handleViewClick(report)}
                        >
                          <FaEye/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedInvoice && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Invoice Details"
          className="fixed inset-0 flex items-center justify-center mt-8"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80"
        >
          <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-3xl overflow-y-auto max-h-[calc(100vh-100px)]">
            <div className="flex justify-between ">
              <h2 className="text-2xl font-bold">Invoice Details</h2>
              <button
                className=" flex items-center justify-center text-3xl  hover:text-red-600 font-bold text-gray-500 focus:outline-none"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <div
              id="invoice-print-form"
              style={{ margin: 0, padding: 0, fontSize: "12px", width: "100%" }}
            >
              <InvoicePrint invoiceData={selectedInvoice} />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
                onClick={handleDownloadPDF}
              >
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
