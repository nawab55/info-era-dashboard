import { useState, useEffect } from "react";
import api from "../../../../config/api";

const CollegeReports = () => {
  const [colleges, setColleges] = useState([]);

  // Fetch college data from the backend
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await api.get("/api/college/get-colleges");
        setColleges(response.data.colleges);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    fetchColleges();
  }, []);

  return (
    <section className="md:ml-60 bg-gray-50 px-4">
      <div className="bg-blue-700 p-4 text-center text-white text-2xl font-bold border-b-2 border-gray-700 shadow-md">
        View All College Reports
      </div>

      <div className="p-4">
        <div className="overflow-x-auto pb-10">
          <table className="min-w-full text-center text-sm bg-white shadow-lg rounded-lg">
            <thead className="border-b border-gray-300 font-medium bg-gray-200">
              <tr className="text-gray-900 border font-bold text-lg">
                <th className="px-2 py-3 border border-gray-300">Sl. No</th>
                <th className="px-2 py-3 border border-gray-300">College Name</th>
                <th className="px-2 py-3 border border-gray-300">College Code</th>
                <th className="px-2 py-3 border border-gray-300">Address</th>
                <th className="px-2 py-3 border border-gray-300">Website</th>
                <th className="px-2 py-3 border border-gray-300">Mobile No</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {colleges.length > 0 ? (
                colleges.map((college, index) => (
                  <tr
                    key={college._id}
                    className="bg-white text-sm font-medium border border-gray-300 hover:bg-gray-100 transition duration-150"
                  >
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {college.collegeName}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {college.collegeCode}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {college.address}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      <a
                        href={`http://${college.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {college.website}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 border border-gray-300">
                      {college.mobileNo}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No colleges found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CollegeReports;
