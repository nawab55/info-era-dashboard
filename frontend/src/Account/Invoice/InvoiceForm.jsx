import { useEffect, useState } from "react";
import { uid } from "uid";
import { v4 as uuidv4 } from "uuid";
import InvoiceItem from "./InvoiceItem";
import api from "../../config/api";
import { toast } from "react-toastify";
import InvoiceModal from "./InvoiceModal";

const date = new Date();
const today = date.toLocaleDateString("en-GB"); // 'en-GB' for dd/mm/yyyy format
const count = 1;

const InvoiceForm = () => {
  const [customerData, setCustomerData] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(""); // state to store customerId
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: `IE/${count}`,
    date: today,
    cashierName: "",
    buyerDetails: {
      customerName: "",
      mobile: "",
      email: "",
      gstName: "",
      address: "",
    },
    customerId: "",
    cgst: "",
    sgst: "",
    discount: "",
    deliveryNote: "",
    modeOfPayment: "",
    referenceNo: "",
    buyersOrderNo: "",
    dispatchedDocNo: "",
    dispatchedThrough: "",
    destination: "",
    termsOfDelivery: "",
    orderId: uuidv4(),
    items: [
      {
        id: uid(),
        name: "",
        hsn: "",
        qty: 1,
        price: "1.00",
      },
    ],
    // Default company information filled in invoiceData
    companyInfo: {
      companyName: "INFO ERA SOFTWARE SERVICES PRIVATE LIMITED",
      address:
        "FLAT NO-604, 6TH FLOOR, NARAIN PLAZA EXHIBITION ROAD, PATNA-800001",
      gstin: "10AADCI6770K1ZK",
      cin: "U72300BR2014PTC022956",
      email: "infoerapvtltd@gmail.com",
    },
    totalAmount: 0, // Adding totalAmount to the state
  });

  const [showModal, setShowModal] = useState(false); //state to controll modal visibility
  const [savedInvoiceData, setSavedInvoiceData] = useState(null); // state to store the saved invoice data

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get("/api/invoices/get-invoices");
        setInvoiceData((prevData) => ({
          ...prevData,
          invoiceNo: response.data.latestInvoiceNo,
        }));
      } catch (error) {
        console.error(
          "Error fetching invoices and latest invoice number:",
          error
        );
        toast.error("Failed to fetch latest invoice number");
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerResponse = await api.get(
          "/api/customers/get/allCustomer"
        );
        console.log(customerResponse.data);

        setCustomerData(customerResponse.data);
        setFilteredCustomers(customerResponse.data); // Initialize filteredCustomers
      } catch (error) {
        console.error("Error fetching customer Data ", error);
      }
    };
    fetchCustomer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => {
      if (name.startsWith("buyerDetails.")) {
        const key = name.split(".")[1];
        return {
          ...prevData,
          buyerDetails: {
            ...prevData.buyerDetails,
            [key]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleCustomerInputChange = (e) => {
    const { value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      buyerDetails: {
        ...prevData.buyerDetails,
        customerName: value,
      },
    }));
    if (value) {
      const filtered = customerData.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
    // const query = e.target.value.toLowerCase();
    // const filtered = customerData.filter((customer) =>
    //   customer.name.toLowerCase().includes(query)
    // );
    // setFilteredCustomers(filtered);
    // setInvoiceData((prevData) => ({
    //   ...prevData,
    //   buyerDetails: {
    //     ...prevData.buyerDetails,
    //     customerName: e.target.value,
    //   },
    // }));
  };

  const handleCustomerSelect = (customer) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      buyerDetails: {
        customerName: customer.name,
        mobile: customer.mobile,
        email: customer.email,
        gstName: customer.gstName,
        address: customer.address,
      },
      customerId: customer._id, // Set the customerId in the state
    }));
    setFilteredCustomers([]);
    setSelectedCustomerId(customer._id); // Set selectedCustomerId state
  };

  // const handleCustomerSelect = (e) => {
  //   const selectedCustomer = customerData.find(customer => customer.name === e.target.value);
  //   setInvoiceData((prevData) => ({
  //     ...prevData,
  //     buyerDetails: {
  //       customerName: selectedCustomer.name,
  //       mobile: selectedCustomer.mobile,
  //       email: selectedCustomer.email,
  //       address: selectedCustomer.address,
  //     },
  //   }));
  // };

  const addItemHandler = () => {
    const id = uid();
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          id: id,
          name: "",
          hsn: "",
          qty: 1,
          price: "1.00",
        },
      ],
    }));
  };

  const deleteItemHandler = (id) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((item) => item.id !== id),
    }));
  };

  const editItemHandler = (event) => {
    const { id, name, value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
    }));
  };

  const subtotal = invoiceData.items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) {
      return prev + Number(curr.price) * curr.qty;
    }
    return prev;
  }, 0);

  const totalTaxRate = Number(invoiceData.cgst) + Number(invoiceData.sgst);
  const taxAmount = (totalTaxRate * subtotal) / 100;
  const discountAmount = (invoiceData.discount * subtotal) / 100;
  const total = subtotal - discountAmount + taxAmount;

  // Update the totalAmount in the state whenever the total changes
  useEffect(() => {
    setInvoiceData((prevData) => ({
      ...prevData,
      totalAmount: total,
    }));
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoicePayload = {
        ...invoiceData,
        customerId: selectedCustomerId, //  Include the customerId in the payload
      };

      const response = await api.post(
        "/api/invoices/create-invoice",
        invoicePayload
      );
      toast.success("Invoice data submitted successfully");
      setSavedInvoiceData(response.data.invoiceData);
      setShowModal(true);

      const newInvoiceNo = `IE/${
        parseInt(invoiceData.invoiceNo.split("/")[1]) + 1
      }`;
      setInvoiceData((prevData) => ({
        ...prevData,
        invoiceNo: newInvoiceNo,
        cashierName: "",
        buyerDetails: {
          customerName: "",
          mobile: "",
          email: "",
          address: "",
        },
        customerId: "",
        cgst: "",
        sgst: "",
        discount: "",
        deliveryNote: "",
        modeOfPayment: "",
        referenceNo: "",
        buyersOrderNo: "",
        dispatchedDocNo: "",
        dispatchedThrough: "",
        destination: "",
        termsOfDelivery: "",
        orderId: uuidv4(),
        items: [
          {
            id: uid(),
            name: "",
            hsn: "",
            qty: 1,
            price: "1.00",
          },
        ],
        companyInfo: prevData.companyInfo,
        totalAmount: 0, // Reset totalAmount
      }));
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to upload Invoice data");
    }
  };

  const [isCustomerListOpen, setIsCustomerListOpen] = useState(false);
  // console.log(invoiceData.companyInfo);
  return (
    <section className="p-2 max-w-full flex-1 bg-blue-gray-50">
      <div className="p-2">
        <form
          className="flex flex-col flex-wrap justify-between"
          onSubmit={handleSubmit}
        >
          {/* <div className="max-w-3xl p-2 bg-yellow-100 shadow-md rounded"> */}
          <div className="flex justify-center mb-6">
            <h1
              id="header"
              className="p-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700 text-2xl"
            >
              Invoice
            </h1>
          </div>
          <div className="bg-white rounded border p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InputField
                label="Company Name"
                value={invoiceData.companyInfo.companyName}
                readOnly
                required
              />
              <InputField
                label="E-Mail"
                value={invoiceData.companyInfo.email}
                readOnly
                required
              />
              <InputField
                label="GSTIN/UIN"
                value={invoiceData.companyInfo.gstin}
                readOnly
                required
              />
              <InputField
                label="CIN"
                value={invoiceData.companyInfo.cin}
                readOnly
                required
              />
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={invoiceData.companyInfo.address}
                  readOnly
                  className="w-full px-3 py-2 text-gray-700 border resize-none rounded focus:outline-none focus:border-blue-500"
                  rows={3}
                />
              </div>
              <InputField
                label="Current Date"
                name="date"
                value={invoiceData.date}
                onChange={handleChange}
              />
              <InputField
                label="Invoice No"
                name="invoiceNo"
                value={invoiceData.invoiceNo}
                onChange={handleChange}
              />
              <InputField
                label="Cashier Name"
                name="cashierName"
                value={invoiceData.cashierName}
                onChange={handleChange}
                required
              />
              <InputField
                label="Delivery Note"
                name="deliveryNote"
                value={invoiceData.deliveryNote}
                onChange={handleChange}
              />
              <InputField
                label="Mode of Payment"
                name="modeOfPayment"
                value={invoiceData.modeOfPayment}
                onChange={handleChange}
                required
              />
              <InputField
                label="Reference No"
                name="referenceNo"
                value={invoiceData.referenceNo}
                onChange={handleChange}
              />
              <InputField
                label="Buyer's Order No"
                name="buyersOrderNo"
                value={invoiceData.buyersOrderNo}
                onChange={handleChange}
              />
              <InputField
                label="Dispatched Doc No"
                name="dispatchedDocNo"
                value={invoiceData.dispatchedDocNo}
                onChange={handleChange}
              />
              <InputField
                label="Dispatched Through"
                name="dispatchedThrough"
                value={invoiceData.dispatchedThrough}
                onChange={handleChange}
              />
              <InputField
                label="Destination"
                name="destination"
                value={invoiceData.destination}
                onChange={handleChange}
              />
              <InputField
                label="Terms of Delivery"
                name="termsOfDelivery"
                value={invoiceData.termsOfDelivery}
                onChange={handleChange}
              />
              <InputField
                label="Order Id"
                name="orderId"
                value={invoiceData.orderId}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bg-white rounded border p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Buyer Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Customer Name <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  id="customerName"
                  type="text"
                  value={invoiceData.buyerDetails.customerName}
                  onChange={(e) => {
                    handleCustomerInputChange(e);
                    setIsCustomerListOpen(true);
                  }}
                  className="w-full px-3 py-2 text-gray-700 border resize-none rounded focus:border-blue-500 focus:outline-none"
                  placeholder="Enter customer name"
                />
                {isCustomerListOpen &&
                  invoiceData.buyerDetails.customerName &&
                  filteredCustomers.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {filteredCustomers.map((customer) => (
                        <li
                          key={customer._id}
                          onClick={() => {
                            handleCustomerSelect(customer);
                            setIsCustomerListOpen(false);
                          }}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition duration-150 ease-in-out"
                        >
                          {customer.name}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <div>
                <label
                  htmlFor="buyerDetails.mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile No <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  type="tel"
                  name="buyerDetails.mobile"
                  id="buyerDetails.mobile"
                  value={invoiceData.buyerDetails.mobile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 border resize-none rounded focus:border-blue-500 focus:outline-none"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label
                  htmlFor="buyerDetails.email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="buyerDetails.email"
                  id="buyerDetails.email"
                  value={invoiceData.buyerDetails.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 border resize-none rounded focus:border-blue-500 focus:outline-none"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label
                  htmlFor="buyerDetails.gstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  GST Name <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="buyerDetails.gstName"
                  id="buyerDetails.gstName"
                  value={invoiceData.buyerDetails.gstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 border resize-none rounded focus:border-blue-500 focus:outline-none"
                  placeholder="Enter GST name"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="buyerDetails.address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Buyer Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  name="buyerDetails.address"
                  id="buyerDetails.address"
                  value={invoiceData.buyerDetails.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 text-gray-700 border resize-none rounded focus:border-blue-500 focus:outline-none"
                  placeholder="Enter buyer's address"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 overflow-x-auto max-w-full rounded p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Invoice Items
            </h2>
            <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    HSN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Qty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoiceData.items.map((item) => (
                  <InvoiceItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    hsn={item.hsn}
                    qty={item.qty}
                    price={item.price}
                    onDeleteItem={deleteItemHandler}
                    onEditItem={editItemHandler}
                  />
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addItemHandler}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 rounded p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Invoice Summary
            </h2>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Subtotal:
              </span>
              <span className="text-sm font-medium text-gray-900">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Discount ({invoiceData.discount || "0"}%):
              </span>
              <span className="text-sm font-medium text-gray-900">
                ₹{discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                Total Tax ({totalTaxRate || "0"}%):
              </span>
              <span className="text-sm font-medium text-gray-900">
                ₹{taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-base font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-base font-semibold text-gray-900">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Tax and Discount Inputs */}
          <div className="bg-gray-50 rounded p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Tax and Discount
            </h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount %
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={invoiceData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-3 py-2 text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="cgst"
                  className="block text-sm font-medium text-gray-700"
                >
                  CGST %
                </label>
                <input
                  type="number"
                  id="cgst"
                  name="cgst"
                  value={invoiceData.cgst}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-3 py-2 text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="sgst"
                  className="block text-sm font-medium text-gray-700"
                >
                  SGST %
                </label>
                <input
                  type="number"
                  id="sgst"
                  name="sgst"
                  value={invoiceData.sgst}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="w-full px-3 py-2 text-gray-700 border rounded focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Invoice
            </button>
          </div>
          {/* </div> */}
        </form>
      </div>
      {showModal && (
        <InvoiceModal
          invoiceData={savedInvoiceData}
          onClose={() => setShowModal(false)}
        />
      )}
      {/* <Outlet /> */}
    </section>
  );
};

export default InvoiceForm;

// eslint-disable-next-line react/prop-types
function InputField({ label, name, value, onChange, readOnly, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        className={`w-full px-3 py-2 text-gray-700 border rounded focus:outline-none ${
          readOnly ? "bg-gray-100" : "focus:border-blue-500"
        }`}
      />
    </div>
  );
}
