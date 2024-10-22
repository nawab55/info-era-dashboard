import { RiMoneyDollarCircleFill } from "react-icons/ri";


const Salary = () => {
  return (
    <section className=" md:ml-56 mt-16 bg-gray-50 p-4">
      {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
        <div className="flex items-center my-auto">
          <div className="w-2 bg-purple-600 h-8 mr-3 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Salary</h1>
        </div>
        <div className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
          <RiMoneyDollarCircleFill  className="mr-2 w-6 h-6" />
          Salary
        </div>
      </div>
    </section>
  )
}

export default Salary