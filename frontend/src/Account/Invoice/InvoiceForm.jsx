import  { useEffect, useState } from "react";
import { uid } from "uid";
import { v4 as uuidv4} from "uuid";
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
  const [selectedCustomerId, setSelectedCustomerId] = useState("");  // state to store customerId
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
        const customerResponse = await api.get("/api/customers/get/allCustomer");
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
      customerId: customer._id,  // Set the customerId in the state
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
        customerId: selectedCustomerId,  //  Include the customerId in the payload
      }
      
      const response = await api.post("/api/invoices/create-invoice", invoicePayload);
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
  // console.log(invoiceData.companyInfo);
  return (
    <section className="p-2 md:ml-48 bg-blue-gray-50">
      <div className="p-2">
        <form
          className="flex flex-col flex-wrap justify-between"
          onSubmit={handleSubmit}
        >
          {/* <div className="max-w-3xl p-2 bg-yellow-100 shadow-md rounded-lg"> */}
          <h1 className="text-2xl font-bold mb-3 pb-2 text-center uppercase border-b border-gray-900 ">
            Invoice
          </h1>
          <h2 className="text-xl text-center font-semibold mb-2 text-gray-800">
            Company Information
          </h2> 

          <div className="flex flex-wrap mb-6 justify-between">
            {/* FIELD - 1 */}
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className="text-gray-800 text-sm font-medium mx-1">
                Company Name:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="text"
                value={invoiceData.companyInfo.companyName}
                readOnly
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                E-Mail:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="text"
                value={invoiceData.companyInfo.email}
                readOnly
                className="mt-1 w-full p-2 border border-gray-300 rounded-md "
              />
            </div>
            
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className="text-gray-800 text-sm font-medium mx-1">
                GSTIN/UIN:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="text"
                value={invoiceData.companyInfo.gstin}
                readOnly
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                CIN:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="text"
                value={invoiceData.companyInfo.cin}
                readOnly
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full">
              <label className="text-gray-800 text-sm font-medium mx-1">
                Address:<span className="text-red-600 font-bold">*</span>
              </label>
            <textarea
              value={invoiceData.companyInfo.address}
              readOnly
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                Current Date:
              </label>
              <input
                type="text"
                name="date"
                value={invoiceData.date}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label
                htmlFor="invoiceNo"
                className=" text-gray-800 text-sm font-medium mx-1"
              >
                Invoice No:
              </label>
              <input
                type="text"
                name="invoiceNo"
                id="invoiceNo"
                min="1"
                step="1"
                value={invoiceData.invoiceNo}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label
                htmlFor="cashierName"
                className=" text-gray-800 text-sm font-medium mx-1"
              >
                Cashier Name:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Cashier name"
                type="text"
                name="cashierName"
                id="cashierName"
                value={invoiceData.cashierName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                Delivery Note:
              </label>
              <input
                type="text"
                name="deliveryNote"
                value={invoiceData.deliveryNote}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className="text-gray-800 text-sm font-medium mx-1">
                Mode of Payment:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                required
                type="text"
                name="modeOfPayment"
                value={invoiceData.modeOfPayment}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className="text-gray-800 text-sm font-medium mx-1">
                Reference No:
              </label>
              <input
                type="text"
                name="referenceNo"
                value={invoiceData.referenceNo}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                Buyer&apos;s Order No:
              </label>
              <input
                type="text"
                name="buyersOrderNo"
                value={invoiceData.buyersOrderNo}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                Dispatched Doc No:
              </label>
              <input
                type="text"
                name="dispatchedDocNo"
                value={invoiceData.dispatchedDocNo}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                Dispatched Through:
              </label>
              <input
                type="text"
                name="dispatchedThrough"
                value={invoiceData.dispatchedThrough}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                Destination:
              </label>
              <input
                type="text"
                name="destination"
                value={invoiceData.destination}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className="text-gray-800 text-sm font-medium mx-1">
                Terms of Delivery:
              </label>
              <input
                type="text"
                name="termsOfDelivery"
                value={invoiceData.termsOfDelivery}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className="text-gray-800 text-sm font-medium mx-1">
                Order Id:
              </label>
              <input
                type="text"
                name="orderId"
                value={invoiceData.orderId}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Buyer Details */}
          <h2 className="text-xl text-center font-semibold mb-2 text-gray-800">
            Buyer (Bill to)
          </h2>
          <div className="flex flex-wrap mb-6 justify-between">
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label className=" text-gray-800 text-sm font-medium mx-1">
                Customer Name:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                required
                type="text"
                value={invoiceData.buyerDetails.customerName}
                onChange={handleCustomerInputChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
              {invoiceData.buyerDetails.customerName &&
                filteredCustomers.length > 0 && (
                  <ul className="border border-gray-300 rounded-md mt-2 max-h-40 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <li
                        key={customer._id}
                        onClick={() => handleCustomerSelect(customer)}
                        className="p-2 cursor-pointer bg-gray-100 hover:bg-blue-400"
                      >
                        {customer.name}
                      </li>
                    ))}
                  </ul>
                )}
              {/* <select
                  name="buyerDetails.customerName"
                  value={invoiceData.buyerDetails.customerName}
                  onChange={handleCustomerSelect} 
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Customer</option>
                  {customerData.map((customer) => ( 
                      <option key={customer._id} value={customer.name}>
                        {customer.name}
                      </option>
                  ))}
                </select> */}
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label
                htmlFor="buyerDetails.mobile"
                className=" text-gray-800 text-sm font-medium mx-1"
              >
                Mobile No:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                required
                type="text"
                name="buyerDetails.mobile"
                id="buyerDetails.mobile"
                value={invoiceData.buyerDetails.mobile}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label
                htmlFor="buyerDetails.email"
                className=" text-gray-800 text-sm font-medium mx-1"
              >
                Email:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                required
                type="text"
                name="buyerDetails.email"
                id="buyerDetails.email"
                value={invoiceData.buyerDetails.email}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
              <label
                htmlFor="buyerDetails.gstName"
                className=" text-gray-800 text-sm font-medium mx-1"
              >
                GST Name:<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                required
                type="text"
                name="buyerDetails.gstName"
                id="buyerDetails.gstName"
                value={invoiceData.buyerDetails.gstName}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col p-1 text-start w-full ">
              <label
                htmlFor="buyerDetails.address"
                className=" text-gray-800 text-sm font-medium mx-1"
              >
                Buyer Address:<span className="text-red-600 font-bold">*</span>
              </label>
              <textarea
                required
                name="buyerDetails.address"
                value={invoiceData.buyerDetails.address}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="block w-full border-gray-300 rounded-md">
            <p className="border-b text-center border-gray-900/10 mb-1 pb-2 mx-0">
              Description of Goods:
            </p>
            <table className="w-full p-4 text-left">
              <thead>
                <tr className="border-b border-gray-900/10 text-sm md:text-base">
                  <th className="text-center">ITEM</th>
                  <th className="text-center">HSN</th>
                  <th className="text-center">QTY</th>
                  <th className="text-center">PRICE</th>
                  <th className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
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
              className="rounded-md bg-blue-500 m-1 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
              type="button"
              onClick={addItemHandler}
            >
              + Add Item
            </button>
            <div className="flex flex-col items-end space-y-2 pt-6">
              <div className="flex w-full justify-between">
                <span className="font-bold text-start">Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex w-full justify-between">
                <span className="font-bold">Discount:</span>
                <span>
                  ({invoiceData.discount || "0"}%)₹{discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span className="font-bold">Total Tax:</span>
                <span>
                  ({totalTaxRate || "0"}%)₹{taxAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex w-full justify-between border-t mb-2 border-gray-900/10 pt-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 py-2 border-t">
            <div className="space-y-2">
              <div className="flex w-full justify-between text-gray-800">
                <label htmlFor="discount">Discount %</label>
                <input
                  className="w-[200px] p-1 border border-gray-300 rounded-md"
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="0.00"
                  min="0.00"
                  step="1"
                  max="100.00"
                  value={invoiceData.discount}
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-full justify-between text-gray-800">
                <label htmlFor="cgst">CGST %</label>
                <input
                  className="w-[200px] p-1 border border-gray-300 rounded-md"
                  id="cgst"
                  type="number"
                  name="cgst"
                  placeholder="0.00"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                  value={invoiceData.cgst}
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-full justify-between text-gray-800">
                <label htmlFor="sgst">SGST %</label>
                <input
                  className="w-[200px] p-1 border border-gray-300 rounded-md"
                  type="number"
                  name="sgst"
                  id="sgst"
                  placeholder="0.00"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                  value={invoiceData.sgst}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="rounded-md my-4 bg-custom-blue px-4 py-2 text-sm text-white shadow-sm hover:bg-custom-hover-blue"
              type="submit"
            >
              Generate Bill
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
