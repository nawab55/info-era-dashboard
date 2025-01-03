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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen flex-1 bg-gray-100 lg:p-10 p-2">
      <div className="w-full max-w-6xl border mx-auto bg-white rounded overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white tracking-wider drop-shadow-md">
            Worksheet Submission
          </h1>
        </div>

        <form
          className="bg-white p-6 space-y-6 rounded-lg shadow-xl transition-transform transform"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {/* Employee Type Dropdown */}
            <div className="relative group">
              <label 
                htmlFor="employeeType"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Employee Type
              </label>
              <div className="relative">
              <select
                id="employeeType"
                name="employeeType"
                value={selectedType}
                onChange={handleEmployeeTypeChange}
                className="w-full px-4 py-3 bg-white border outline-none border-gray-300 rounded focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out text-gray-700 appearance-none"
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
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Employee ID
              </label>
              <select
                id="empId"
                name="empId"
                value={formData.empId}
                onChange={handleEmployeeChange}
                disabled={!selectedType}
                className="w-full px-4 py-3 bg-white border disabled:bg-gray-200 outline-none border-gray-300 rounded focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out text-gray-700 appearance-none"
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
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white  border outline-none border-gray-300 rounded focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out text-gray-700 appearance-none"
              />
            </div>

            {/* Conditional Fields */}
            {selectedType === "Software Engineer" && (
              <>
                <div className="">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border outline-none border-gray-300 rounded focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out text-gray-700 appearance-none"
                    placeholder="Enter project name"
                  />
                </div>

                <div >
                  <label
                    htmlFor="work"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Work Description
                  </label>
                  <input
                    type="text"
                    id="work"
                    name="work"
                    value={formData.work}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border outline-none border-gray-300 rounded focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out text-gray-700 appearance-none"
                    placeholder="Describe your work"
                  />
                </div>
              </>
            )}

            {selectedType === "Bussiness Development Associate" && (
              <>
                <div>
                  <label
                    htmlFor="excelUpload"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Upload Excel File
                  </label>
                  <div
                    className="flex items-center border-2 border-dashed border-blue-300 rounded-lg p-4 hover:border-blue-500 transition duration-300 ease-in-out group cursor-pointer"
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

                <div className="flex mt-10 items-center justify-center">
                  <button
                    type="button"
                    onClick={handleViewFile}
                    disabled={!formData.file}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg transition duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HiDocumentText className="mr-2" />
                    View File
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full shadow-xl transition duration-300 hover:scale-105 group"
            >
              <HiCheckCircle className="mr-2 group-hover:animate-pulse" />
              Submit Worksheet
            </button>
          </div>
        </form>
 
        {/* Excel Table Modal */}
        {/* {showExcelTable && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
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
            <thead className="bg-gradient-to-r from-teal-400 to-green-500 text-white">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-800">Excel Data</h3>
                <button
                  onClick={handleCloseTable}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <HiX className="w-8 h-8" />
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white">
                      <tr>
                        {Object.keys(excelData[0] || {}).map((key) => (
                          <th key={key} className="px-4 py-3 font-semibold">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 
                        hover:bg-indigo-50 transition duration-200"
                        >
                          {Object.values(row).map((value, cellIdx) => (
                            <td key={cellIdx} className="px-4 py-3">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
