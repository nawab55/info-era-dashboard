import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-t from-purple-500 to-blue-600 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-5xl text-white font-bold mb-4">Info Era Software Services</h2>
        <Link to={'https://www.infoerasoftware.com'} className="bg-white text-sm text-blue-700 font-semibold py-2 px-6 rounded">Visit Our Website</Link>
      </div>
    </div>
  )
}

export default Home;