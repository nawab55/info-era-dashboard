const Notification = () => {
  return (
    <section className="md:ml-56 mt-16 bg-gray-50 p-4">
          {/* Top Card Section */}
      <div className="flex justify-between items-center bg-blue-50 p-4 shadow-md rounded-lg">
        <div className='flex items-center my-auto'>
          <div className='w-2 bg-purple-600 h-8 mr-3 rounded-full'></div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        </div>
        <button 
        //   onClick={handleModal} 
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          {/* <BiErrorCircle className="mr-2" /> */}
          Date 
        </button>
      </div>
      </section>
  )
}

export default Notification