import { useEffect, useState } from "react";
import { uid } from "uid";
import { v4 as uuidv4 } from "uuid";
// import InvoiceItem from "./InvoiceItem";
import api from "../../config/api";
import { toast } from "react-toastify";
import InvoiceModal from "./InvoiceModal";
import { useLocation, useNavigate } from "react-router-dom";

const date = new Date();
const today = date.toLocaleDateString("en-GB"); // 'en-GB' for dd/mm/yyyy format

const InvoiceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isCustomerListOpen, setIsCustomerListOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(""); // state to store customerId
  const [showModal, setShowModal] = useState(false); //state to controll modal visibility
  const [savedInvoiceData, setSavedInvoiceData] = useState(null); // state to store the saved invoice data
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]); // Filtered services for dropdown
  const [isEditMode, setIsEditMode] = useState(false); // Track if the form is in edit mode
  const [activeDropdownId, setActiveDropdownId] = useState(null); // Add new state to track which item's dropdown is visible
  // Initial invoice data state
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    date: today,
    cashierName: "",
    buyerDetails: {
      customerName: "",
      mobile: "",
      email: "",
      gstNo: "",
      gstName: "",
      address: ""
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
        unit: "PAGES" // Add unit field with default value
      }
    ],
    // Default company information filled in invoiceData
    companyInfo: {
      companyName: "INFO ERA SOFTWARE SERVICES PRIVATE LIMITED",
      address:
        "FLAT NO-604, 6TH FLOOR, NARAIN PLAZA EXHIBITION ROAD, PATNA-800001",
      gstin: "10AADCI6770K1ZK",
      cin: "U72300BR2014PTC022956",
      email: "infoerapvtltd@gmail.com"
    },
    totalAmount: 0 // Adding totalAmount to the state
  });

  // Check if editing an existing invoice
  useEffect(() => {
    if (location.state?.invoiceReportData) {
      const editInvoiceData = location.state.invoiceReportData;
      setIsEditMode(true); // Set edit mode to true
      //   setInvoiceData(location.state.invoiceReportData); // Set the entire invoice data from location.state
      setInvoiceData({
        ...editInvoiceData,
        // Ensure we keep the original invoice number during edit
        invoiceNo: editInvoiceData.invoiceNo
        // Regenerate orderId to prevent duplicate
        // orderId: uuidv4()
      });
      // Set selected customer ID if available
      //   setSelectedCustomerId(location.state.invoiceReportData.customerId);
      setSelectedCustomerId(editInvoiceData.customerId);
    } else {
      // Fetch latest invoice number only if creating a new invoice
      const fetchInvoices = async () => {
        try {
          const response = await api.get("/api/invoices/get-invoices");
          setInvoiceData((prevData) => ({
            ...prevData,
            invoiceNo: response.data.latestInvoiceNo
          }));
        } catch (error) {
          console.error("Error fetching invoices:", error);
          toast.error("Failed to fetch latest invoice number");
        }
      };
      fetchInvoices();
    }
  }, [location.state]);

  // Fetch latest invoice number only if not in edit mode
  //   useEffect(() => {
  //     if (!isEditMode) {
  //       const fetchInvoices = async () => {
  //         try {
  //           const response = await api.get("/api/invoices/get-invoices");
  //           console.log("invoiceNumber: ", response.data.latestInvoiceNo);
  //           // console.log("invoiceDetails: ", response.data.invoices);

  //           setInvoiceData((prevData) => ({
  //             ...prevData,
  //             invoiceNo: response.data.latestInvoiceNo // Update only the invoiceNo
  //           }));
  //         } catch (error) {
  //           console.error("Error fetching invoices:", error);
  //           toast.error("Failed to fetch latest invoice number");
  //         }
  //       };
  //       fetchInvoices();
  //     }
  //   }, [isEditMode]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerResponse = await api.get(
          "/api/customers/get/allCustomer"
        );
        setCustomerData(customerResponse.data);
        setFilteredCustomers(customerResponse.data); // Initialize filteredCustomers
      } catch (error) {
        console.error("Error fetching customer Data ", error);
      }
    };
    fetchCustomer();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("api/product/services");
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => {
      if (name.startsWith("buyerDetails.")) {
        const key = name.split(".")[1];
        return {
          ...prevData,
          buyerDetails: {
            ...prevData.buyerDetails,
            [key]: value
          }
        };
      }
      return { ...prevData, [name]: value };
    });
  };
  // Handle service input changes
  const handleServiceInputChange = (e, itemId) => {
    const { value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) =>
        item.id === itemId ? { ...item, name: value } : item
      )
    }));

    if (value) {
      const filtered = services.filter((service) =>
        service.categoryName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered);
      setActiveDropdownId(itemId); // Set the active dropdown id to track which item's dropdown is visible
    } else {
      setFilteredServices([]);
      setActiveDropdownId(null);
    }
  };
  // Handle service selection
  const handleServiceSelect = (selectedService, itemId) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              name: selectedService.categoryName,
              hsn: selectedService.hsnCode,
              price: selectedService.amount
            }
          : item
      )
    }));
    setFilteredServices([]); // Clear the dropdown after selection
    setActiveDropdownId(null); // Clear the active dropdown
  };

  // Add handler for input blur
  const handleInputBlur = () => {
    // Use setTimeout to allow click events on dropdown to fire first
    setTimeout(() => {
      setActiveDropdownId(null);
    }, 200);
  };
  // Handle customer input changes
  const handleCustomerInputChange = (e) => {
    const { value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      buyerDetails: {
        ...prevData.buyerDetails,
        customerName: value
      }
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
  // Handle customer selection
  const handleCustomerSelect = (customer) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      buyerDetails: {
        customerName: customer.name,
        mobile: customer.mobile,
        email: customer.email,
        gstNo: customer.gstNo,
        gstName: customer.gstName,
        address: customer.address
      },
      customerId: customer._id // Set the customerId in the state
    }));
    setFilteredCustomers([]);
    setSelectedCustomerId(customer._id); // Set selectedCustomerId state
  };
  // Add a new item to the invoice
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
          unit: "PAGES" // Add unit field with default value
        }
      ]
    }));
  };
  // Delete an item from the invoice
  const deleteItemHandler = (id) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((item) => item.id !== id)
    }));
  };
  // Edit an item in the invoice
  const editItemHandler = (event) => {
    const { id, name, value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };
  // Calculate subtotal, tax, discount, and total
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
      totalAmount: total
    }));
  }, [total]);

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoicePayload = {
        ...invoiceData,
        customerId: selectedCustomerId //  Include the customerId in the payload
      };

      let response;
      if (isEditMode) {
        // Update the invoice if in edit mode
        const invoiceReportData = location.state.invoiceReportData;
        response = await api.put(
          `/api/invoices/update-invoice/${invoiceReportData._id}`,
          invoicePayload
        );
        toast.success("Invoice updated successfully");
        navigate("/account/invoiceReports");
      } else {
        // Create a new invoice if not in edit mode
        response = await api.post(
          "/api/invoices/create-invoice",
          invoicePayload
        );
        toast.success("Invoice created successfully");
        setSavedInvoiceData(response.data.invoiceData);
        setShowModal(true);
        // Reset form for new invoice
        setInvoiceData((prevData) => ({
          ...prevData,
          //   invoiceNo: prevData.invoiceNo,
          cashierName: "",
          buyerDetails: {
            customerName: "",
            mobile: "",
            email: "",
            gstNo: "",
            gstName: "",
            address: ""
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
              unit: "PAGES"
            }
          ],
          companyInfo: prevData.companyInfo,
          totalAmount: 0
        }));
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error(
        isEditMode ? "Failed to update invoice" : "Failed to create invoice"
      );
    }
  };

  return (
    <section className="flex-1 max-w-full p-2 bg-blue-gray-50">
      <div className="p-2">
        <form
          className="flex flex-col flex-wrap justify-between"
          onSubmit={handleSubmit}
        >
          {/* <div className="max-w-3xl p-2 bg-yellow-100 rounded shadow-md"> */}
          <div className="flex justify-center mb-6">
            <h1
              id="header"
              className="p-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700"
            >
              {isEditMode ? "Edit Invoice" : "Create Invoice"}
            </h1>
          </div>
          <div className="p-6 mb-8 bg-white border rounded">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Company Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={invoiceData.companyInfo.address}
                  readOnly
                  className="w-full px-3 py-2 text-gray-700 border rounded resize-none focus:outline-none focus:border-blue-500"
                  rows={3}
                />
              </div>
              <InputField
                label={isEditMode ? "Invoice Date" : "Current Date"}
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

          <div className="p-6 mb-8 bg-white border rounded">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">
              Buyer Details
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative">
                <label
                  htmlFor="customerName"
                  className="block mb-1 text-sm font-medium text-gray-700"
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
                  className="w-full px-3 py-2 text-gray-700 border rounded resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Enter customer name"
                />
                {isCustomerListOpen &&
                  invoiceData.buyerDetails.customerName &&
                  filteredCustomers.length > 0 && (
                    <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredCustomers.map((customer) => (
                        <li
                          key={customer._id}
                          onClick={() => {
                            handleCustomerSelect(customer);
                            setIsCustomerListOpen(false);
                          }}
                          className="relative py-2 pl-3 transition duration-150 ease-in-out cursor-pointer select-none pr-9 hover:bg-indigo-600 hover:text-white"
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
                  className="block mb-1 text-sm font-medium text-gray-700"
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
                  className="w-full px-3 py-2 text-gray-700 border rounded resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label
                  htmlFor="buyerDetails.email"
                  className="block mb-1 text-sm font-medium text-gray-700"
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
                  className="w-full px-3 py-2 text-gray-700 border rounded resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label
                  htmlFor="buyerDetails.gstNo"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  GST No <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="buyerDetails.gstNo"
                  id="buyerDetails.gstNo"
                  value={invoiceData.buyerDetails.gstNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-700 border rounded resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Enter GST Number"
                />
              </div>
              <div>
                <label
                  htmlFor="buyerDetails.gstName"
                  className="block mb-1 text-sm font-medium text-gray-700"
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
                  className="w-full px-3 py-2 text-gray-700 border rounded resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Enter GST name"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="buyerDetails.address"
                  className="block mb-1 text-sm font-medium text-gray-700"
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
                  className="w-full px-3 py-2 text-gray-700 border rounded resize-none focus:border-blue-500 focus:outline-none"
                  placeholder="Enter buyer's address"
                />
              </div>
            </div>
          </div>

          <div className="max-w-full p-6 space-y-6 overflow-x-auto rounded bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              Invoice Items
            </h2>
            <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    HSN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Qty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Unit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoiceData.items.map((item) => (
                  // <InvoiceItem
                  //   key={item.id}
                  //   id={item.id}
                  //   name={item.name}
                  //   hsn={item.hsn}
                  //   qty={item.qty}
                  //   price={item.price}
                  //   onDeleteItem={deleteItemHandler}
                  //   onEditItem={editItemHandler}
                  // />
                  <tr key={item.id}>
                    <td className="relative py-1 pr-0 md:pr-2 md:py-2">
                      <input
                        className="w-full px-1 py-2 text-gray-700 border rounded md:px-3 focus:border-blue-500 focus:outline-none"
                        type="text"
                        id={item.id}
                        name="name"
                        value={item.name}
                        onChange={(e) => handleServiceInputChange(e, item.id)}
                        onBlur={handleInputBlur}
                      />
                      {activeDropdownId === item.id && filteredServices.length > 0 && (
                          <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded max-h-48">
                            {filteredServices.map((service) => (
                              <li
                                key={service._id}
                                className="px-1 py-2 cursor-pointer md:px-4 hover:bg-gray-100"
                                onClick={() =>
                                  handleServiceSelect(service, item.id)
                                }
                              >
                                {service.categoryName}
                              </li>
                            ))}
                          </ul>
                        )}
                    </td>
                    <td className="px-1 py-1 md:px-4 md:py-2">
                      <input
                        className="w-full px-1 py-2 text-gray-700 border rounded md:px-3 focus:border-blue-500 focus:outline-none"
                        type="text"
                        name="hsn"
                        value={item.hsn}
                        // onChange={editItemHandler}
                        readOnly
                      />
                    </td>
                    <td className="px-1 py-1 md:px-4 md:py-2">
                      <input
                        className="w-full px-1 py-2 text-gray-700 border rounded md:px-3 focus:border-blue-500 focus:outline-none"
                        type="number"
                        id={item.id}
                        name="qty"
                        // min="1"
                        value={item.qty}
                        onChange={editItemHandler}
                      />
                    </td>
                    <td className="px-1 py-1 ">
                      <select
                        className="w-full py-2 text-gray-700 border rounded md:px-3 focus:border-blue-500 focus:outline-none"
                        name="unit"
                        id={item.id}
                        value={item.unit || "PAGES"} // Default to "PAGES" if unit is not set
                        onChange={editItemHandler}
                      >
                        <option value="PAGES">PAGES</option>
                        <option value="PIC">PIC</option>
                        <option value="BOX">BOX</option>
                      </select>
                    </td>
                    <td className="px-1 py-1 md:px-4 md:py-2">
                      <input
                        className="w-full px-1 py-2 text-gray-700 border rounded md:px-3 focus:border-blue-500 focus:outline-none"
                        type="number"
                        name="price"
                        id={item.id}
                        // min="0.00"
                        // step="0.01"
                        value={item.price}
                        onChange={editItemHandler}
                        // readOnly
                      />
                    </td>
                    <td className="px-2 py-1 text-center md:px-4 md:py-2">
                      <button
                        className="px-2 py-1 text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600"
                        type="button"
                        onClick={() => deleteItemHandler(item.id)}
                      >
                        {/* Delete */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addItemHandler}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="p-6 space-y-4 rounded bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              Invoice Summary
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Subtotal:
              </span>
              <span className="text-sm font-medium text-gray-900">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Discount ({invoiceData.discount || "0"}%):
              </span>
              <span className="text-sm font-medium text-gray-900">
                ₹{discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Total Tax ({totalTaxRate || "0"}%):
              </span>
              <span className="text-sm font-medium text-gray-900">
                ₹{taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-base font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-base font-semibold text-gray-900">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Tax and Discount Inputs */}
          <div className="p-6 space-y-4 rounded bg-gray-50">
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
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditMode ? "Update Invoice" : "Generate Invoice"}
            </button>
          </div>
        </form>
      </div>
      {showModal && !isEditMode && (
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
      <label className="block mb-1 text-sm font-medium text-gray-700">
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
