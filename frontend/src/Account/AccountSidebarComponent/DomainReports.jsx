import { useState, useEffect } from "react";
import api from "../../config/api";
import { format, startOfMonth, endOfMonth } from "date-fns";

const DomainReports = () => {
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(""); // Default to empty string

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await api.get("/api/domain/get");
        // console.log(response.data);
        setDomains(response.data.domains);
        setFilteredDomains(response.data.domains); // Initially show all domains
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, []);

  useEffect(() => {
    const filterDomainsByMonth = () => {
      if (month === "") {
        // If no month is selected, show all domains
        setFilteredDomains(domains);
      } else {
        const startDate = startOfMonth(new Date(year, month - 1));
        const endDate = endOfMonth(new Date(year, month - 1));
        const filtered = domains.filter((domain) => {
          const expiryDate = new Date(domain.expiryDate);
          return expiryDate >= startDate && expiryDate <= endDate;
        });
        setFilteredDomains(filtered);
      }
    };
    filterDomainsByMonth();
  }, [year, month, domains]);

  // console.log(filteredDomains);

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value === "" ? "" : parseInt(e.target.value));
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
        Select Month
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
    <section className="flex-1 max-w-full bg-gray-50 overflow-x-auto">
      <div className="flex justify-center">
        <h1
          id="header"
          className="p-4 text-center font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-fuchsia-700 text-2xl"
        >
          Domain Reports
        </h1>
      </div>
      <div className="p-2">
        {/* Filter Section */}
        <div className="flex lg:justify-start justify-between gap-4 mb-6">
          <select
            value={year}
            onChange={handleYearChange}
            className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {renderYears()}
          </select>
          <select
            value={month}
            onChange={handleMonthChange}
            className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {renderMonths()}
          </select>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full text-center text-sm bg-gray-100">
            <thead className="bg-slate-700 text-nowrap text-white font-semibold sticky top-0 shadow">
              <tr>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDomains.map((domain, index) => (
                <tr
                  key={index}
                  className="text-gray-800 hover:bg-blue-50 transition"
                >
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.domainName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.customerName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.hosting}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">{domain.ssl}</td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.customerMobile}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.whatsappNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.purchaseDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.expiryDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.renewableAmount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {domain.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DomainReports;
