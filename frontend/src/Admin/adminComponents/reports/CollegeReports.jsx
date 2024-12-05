import { useState, useEffect } from "react";
import api from "../../../config/api";

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
    <section className="flex-1 max-w-full min-h-screen lg:py-6 py-4 lg:px-6 px-2">
      <div className="border">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white text-2xl font-bold shadow-lg">
          <h2 className="lg:text-2xl text-xl lg:font-extrabold font-bold text-white text-center flex items-center justify-center">
            View All College Reports
          </h2>
        </div>

        <div className="lg:p-4 p-2">
          <div className="overflow-x-auto pb-10">
            <table className="min-w-full bg-white rounded border">
              <thead className="bg-gray-600">
                <tr className="text-white font-semibold text-base text-nowrap">
                  <th className="px-4 py-3 text-left border-gray-300">
                    Sl. No
                  </th>
                  <th className="px-4 py-3 text-left border-gray-300">
                    College Name
                  </th>
                  <th className="px-4 py-3 text-left border-gray-300">
                    College Code
                  </th>
                  <th className="px-4 py-3 text-left border-gray-300">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left border-gray-300">
                    Website
                  </th>
                  <th className="px-4 py-3 text-left border-gray-300">
                    Mobile No
                  </th>
                </tr>
              </thead>
              <tbody>
                {colleges.length > 0 ? (
                  colleges.map((college, index) => (
                    <tr
                      key={college._id}
                      className={`text-gray-700 text-sm ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <td className="whitespace-nowrap px-4 py-3 border">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 border">
                        {college.collegeName}
                      </td>
                      <td className="whitespace-nowrap px-4 py- border">
                        {college.collegeCode}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 border">
                        {college.address}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 border">
                        <a
                          href={`http://${college.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {college.website}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 border">
                        {college.mobileNo}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-6 text-gray-500 text-lg"
                    >
                      No colleges found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeReports;
