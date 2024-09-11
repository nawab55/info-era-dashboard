import { useState, useEffect } from "react";
import api from "../../../config/api";
import { jwtDecode } from "jwt-decode";

function WorkList() {
  const [workList, setWorkList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchWorkList = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const decoded = jwtDecode(token);
        const empId = decoded.user.EmpId;
        const response = await api.get(`/api/worksheet/allData/${empId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setWorkList(response.data.worksheetData);
      } catch (error) {
        console.error("Error fetching work list:", error);
      }
    };

    fetchWorkList();
  }, []);

  const handleDateChange = (event, type) => {
    if (type === "start") {
      setStartDate(event.target.value);
    } else if (type === "end") {
      setEndDate(event.target.value);
    }
  };

  const filteredWorkList = workList.filter((work) => {
    const entryDate = new Date(work.date);
    return (
      (startDate === "" || entryDate >= new Date(startDate)) &&
      (endDate === "" || entryDate <= new Date(endDate))
    );
  });

  return (
    <section className="bg-slate-200 h-full mt-16 md:ml-52 p-4">
      <div className="bg-sky-200 p-4 text-center text-black text-2xl font-bold border-b-2 border-black">Work List</div>
      <div className="p-2 flex justify-between items-center">
        <div>
          <label className="mr-2 font-bold ">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, "start")}
            className="shadow my-0 p-2 text-base text-blue-700 border border-blue-300 rounded-md bg-gray-100  focus:ring-indigo-500 focus:border-blue-500 focus:border-2 hover:border-blue-400 focus:outline-none appearance-none mb-2 ml-2"
          />
        </div>
        <div>
          <label className="mr-2 font-bold">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, "end")}
            className="shadow my-0 p-2 text-base text-blue-700 border border-blue-300 rounded-md bg-gray-100  focus:ring-indigo-500 focus:border-blue-500 focus:border-2 hover:border-blue-400 focus:outline-none appearance-none mb-2 ml-2"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-center text-sm font-mono bg-slate-200">
          <thead className="border-b border-black font-medium bg-slate-300 sticky">
            <tr className="text-blue-700 border font-bold text-lg border-black">
              <th className="px-1 py-1 border border-black">Employee ID</th>
              <th className="px-1 py-1 border border-black">Employee Name</th>
              <th className="px-1 py-1 border border-black">Designation</th>
              <th className="px-1 py-1 border border-black">Project Name</th>
              <th className="px-1 py-1 border border-black">Work</th>
              <th className="px-1 py-1 border border-black">Work Done</th>
              <th className="px-1 py-1 border border-black">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border border-black">
            {filteredWorkList.map((work, index) => (
              <tr
                key={index}
                className="text-sm font-medium border border-black hover:bg-blue-200 text-center"
              >
                <td className="whitespace-nowrap px-1 py-1 border border-black">
                  {work.empId}
                </td>
                <td className="whitespace-nowrap px-1 py-1 border border-black">
                  {work.empName}
                </td>
                <td className="whitespace-nowrap px-1 py-1 border border-black">
                  {work.designation}
                </td>
                <td className="whitespace-nowrap px-1 py-1 border border-black">
                  {work.projectName}
                </td>
                <td className="whitespace-nowrap px-1 py-1 border border-black">
                  {work.work}
                </td>
                <td className="whitespace-nowrap px-1 py-1 border border-black">
                  {work.workDone}
                </td>
                <td className="whitespace-nowrap px-1 py-1 border border-black">
                  {work.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default WorkList;
