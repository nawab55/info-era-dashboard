import { useState, useEffect } from "react";
import api from "../../config/api";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { Edit2, Trash2, Calendar, Search } from "lucide-react";
import DeleteModal from "../../Components/Modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DomainReports = () => {
  const navigate = useNavigate();
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDomains = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/api/domain/get");
        setDomains(response.data.data);
        setFilteredDomains(response.data.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
        toast.error("Failed to fetch domains");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, []);

  useEffect(() => {
    let filtered = [...domains];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (domain) =>
          domain.domainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          domain.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply date filter
    if (month !== "") {
      const startDate = startOfMonth(new Date(year, month - 1));
      const endDate = endOfMonth(new Date(year, month - 1));
      filtered = filtered.filter((domain) => {
        const expiryDate = new Date(domain.expiryDate);
        return expiryDate >= startDate && expiryDate <= endDate;
      });
    }

    setFilteredDomains(filtered);
  }, [year, month, domains, searchQuery]);

  const handleDeleteClick = (domain) => {
    setDomainToDelete(domain);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/domain/delete/${domainToDelete._id}`);
      const updatedDomains = domains.filter(
        (domain) => domain._id !== domainToDelete._id
      );
      setDomains(updatedDomains);
      setFilteredDomains(updatedDomains);
      toast.success("Domain deleted successfully");
      setIsDeleteModalOpen(false);
      setDomainToDelete(null);
    } catch (error) {
      console.error("Error deleting domain:", error);
      toast.error("Failed to delete domain");
    }
  };

  const handleEditClick = (domain) => {
    navigate("/account/domain", {
      state: { domainData: domain, editMode: true }
    });
  };

    const renderYears = () => {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let y = currentYear + 5; y >= 2002; y--) {
        years.push(
          <option key={y} value={y}>
            {y}
          </option>
        );
      }
      return years;
    };

    const renderMonths = () => {
      const months = [
        <option key="" value="">
          Select Expiry Month
        </option>,
      ]; // Default option
      for (let m = 1; m <= 12; m++) {
        const date = new Date(year, m - 1, 1);
        const monthName = format(date, "MMMM");
        months.push(
          <option key={m} value={m}>
            {monthName}
          </option>
        );
      }
      return months;
    };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Domain Reports
          </h1>
          <div className="relative w-48 h-1 mx-auto mt-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-[slide_2s_linear_infinite]" />
          </div>
        </div>

        <div className="p-6 mb-6 bg-white border rounded-xl">
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search domains or customers..."
                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                {/* Year options */}
                {renderYears()}
              </select>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <select
                value={month}
                onChange={(e) =>
                  setMonth(
                    e.target.value === "" ? "" : parseInt(e.target.value)
                  )
                }
                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              >
                {/* Month options */}
                {renderMonths()}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <table className="min-w-full border divide-y divide-gray-200 rounded-lg">
                <thead className="">
                  <tr className="text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500">
                    <th className="px-4 py-2">Domain Name</th>
                    <th className="px-4 py-2">Customer Name</th>
                    <th className="px-4 py-2">Hosting</th>
                    <th className="px-4 py-2">SSL</th>
                    <th className="px-4 py-2">Customer Mobile</th>
                    <th className="px-4 py-2">WhatsApp Number</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Purchase Date</th>
                    <th className="px-4 py-2">Expiry Date</th>
                    <th className="px-4 py-2">Renewable Amount</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDomains.map((domain, index) => (
                    <tr
                      key={index}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.domainName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.customerName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.hosting}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.ssl}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.customerMobile}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.whatsappNumber}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.email}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {/* {domain.purchaseDate} */}
                        {format(new Date(domain.purchaseDate), "dd MMM yyyy")}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {/* {domain.expiryDate} */}
                        {format(new Date(domain.expiryDate), "dd MMM yyyy")}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.renewableAmount}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {domain.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClick(domain)}
                            className="p-2 text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(domain)}
                            className="p-2 text-red-600 transition-colors rounded-full hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDomainToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Domain"
        message="Are you sure you want to delete this domain? This action cannot be undone."
      />
    </div>
  );
};

export default DomainReports;




// import { useState, useEffect } from "react";
// import api from "../../config/api";
// import { format, startOfMonth, endOfMonth } from "date-fns";

// const DomainReports = () => {
//   const [domains, setDomains] = useState([]);
//   const [filteredDomains, setFilteredDomains] = useState([]);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(""); // Default to empty string

//   useEffect(() => {
//     const fetchDomains = async () => {
//       try {
//         const response = await api.get("/api/domain/get");
//         // console.log(response.data);
//         setDomains(response.data.domains);
//         setFilteredDomains(response.data.domains); // Initially show all domains
//       } catch (error) {
//         console.error("Error fetching domains:", error);
//       }
//     };

//     fetchDomains();
//   }, []);

//   useEffect(() => {
//     const filterDomainsByMonth = () => {
//       if (month === "") {
//         // If no month is selected, show all domains
//         setFilteredDomains(domains);
//       } else {
//         const startDate = startOfMonth(new Date(year, month - 1));
//         const endDate = endOfMonth(new Date(year, month - 1));
//         const filtered = domains.filter((domain) => {
//           const expiryDate = new Date(domain.expiryDate);
//           return expiryDate >= startDate && expiryDate <= endDate;
//         });
//         setFilteredDomains(filtered);
//       }
//     };
//     filterDomainsByMonth();
//   }, [year, month, domains]);

//   // console.log(filteredDomains);

//   const handleYearChange = (e) => {
//     setYear(parseInt(e.target.value));
//   };

//   const handleMonthChange = (e) => {
//     setMonth(e.target.value === "" ? "" : parseInt(e.target.value));
//   };

//   const renderYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let y = currentYear + 5; y >= 2002; y--) {
//       years.push(
//         <option key={y} value={y}>
//           {y}
//         </option>
//       );
//     }
//     return years;
//   };

//   const renderMonths = () => {
//     const months = [
//       <option key="" value="">
//         Select Month
//       </option>,
//     ]; // Default option
//     for (let m = 1; m <= 12; m++) {
//       const date = new Date(year, m - 1, 1);
//       const monthName = format(date, "MMMM");
//       months.push(
//         <option key={m} value={m}>
//           {monthName}
//         </option>
//       );
//     }
//     return months;
//   };

//   return (
//     <section className="flex-1 max-w-full overflow-x-auto bg-gray-50">
//       <div className="flex justify-center">
//         <h1
//           id="header"
//           className="p-4 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700"
//         >
//           Domain Reports
//         </h1>
//       </div>
//       <div className="p-2">
//         {/* Filter Section */}
//         <div className="flex justify-between gap-4 mb-6 lg:justify-start">
//           <select
//             value={year}
//             onChange={handleYearChange}
//             className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {renderYears()}
//           </select>
//           <select
//             value={month}
//             onChange={handleMonthChange}
//             className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {renderMonths()}
//           </select>
//         </div>
//         {/* Table Section */}
//         <div className="max-w-full overflow-x-auto">
//           <table className="min-w-full text-sm text-center bg-gray-100">
//             <thead className="sticky top-0 font-semibold text-white shadow bg-slate-700 text-nowrap">
//               <tr>
//                 <th className="px-4 py-2">Domain Name</th>
//                 <th className="px-4 py-2">Customer Name</th>
//                 <th className="px-4 py-2">Hosting</th>
//                 <th className="px-4 py-2">SSL</th>
//                 <th className="px-4 py-2">Customer Mobile</th>
//                 <th className="px-4 py-2">WhatsApp Number</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Purchase Date</th>
//                 <th className="px-4 py-2">Expiry Date</th>
//                 <th className="px-4 py-2">Renewable Amount</th>
//                 <th className="px-4 py-2">Address</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredDomains.map((domain, index) => (
//                 <tr
//                   key={index}
//                   className="text-gray-800 transition hover:bg-blue-50"
//                 >
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.domainName}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.customerName}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.hosting}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">{domain.ssl}</td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.customerMobile}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.whatsappNumber}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.email}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.purchaseDate}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.expiryDate}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.renewableAmount}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">
//                     {domain.address}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DomainReports;