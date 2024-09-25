import { useState, useEffect } from 'react';
import api from "../../config/api";
import { toast } from "react-toastify";

const Domain = () => {
  const [formData, setFormData] = useState({
    domainName: '',
    purchaseDate: '',
    expiryDate: '',
    hosting: '',
    ssl: '',
    customerName: '',
    customerMobile: '',
    whatsappNumber: '',
    email: '',
    address: '',
    renewableAmount: '',
  });
  // const [domains, setDomains] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to the backend to store it in the database
    try {
      const response = await api.post('/api/domain/create', formData);
      console.log('Domain added:', response.data);
      toast.success("Data added successfully")
      fetchDomains(); // Refresh the list of domains
      setFormData({
        domainName: '',
        purchaseDate: '',
        expiryDate: '',
        hosting: '',
        ssl: '',
        customerName: '',
        customerMobile: '',
        whatsappNumber: '',
        email: '',
        address: '',
        renewableAmount: '',
      });
    } catch (error) {
      console.error('Error adding domain:', error);
    } 
  };

  const fetchDomains = async () => {
    try {
      const response = await api.get('/api/domain/get');
      console.log(response.data);
      
      // setDomains(response.data.domains);
      // console.log(domains);
      
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <section className="md:ml-48 bg-blue-100 p-4 font-sans">
      <h1 className="text-center font-bold text-2xl mb-4 text-black">Domain</h1>
      <form 
        className="max-w-7xl mx-auto px-8 py-8 bg-white shadow-lg shadow-blue-500/50 rounded-lg mb-8" 
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Domain Name</label>
            <input
              type="text"
              name="domainName"
              value={formData.domainName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
          
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Domain Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Domain Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Hosting</label>
            <select
              name="hosting"
              id='hosting'
              value={formData.hosting}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>

            </select>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">SSL</label>
            <select
              name="ssl"
              id='ssl'
              value={formData.ssl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>

            </select>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Customer Mobile</label>
            <input
              type="tel"
              name="customerMobile"
              value={formData.customerMobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">WhatsApp Number</label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Address</label>
            <input
              type="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
          
         
          <div className="w-full md:w-1/3 px-3 mb-4">
            <label className="block text-black font-semibold">Renewable Amount</label>
            <input
              type="number"
              name="renewableAmount"
              value={formData.renewableAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow-md"
              required
            />
          </div>
        </div>
        <div className='flex justify-center'>        
            <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
            Submit
            </button>
        </div>
      </form>
    </section>
  );
};

export default Domain;
