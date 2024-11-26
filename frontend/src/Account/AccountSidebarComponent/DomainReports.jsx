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
        console.log(response.data);
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

  console.log(filteredDomains);

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
    <section className="md:ml-48 bg-sky-100">
      <div className="bg-sky-200 p-4 text-center text-black text-2xl font-bold border-b-2 border-black">
        Domain Reports
      </div>
      <div className="p-4">
        <div className="flex gap-6 mb-4">
          <select
            value={year}
            onChange={handleYearChange}
            className="py-2 px-3 border border-black rounded shadow-md"
          >
            {renderYears()}
          </select>
          <select
            value={month}
            onChange={handleMonthChange}
            className="p-2 border border-black rounded shadow-md"
          >
            {renderMonths()}
          </select>
        </div>
        <div className="overflow-x-auto pb-20">
          <table className="min-w-full text-center text-sm bg-indigo-100">
            <thead className="border-b border-black font-medium bg-indigo-300 sticky">
              <tr className="text-slate-950 border font-bold text-lg border-black">
                <th className="px-1 py-1 border border-black">Domain Name</th>
                <th className="px-1 py-1 border border-black">Customer Name</th>
                <th className="px-1 py-1 border border-black">Hosting</th>
                <th className="px-1 py-1 border border-black">SSL</th>
                <th className="px-1 py-1 border border-black">
                  Customer Mobile
                </th>
                <th className="px-1 py-1 border border-black">
                  WhatsApp Number
                </th>
                <th className="px-1 py-1 border border-black">Email</th>
                <th className="px-1 py-1 border border-black">Purchase Date</th>
                <th className="px-1 py-1 border border-black">Expiry Date</th>
                <th className="px-1 py-1 border border-black">
                  Renewable Amount
                </th>
                <th className="px-1 py-1 border border-black">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-gray-100 border border-black">
              {filteredDomains.map((domain, index) => (
                <tr
                  key={index}
                  className="text-sm font-medium border border-black hover:bg-blue-200 text-center"
                >
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.domainName}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.customerName}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.hosting}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.ssl}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.customerMobile}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.whatsappNumber}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.email}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.purchaseDate}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.expiryDate}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
                    {domain.renewableAmount}
                  </td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">
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
