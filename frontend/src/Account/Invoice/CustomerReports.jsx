import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FiEye, FiEdit2, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import api from '../../config/api'

const CustomerReports = () => {
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/api/customers/get/allCustomer')
        setCustomers(response.data)
      } catch (error) {
        console.error('Error fetching customers', error)
        toast.error('Failed to fetch customers')
      }
    }

    fetchCustomers()
  }, [])

  const handleViewClick = async (customerId) => {
    const token = sessionStorage.getItem("token")
    try {
      const response = await api.get(`/api/customers/details/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSelectedCustomer(response.data)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error fetching customer details', error)
      toast.error('Failed to fetch customer details')
    }
  }

  const handleUpdateClick = (customerId) => {
    navigate(`/account/updateCustomer/${customerId}`)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCustomer(null)
  }

  return (
    <div className="p-6 flex-1 max-w-full bg-gray-50 min-h-screen">
        <div className="flex justify-center mb-6">
            <h1
              id="header"
              className="p-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700 text-2xl"
            >Customer Reports</h1>
            </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className='bg-slate-600'>
              {['S.No', 'Name', 'Email', 'View', 'Update'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-white font-medium  uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer, index) => (
              <tr key={customer._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleViewClick(customer._id)} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    aria-label={`View details for ${customer.name}`}
                  >
                    <FiEye className="text-xl" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleUpdateClick(customer._id)} 
                    className="text-green-600 hover:text-green-800 transition-colors duration-200"
                    aria-label={`Update details for ${customer.name}`}
                  >
                    <FiEdit2 className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-auto relative">
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close modal"
            >
              <FiX className="text-2xl" />
            </button>
            {selectedCustomer && (
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Details</h2>
                {[
                  { label: 'Name', value: selectedCustomer.name },
                  { label: 'Email', value: selectedCustomer.email },
                  { label: 'Mobile', value: selectedCustomer.mobile },
                  { label: 'Address', value: selectedCustomer.address },
                  { label: 'GST No.', value: selectedCustomer.gstNo },
                  { label: 'GST Name', value: selectedCustomer.gstName },
                ].map(({ label, value }) => (
                  <p key={label} className="text-sm">
                    <span className="font-medium text-gray-600">{label}:</span>{' '}
                    <span className="text-gray-800">{value}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerReports

