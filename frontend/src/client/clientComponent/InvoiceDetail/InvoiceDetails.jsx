import { useEffect, useState } from "react";
import { FaEye, FaSpinner } from "react-icons/fa";
import api from "../../../config/api";
import InvoiceModal from "../../../Account/Invoice/InvoiceModal";
import { CiCalendar } from "react-icons/ci";

const InvoiceDetails = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const customerId = sessionStorage.getItem("clientId");
        const token = sessionStorage.getItem("customerToken");
        const response = await api.get(`/api/invoices/customer/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data?.success) {
          setInvoices(response.data.invoices);
        } else {
          setInvoices([]);
        }
      } catch (error) {
        console.error("Failed to fetch invoices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  return (
    <section className="flex-1 bg-gradient-to-br overflow-x-hidden from-gray-50 to-gray-200 p-4 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 shadow-lg rounded-tl rounded-tr">
        <h1 className="text-lg md:text-2xl font-bold text-white tracking-wide w-full md:w-auto text-center md:text-left">
          Invoice Details
        </h1>
        <div className="flex items-center bg-white text-blue-600 px-3 py-2 rounded shadow-lg cursor-pointer hover:text-indigo-600 transition duration-300 w-full md:w-auto justify-center md:justify-start">
          <CiCalendar className="mr-3 text-xl" />
          <span className="font-medium text-sm md:text-base">{todayDate}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-4 rounded-lg border mt-8">
        {loading ? (
          <div className="w-full min-h-[70vh] flex justify-center items-center">
            <FaSpinner size={25} className="animate-spin text-blue-700" />
          </div>
        ) : invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full overflow-x-auto bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-blue-600 text-white text-sm uppercase font-semibold">
                  <th className="px-6 py-3 text-left">S.No</th>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Service Name</th>
                  <th className="px-6 py-3 text-center">View Invoice</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr
                    key={invoice._id}
                    className={`hover:bg-blue-100 transition duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="px-6 py-3 text-sm text-gray-700 border">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 border text-nowrap">
                      {invoice.orderId}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 border text-nowrap">
                      {invoice.items?.length > 0
                        ? invoice.items[0].name
                        : "N/A"}
                    </td>
                    <td className="px-6 py-3 text-center border">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(invoice)}
                      >
                        <FaEye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-500">No invoices found.</p>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal invoiceData={selectedInvoice} onClose={closeModal} />
      )}
    </section>
  );
};

export default InvoiceDetails;
