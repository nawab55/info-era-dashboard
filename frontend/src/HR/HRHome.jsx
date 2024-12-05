import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Calendar, CalendarCheck, ChevronDown, Users } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const DashboardOverview = () => {
  // Sample data
  const employeeCount = 120;
  const monthlyLeaves = [4, 8, 5, 7, 6, 9, 3, 4, 8, 6, 5, 7]; // Example data for leaves per month
  const monthlyAttendance = [22, 20, 18, 21, 23, 24, 22, 25, 21, 20, 19, 22]; // Example for own attendance per month

  // Chart data for leaves
  const leaveData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Leaves",
        data: monthlyLeaves,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart data for attendance
  const attendanceData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "My Attendance",
        data: monthlyAttendance,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br flex-1 from-gray-50 to-gray-100 min-h-screen p-6 space-y-6">
    <h1 className="text-2xl font-semibold text-gray-800 mb-8">
      Dashboard Overview
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Employee Count */}
      <div className="bg-white rounded border p-6 transition duration-300 ease-in-out ">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="text-blue-600 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Employees</h2>
            <p className="text-3xl font-bold text-blue-600">{employeeCount}</p>
          </div>
        </div>
      </div>

      {/* Monthly Leaves */}
      <div className="bg-white rounded border p-6 transition duration-300 ease-in-out ">
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Calendar className="text-red-600 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Monthly Leaves</h2>
            <p className="text-3xl font-bold text-red-600">
              {monthlyLeaves.reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Attendance */}
      <div className="bg-white rounded border p-6 transition duration-300 ease-in-out ">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CalendarCheck className="text-green-600 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Monthly Attendance</h2>
            <p className="text-3xl font-bold text-green-600">
              {monthlyAttendance.reduce((a, b) => a + b, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Leaves Chart */}
      <div className="bg-white rounded border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Employee Leaves Overview
          </h2>
          <div className="relative">
            <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent">
              <option value="nawab">Nawab</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
        <Bar
        data={leaveData}
        options={{
          responsive: true,
          plugins: { legend: { display: true }, title: { display: false } },
        }}
      />
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white rounded border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          My Monthly Attendance
        </h2>
        <div className="h-64 flex items-center justify-center">
        <Line
        data={attendanceData}
        options={{
          responsive: true,
          plugins: { legend: { display: true }, title: { display: false } },
        }}
      />
        </div>
      </div>
    </div>
  </div>
  );
};

export default DashboardOverview;
