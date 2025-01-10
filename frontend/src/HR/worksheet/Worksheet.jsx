import { useState, useEffect } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { HiCheckCircle, HiDocumentText, HiUpload, HiX } from "react-icons/hi";

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
    file: null
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
      file: null
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
        designation: employee.designation
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file
    });
  };

  const handleViewFile = () => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(formData.file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });

      // Extract all sheet names
      const sheetNames = wb.SheetNames;

      // Create an array to hold data from all sheets
      const allSheetsData = sheetNames.map((sheetName) => {
        const ws = wb.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(ws);
        return {
          sheetName,
          data: sheetData
        };
      });

      // Update the state with all sheet data
      setExcelData(allSheetsData);
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
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success(`Worksheet for ${formData.empName} created successfully`);
      setFormData({
        empId: "",
        empName: "",
        designation: "",
        date: new Date().toISOString().split("T")[0],
        projectName: "",
        work: "",
        file: null
      });
      setSelectedType("");
      setFilteredEmployees([]);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="flex-1 min-h-screen p-2 bg-gray-100 lg:p-10">
      <div className="w-full max-w-6xl mx-auto overflow-hidden bg-white border rounded">
        <div className="p-6 text-center bg-gradient-to-r from-blue-500 to-indigo-500">
          <h1 className="text-2xl font-bold tracking-wider text-white drop-shadow-md">
            Worksheet Submission
          </h1>
        </div>

        <form
          className="p-6 space-y-6 transition-transform transform bg-white rounded-lg shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-3">
            {/* Employee Type Dropdown */}
            <div className="relative group">
              <label
                htmlFor="employeeType"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Employee Type
              </label>
              <div className="relative">
                <select
                  id="employeeType"
                  name="employeeType"
                  value={selectedType}
                  onChange={handleEmployeeTypeChange}
                  className="w-full px-4 py-3 text-gray-700 transition duration-300 ease-in-out bg-white border border-gray-300 rounded outline-none appearance-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Employee Type</option>
                  {employeeTypes.map((type) => (
                    <option key={type._id} value={type.type}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Employee ID Dropdown */}
            <div>
              <label
                htmlFor="empId"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Employee ID
              </label>
              <select
                id="empId"
                name="empId"
                value={formData.empId}
                onChange={handleEmployeeChange}
                disabled={!selectedType}
                className="w-full px-4 py-3 text-gray-700 transition duration-300 ease-in-out bg-white border border-gray-300 rounded outline-none appearance-none disabled:bg-gray-200 focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Employee</option>
                {filteredEmployees.map((employee) => (
                  <option key={employee.EmpId} value={employee.EmpId}>
                    {employee.name} - {employee.EmpId}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Input */}
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-gray-700 transition duration-300 ease-in-out bg-white border border-gray-300 rounded outline-none appearance-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Conditional Fields */}
            {(selectedType === "Software Engineer" ||
              selectedType === "Software Developer" ||
              selectedType === "Digital Marketing Executive" ||
              selectedType === "Bussiness Development Associate" ||
              selectedType === "Intern") && (
              <>
                <div className="">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-gray-700 transition duration-300 ease-in-out bg-white border border-gray-300 rounded outline-none appearance-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="work"
                    className="block mb-2 text-sm font-semibold text-gray-700"
                  >
                    Work Description
                  </label>
                  <input
                    type="text"
                    id="work"
                    name="work"
                    value={formData.work}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-gray-700 transition duration-300 ease-in-out bg-white border border-gray-300 rounded outline-none appearance-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Describe your work"
                  />
                </div>
              </>
            )}
          </div>

          {selectedType === "Bussiness Development Associate" && (
            <>
              <div>
                <label
                  htmlFor="excelUpload"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Upload Excel File
                </label>
                <div
                  className="flex items-center p-4 transition duration-300 ease-in-out border-2 border-blue-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <input
                    type="file"
                    id="excelUpload"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="excelUpload"
                    className="flex items-center w-full cursor-pointer"
                  >
                    <HiUpload
                      className={`mr-4 text-2xl ${
                        isHovered
                          ? "text-blue-500 transform scale-110"
                          : "text-gray-500"
                      } transition duration-300`}
                    />
                    <span className="text-gray-600 group-hover:text-blue-600">
                      {formData.file
                        ? `${formData.file.name} selected`
                        : "Choose an Excel file (.xlsx, .xls)"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-center mt-10">
                <button
                  type="button"
                  onClick={handleViewFile}
                  disabled={!formData.file}
                  className="flex items-center px-6 py-3 text-white transition duration-300 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiDocumentText className="mr-2" />
                  View File
                </button>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="flex items-center px-8 py-4 text-white transition duration-300 rounded-full shadow-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-105 group"
            >
              <HiCheckCircle className="mr-2 group-hover:animate-pulse" />
              Submit Worksheet
            </button>
          </div>
        </form>

        {/* Excel Table Modal */}
        {/* {showExcelTable && (
        <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-gray-800">Excel Data</h3>
            <button
              className="p-2 text-white transition transform bg-red-500 rounded-full hover:bg-red-700 hover:scale-105"
              onClick={handleCloseTable}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
          <table className="w-full mt-4 table-auto">
            <thead className="text-white bg-gradient-to-r from-teal-400 to-green-500">
              <tr>
                {Object.keys(excelData[0] || {}).map((key) => (
                  <th key={key} className="px-4 py-2 font-semibold text-left">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-teal-50"
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
      )} */}
        {showExcelTable && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-800">Excel Data</h3>
                <button
                  onClick={handleCloseTable}
                  className="text-red-500 transition duration-300 hover:text-red-700"
                >
                  <HiX className="w-8 h-8" />
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  {/* Loop through all sheets in excelData and render each table */}
                  {excelData.map((sheet, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="mb-3 text-xl font-bold text-gray-700">
                        {sheet.sheetName}
                      </h3>
                      <table className="w-full text-sm text-left border border-gray-300 rounded-lg">
                        <thead className="text-white bg-gradient-to-r from-indigo-400 to-blue-500">
                          <tr>
                            {Object.keys(sheet.data[0] || {}).map((key) => (
                              <th
                                key={key}
                                className="px-4 py-3 font-semibold text-center"
                              >
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sheet.data.map((row, idx) => (
                            <tr
                              key={idx}
                              className="transition duration-200 border-b border-gray-200 hover:bg-indigo-50"
                            >
                              {Object.values(row).map((value, cellIdx) => (
                                <td
                                  key={cellIdx}
                                  className="px-4 py-3 text-center"
                                >
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Worksheet;
