import {
  FaWallet,
  FaMoneyCheckAlt,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

function Dashboard() {
  return (
    <section className="flex-1 bg-slate-100 min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Accounts Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here’s an overview of your financial metrics.
        </p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="text-blue-600 text-4xl mr-4">
            <FaWallet />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Revenue
            </h3>
            <p className="text-xl font-bold text-gray-900">$50,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="text-green-600 text-4xl mr-4">
            <FaMoneyCheckAlt />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Expenses</h3>
            <p className="text-xl font-bold text-gray-900">$15,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="text-purple-600 text-4xl mr-4">
            <FaChartLine />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Profit</h3>
            <p className="text-xl font-bold text-gray-900">$35,000</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="text-orange-500 text-4xl mr-4">
            <FaUsers />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Clients</h3>
            <p className="text-xl font-bold text-gray-900">150</p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold">Generate Invoice</h3>
          <p className="mt-2">
            Create new invoices and send them to your clients with ease.
          </p>
          <button className="mt-4 bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition">
            Get Started
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold">Track Payments</h3>
          <p className="mt-2">
            Keep an eye on pending payments and manage transactions effectively.
          </p>
          <button className="mt-4 bg-white text-green-700 px-4 py-2 rounded-md font-semibold hover:bg-green-100 transition">
            View Details
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold">Financial Reports</h3>
          <p className="mt-2">
            Analyze your financial performance with detailed reports.
          </p>
          <button className="mt-4 bg-white text-purple-700 px-4 py-2 rounded-md font-semibold hover:bg-purple-100 transition">
            Explore Reports
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
