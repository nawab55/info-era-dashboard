import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { HiX } from "react-icons/hi";

const Worksheet = () => {
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showExcelTable, setShowExcelTable] = useState(false);
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    designation: "",
    date: new Date().toISOString().split("T")[0],
    projectName: "",
    work: "",
    file: null,
  });
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await api.get("/api/type/employee-types");
        setEmployeeTypes(response.data);
      } catch (error) {
        console.error("Error fetching employee types:", error);
      }
    };
    fetchEmployeeTypes();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/api/user/all/getalluser");
        setEmployees(response.data.users);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredEmployees(
        employees.filter((emp) => emp.empType === selectedType)
      );
    } else {
      setFilteredEmployees([]);
    }
  }, [selectedType, employees]);

  const handleEmployeeTypeChange = (e) => {
    setSelectedType(e.target.value);
    setFormData({
      ...formData,
      empId: "",
      empName: "",
      designation: "",
      projectName: "",
      work: "",
      file: null,
    });
  };

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    const employee = filteredEmployees.find((emp) => emp.EmpId === empId);
    if (employee) {
      setFormData({
        ...formData,
        empId: employee.EmpId,
        empName: employee.name,
        designation: employee.designation,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleViewFile = () => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(formData.file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setExcelData(data);
      setShowExcelTable(true);
    };

    fileReader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  const handleCloseTable = () => {
    setShowExcelTable(false);
    setExcelData([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      await api.post("/api/worksheet/creatework", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`Worksheet for ${formData.empName} created successfully`);
      setFormData({
        empId: "",
        empName: "",
        designation: "",
        date: new Date().toISOString().split("T")[0],
        projectName: "",
        work: "",
        file: null,
      });
      setSelectedType("");
      setFilteredEmployees([]);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <section className="bg-gradient-to-br flex-1 h-full  p-4">
      <form
        className="bg-white p-6 space-y-6 rounded-lg  border border-gray-300 transition-transform transform"
        onSubmit={handleSubmit}
      >
        <div className="p-4 text-center text-3xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 rounded-tl rounded-tr text-white">
          Worksheet Form
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div>
            <label className="block font-semibold text-gray-900">
              Employee Type
            </label>
            <select
              name="employeeType"
              value={selectedType}
              onChange={handleEmployeeTypeChange}
              className="bg-blue-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
            >
              <option value="">Select Employee Type</option>
              {employeeTypes.map((type) => (
                <option key={type._id} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-900">
              Employee ID
            </label>
            <select
              name="empId"
              value={formData.empId}
              onChange={handleEmployeeChange}
              className="bg-blue-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
              disabled={!selectedType}
            >
              <option value="">Select Employee</option>
              {filteredEmployees.map((employee) => (
                <option key={employee.EmpId} value={employee.EmpId}>
                  {employee.name} - {employee.EmpId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-900">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="bg-blue-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
            />
          </div>

          {selectedType === "Developer" && (
            <>
              <div>
                <label className="block font-semibold text-gray-900">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="bg-blue-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                />
              </div>

              <div className="mb-12">
                <label className="block font-semibold text-gray-900">
                  Work
                </label>
                <input
                  type="text"
                  name="work"
                  value={formData.work}
                  onChange={handleInputChange}
                  className="bg-blue-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                />
              </div>
            </>
          )}

          {selectedType === "Telecaller" && (
            <>
              <div>
                <label className="block font-semibold text-gray-900">
                  Upload Excel
                </label>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="bg-blue-100 mt-2 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                />
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleViewFile}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded shadow-lg cursor-pointer"
                  disabled={!formData.file}
                >
                  View File
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded shadow-lg "
          >
            Submit Worksheet
          </button>
        </div>
      </form>

      {showExcelTable && (
        <div className="bg-white border rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">Excel Data</h3>
            <button
              className="bg-red-500 text-white rounded-full p-2 hover:bg-red-700 transition transform hover:scale-105"
              onClick={handleCloseTable}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
          <table className="table-auto w-full mt-4">
            <thead className="bg-gradient-to-r from-blue-400 to-green-500 text-white">
              <tr>
                {Object.keys(excelData[0] || {}).map((key) => (
                  <th key={key} className="px-4 py-2 text-left font-semibold">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  {Object.values(row).map((value, cellIdx) => (
                    <td key={cellIdx} className="px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Worksheet;
