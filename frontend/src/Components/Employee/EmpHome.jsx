const EmpHome = () => {
  return (
    <section className=" md:ml-52 mt-16 bg-blue-gray-50 px-4 py-6">
        <div className="bg-teal-200 p-5 text-center text-gray-700 shadow-lg">Home</div>
        <div className="flex justify-between px-8 bg-orange-100 mt-4 py-5 text-gray-700 shadow-lg">
          <h1 className="">Attendance</h1>
          <div>Value</div>
        </div>
        <div className="flex justify-between px-8 bg-lime-100 mt-4 py-5 text-center text-gray-700 shadow-lg">
          <h1>Leave</h1>
          <div>value</div>
        </div>
        <div className="flex justify-between px-8 bg-yellow-100 mt-4 py-5 text-center text-gray-700 shadow-lg">
          <h1>Salary</h1>
          <div>Value</div>
        </div>
        <div className="bg-amber-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 1</div>
        <div className="bg-cyan-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 2</div>
        <div className="bg-green-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 3</div>
        <div className="bg-green-100 mt-4 py-5 text-center text-gray-700 shadow-lg">Box 4</div>
        
    </section>
  )
}

export default EmpHome