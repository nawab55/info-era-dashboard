import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Users, Award, Brain, Trash2 } from "lucide-react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import api from "../../config/api";
import DeleteModal from "../../Components/Modal/DeleteModal";

const AssessmentResult = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(
          "/api/assessment/student-details/all-students"
        );
        if (
          response.status === 200 &&
          response.data?.success &&
          Array.isArray(response.data.data)
        ) {
          setStudents(response.data.data);
        } else {
          throw new Error(
            "Unexpected response structure or no students found."
          );
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch student data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDeleteStudent = async () => {
    try {
      const response = await api.delete(
        `/api/assessment-test/delete-student/${selectedStudent.mobile}`
      );
      // setStudents((prev) =>
      //   prev.filter((s) => s.mobile !== selectedStudent.mobile)
      // );
      // toast.success("Student data deleted successfully");
      // setIsDeleteModalOpen(false);
      if (response.status === 200 && response.data.success) {
        toast.success("Student and assessment data deleted successfully.");
        setStudents((prev) =>
          prev.filter((student) => student.mobile !== selectedStudent.mobile)
        );
        setIsDeleteModalOpen(false);
      } else {
        toast.error(
          response.data.message || "Failed to delete student data."
        );
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete student data"
      );
    }
  };

  const handleViewDetails = (student) => {
    navigate(`/hr/student-results/${student.mobile}`);
  };

  // eslint-disable-next-line react/prop-types
  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="p-6 transition-transform bg-white shadow-lg rounded-xl hover:scale-105">
      <div
        className={`inline-flex items-center justify-center p-3 rounded-lg ${color}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const columns = [
    {
      name: "#",
      selector: (_, index) => index + 1,
      sortable: true,
      width: "60px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      )
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
      cell: (row) => (
        <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
          {row.course}
        </span>
      )
    },
    {
      name: "Questions",
      sortable: true,
      cell: (row) => (
        <div className="flex gap-3">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600">
              {row.totalQuestions || 0}
            </p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-fuchsia-600">
              {row.attemptedQuestions || 0}
            </p>
            <p className="text-xs text-gray-500">Attempted</p>
          </div>
        </div>
      )
    },
    {
      name: "Performance",
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col items-center gap-1">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                Number(row.overallScore) >= 70
                  ? "bg-green-600"
                  : Number(row.overallScore) >= 40
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}
              style={{ width: `${row.overallScore}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">
            {isNaN(Number(row.overallScore))
              ? "N/A"
              : `${Number(row.overallScore).toFixed(1)}%`}
          </span>
        </div>
      )
    },
    {
      name: "Answers",
      cell: (row) => (
        <div className="flex gap-3">
          <div className="text-center">
            <p className="text-sm font-medium text-green-600">
              {row.correctAnswers}
            </p>
            <p className="text-xs text-gray-500">Correct</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-red-600">
              {row.incorrectAnswers}
            </p>
            <p className="text-xs text-gray-500">Incorrect</p>
          </div>
        </div>
      )
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleViewDetails(row)}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors "
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setSelectedStudent(row);
              setIsDeleteModalOpen(true);
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 transition-colors "
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8fafc",
        borderBottom: "2px solid #e2e8f0"
      }
    },
    headCells: {
      style: {
        color: "#1e293b",
        fontSize: "0.875rem",
        fontWeight: "600",
        paddingTop: "1rem",
        paddingBottom: "1rem"
      }
    },
    rows: {
      style: {
        fontSize: "0.875rem",
        backgroundColor: "#ffffff",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #f1f5f9"
        },
        "&:hover": {
          backgroundColor: "#f8fafc"
        },
        transition: "background-color 0.2s ease",
        minHeight: "60px"
      }
    }
  };

  const stats = [
    {
      icon: Users,
      title: "Total Students",
      value: students.length,
      color: "bg-blue-500"
    },
    {
      icon: Award,
      title: "Avg. Score",
      value: `${(
        students.reduce(
          (acc, curr) => acc + Number(curr.overallScore || 0),
          0
        ) / students.length || 0
      ).toFixed(1)}%`,
      color: "bg-green-500"
    },
    {
      icon: Brain,
      title: "Total Assessments",
      value: students.length,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedStudent(null);
        }}
        onConfirm={handleDeleteStudent}
        title="Confirm Student Deletion"
        message={`Are you sure you want to delete this student ${selectedStudent?.name}? This action cannot be undone.`}
      />

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Assessment Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Comprehensive overview of student performance and assessment results
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Student Results
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Detailed breakdown of individual student performance
            </p>
          </div>

          <DataTable
            columns={columns}
            data={students}
            customStyles={customStyles}
            pagination
            highlightOnHover
            progressPending={loading}
            progressComponent={
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            }
            noDataComponent={
              <div className="p-8 text-center text-gray-500">
                No assessment results found
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { toast } from "react-toastify"; // Import react-toastify for notifications
// import api from "../../config/api"; // Axios instance
// import DataTable from "react-data-table-component"; // Import DataTable

// const AssessmentResult = () => {
//   const [students, setStudents] = useState([]);
//   const navigate = useNavigate();

//   // Fetch student data from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await api.get(
//           "/api/assessment/student-details/all-students"
//         );
//         console.log(response.data);
//         // Validate the response and handle cases where the data may be malformed
//         if (
//           response.status === 200 &&
//           response.data?.success &&
//           Array.isArray(response.data.data)
//         ) {
//           setStudents(response.data.data);
//         } else {
//           throw new Error(
//             "Unexpected response structure or no students found."
//           );
//         }
//       } catch (error) {
//         // Log the error to the console and show a toast notification
//         console.error("Error fetching student data:", error);
//         toast.error(
//           error.response?.data?.message ||
//             "Failed to fetch student data. Please try again later."
//         );
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Handle redirection to student response page
//   const handleViewDetails = (student) => {
//     console.log(student);
//     navigate(`/hr/student-results/${student.mobile}`);
//   };

//    // Define columns for the DataTable
//    const columns = [
//     {
//       name: "#",
//       selector: (_, index) => index + 1,
//       sortable: true,
//       width: "50px",
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Mobile",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Course",
//       selector: (row) => row.course,
//       sortable: true,
//     },
//     {
//       name: "Total Questions",
//       selector: (row) => row.totalQuestions,
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "Correct Answers",
//       selector: (row) => row.correctAnswers,
//       sortable: true,
//       center: true,
//       cell: (row) => (
//         <span className="font-medium text-green-600">
//           {row.correctAnswers}
//         </span>
//       ),
//     },
//     {
//       name: "Incorrect Answers",
//       selector: (row) => row.incorrectAnswers,
//       sortable: true,
//       center: true,
//       cell: (row) => (
//         <span className="font-medium text-red-600">
//           {row.incorrectAnswers}
//         </span>
//       ),
//     },
//     {
//       name: "Overall Score (%)",
//       selector: (row) => row.overallScore,
//       sortable: true,
//       center: true,
//       cell: (row) => (
//         <span
//           className="font-medium text-blue-800"
//         >
//           {isNaN(Number(row.overallScore))
//             ? "N/A"
//             : `${Number(row.overallScore).toFixed(1)}%`}
//         </span>
//       ),
//     },
//     {
//       name: "Action",
//       center: true,
//       cell: (row) => (
//         <button
//           className="flex items-center justify-center gap-2 px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
//           onClick={() => handleViewDetails(row)}
//         >
//           <FaEye />
//           View Details
//         </button>
//       ),
//     },
//   ];

//   // Define custom styles for the DataTable
//   const customStyles = {
//     headCells: {
//       style: {
//         backgroundColor: "#2563eb", // Tailwind's 'bg-blue-600'
//         color: "#ffffff", // White text
//         fontWeight: "bold",
//         textTransform: "uppercase",
//         fontSize: "14px",
//         textAlign: "center",
//         whiteSpace: "normal", // Ensure full text is visible
//         wordWrap: "break-word",
//       },
//     },
//     rows: {
//       style: {
//         fontSize: "14px",
//         minHeight: "50px",
//         "&:nth-of-type(even)": {
//           backgroundColor: "#f9f9f9",
//         },
//         "&:hover": {
//           backgroundColor: "#f1f5f9",
//         },
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-blue-100">
//       <h1 className="mb-8 text-3xl font-bold text-center text-blue-800">
//         Student Assessment Reports
//       </h1>

//       <div className="p-4 bg-white border rounded-lg">
//         <DataTable
//           columns={columns}
//           data={students}
//           customStyles={customStyles}
//           pagination
//           highlightOnHover
//           defaultSortFieldId={1}
//           responsive
//         />
//       </div>
//     </div>
//   );
// };

// export default AssessmentResult;






// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { toast } from "react-toastify"; // Import react-toastify for notifications
// import api from "../../config/api"; // Axios instance

// const AssessmentResult = () => {
//   const [students, setStudents] = useState([]);
//   const navigate = useNavigate();

//   // Fetch student data from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await api.get(
//           "/api/assessment/student-details/all-students"
//         );
//         console.log(response.data);
//         // Validate the response and handle cases where the data may be malformed
//         if (
//           response.status === 200 &&
//           response.data?.success &&
//           Array.isArray(response.data.data)
//         ) {
//           setStudents(response.data.data);
//         } else {
//           throw new Error(
//             "Unexpected response structure or no students found."
//           );
//         }
//       } catch (error) {
//         // Log the error to the console and show a toast notification
//         console.error("Error fetching student data:", error);
//         toast.error(
//           error.response?.data?.message ||
//             "Failed to fetch student data. Please try again later."
//         );
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Handle redirection to student response page
//   const handleViewDetails = (student) => {
//     console.log(student);

//     navigate(`/hr/student-results/${student.mobile}`);
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-blue-100">
//       <h1 className="mb-8 text-3xl font-bold text-center text-blue-800">
//         Student Assessment Reports
//       </h1>

//       <div className="overflow-x-auto bg-white border rounded-lg">
//         <table className="w-full text-sm text-left text-gray-700">
//           <thead className="text-xs text-white uppercase bg-blue-600">
//             <tr>
//               <th className="px-6 py-3">#</th>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Mobile</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Course</th>
//               <th className="px-6 py-3">Total Questions</th>
//               <th className="px-6 py-3">Correct Answers</th>
//               <th className="px-6 py-3">Incorrect Answers</th>
//               <th className="px-6 py-3">Overall Score (%)</th>
//               <th className="px-6 py-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((student, index) => (
//                 <tr
//                   key={student._id}
//                   className="bg-white border-b hover:bg-gray-100 even:bg-gray-50"
//                 >
//                   <td className="px-6 py-4 font-medium text-gray-900">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-4">{student.name}</td>
//                   <td className="px-6 py-4">{student.mobile}</td>
//                   <td className="px-6 py-4">{student.email}</td>
//                   <td className="px-6 py-4">{student.course}</td>
//                   <td className="px-6 py-4 text-center">
//                     {student.totalQuestions}
//                   </td>
//                   <td className="px-6 py-4 text-center text-green-600">
//                     {student.correctAnswers}
//                   </td>
//                   <td className="px-6 py-4 text-center text-red-600">
//                     {student.incorrectAnswers}
//                   </td>
//                   <td className="px-6 py-4 font-semibold text-center text-blue-600">
//                     {isNaN(Number(student.overallScore))
//                       ? "N/A"
//                       : Number(student.overallScore).toFixed(1)}
//                     %
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       className="flex items-center justify-center gap-2 px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
//                       onClick={() => handleViewDetails(student)}
//                     >
//                       <FaEye />
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="10"
//                   className="px-6 py-4 text-center text-gray-500"
//                 >
//                   No student records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssessmentResult;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { toast } from "react-toastify"; // Import react-toastify for notifications
// import api from "../../config/api"; // Axios instance
// import DataTable from "react-data-table-component"; // Import react-data-table-component

// const AssessmentResult = () => {
//   const [students, setStudents] = useState([]); // All students data
//   const [filteredStudents, setFilteredStudents] = useState([]); // Searched data
//   const [searchTerm, setSearchTerm] = useState(""); // Search input value
//   const navigate = useNavigate();

//   // Fetch student data from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await api.get("/api/assessment/student-details/all-students");

//         if (response.status === 200 && response.data?.success && Array.isArray(response.data.data)) {
//           setStudents(response.data.data);
//           setFilteredStudents(response.data.data); // Initialize filtered data
//         } else {
//           throw new Error("Unexpected response structure or no students found.");
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//         toast.error(error.response?.data?.message || "Failed to fetch student data. Please try again later.");
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Handle search functionality
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = students.filter((student) =>
//       student.name.toLowerCase().includes(value) ||
//       student.email.toLowerCase().includes(value) ||
//       student.mobile.toLowerCase().includes(value)
//     );
//     setFilteredStudents(filtered);
//   };

//   // Handle redirection to student response page
//   const handleViewDetails = (student) => {
//     navigate(`/hr/student-results/${student.mobile}`);
//   };

//   // Define table columns
//   const columns = [
//     {
//       name: "#",
//       selector: (row, index) => index + 1,
//       width: "50px",
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Mobile",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//     },
//     {
//       name: "Course",
//       selector: (row) => row.course,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <button
//           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
//           onClick={() => handleViewDetails(row)}
//         >
//           <FaEye />
//           View Details
//         </button>
//       ),
//       center: true,
//     },
//   ];

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">Student Reports</h1>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name, email, or mobile..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Data Table */}
//       <div className="overflow-x-auto">
//         <DataTable
//           columns={columns}
//           data={filteredStudents}
//           pagination
//           highlightOnHover
//           responsive
//           paginationPerPage={10} // Show 10 records per page
//           paginationComponentOptions={{
//             rowsPerPageText: "Rows per page:",
//             rangeSeparatorText: "of",
//           }}
//           noDataComponent={<p className="text-gray-500">No student records found.</p>}
//         />
//       </div>
//     </div>
//   );
// };

// export default AssessmentResult;
