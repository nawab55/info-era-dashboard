import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa"; // Import icon from react-icons
import api from "../../../config/api";
import InvoiceModal from "../../../Components/Account/Invoice/InvoiceModal"; // Import the modal

const InvoiceDetails = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to handle the selected invoice for modal

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
        if (response.data && response.data.success) {
          setInvoices(response.data.invoices);
        } else {
          setInvoices([]); // No invoices found
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
    <section className="md:ml-60 bg-inherit p-4 pb-8">
      <div
        className="max-w-full overflow-x-auto bg-white p-8 mx-4 rounded-lg shadow-md"
        style={{ height: "600px", border: "1px solid white" }}
      >
        <h2 className="text-2xl font-semibold text-gray-500 mb-6">Invoice Details</h2>
        {loading ? (
          <p>Loading invoice details...</p>
        ) : invoices.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                  View Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice, index) => (
                <tr key={invoice.id} className={index % 2 === 0 ? "bg-white" : "bg-blue-100"}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-300">{invoice.orderId}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {invoice.items && invoice.items.length > 0 ? invoice.items[0].name : "N/A"}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-center border border-gray-300">
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
        ) : (
          <p className="text-red-500">No invoices found.</p>
        )}
      </div>
      {selectedInvoice && (
        <InvoiceModal
          invoiceData={selectedInvoice}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default InvoiceDetails;
