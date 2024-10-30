// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-t from-purple-500 to-blue-600 p-6">
//       <div className="container mx-auto flex flex-col justify-center items-center">
//         <h2 className="text-5xl text-white font-bold mb-4">Info Era Software Services</h2>
//         <Link to={'https://www.infoerasoftware.com'} className="bg-white text-sm text-blue-700 font-semibold py-2 px-6 rounded">Visit Our Website</Link>
//       </div>
//     </div>
//   )
// }

// export default Home;


import { Link } from "react-router-dom";
// import heroImage from '../assets/hero-image.jpg'; // Ensure you have the image

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Info Era</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>

            {/* Company dropdown */}
            <div className="relative group">
              <button className="hover:text-blue-400 transition duration-300">Company</button>
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                <li className="hover:bg-gray-100 p-2"><Link to="/about-us">About Us</Link></li>
                <li className="hover:bg-gray-100 p-2"><Link to="/teams">Teams</Link></li>
                <li className="hover:bg-gray-100 p-2"><Link to="/why-choose-us">Why Choose Us</Link></li>
              </ul>
            </div>

            {/* Services dropdown */}
            <div className="relative group">
              <button className="hover:text-blue-400 transition duration-300">Services</button>
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                <li className="hover:bg-gray-100 p-2"><Link to="/services/web-development">Web Development</Link></li>
                <li className="hover:bg-gray-100 p-2"><Link to="/services/digital-marketing">Digital Marketing</Link></li>
              </ul>
            </div>

            {/* Career dropdown */}
            <div className="relative group">
              <button className="hover:text-blue-400 transition duration-300">Career</button>
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                <li className="hover:bg-gray-100 p-2"><Link to="/career">Job Openings</Link></li>
              </ul>
            </div>

            {/* Co-Partners dropdown */}
            <div className="relative group">
              <button className="hover:text-blue-400 transition duration-300">Co-Partners</button>
              <ul className="absolute left-0 mt-2 w-48 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                <li className="hover:bg-gray-100 p-2"><Link to="/co-partners">Partners</Link></li>
              </ul>
            </div>

            <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
          </nav>
          <Link to="/query" className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-4 py-2 rounded">Query</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-t from-purple-500 to-blue-600 p-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="text-left lg:w-1/2 text-white space-y-4">
            <h2 className="text-4xl font-bold">Info Era Software Services Pvt. Ltd.</h2>
            <p>
              Info Era Software Services Pvt. Ltd. is a fast-growing IT company providing holistic IT solutions. We specialize in Website Development, Application Design, Digital Marketing, IT Consulting, and more.
            </p>
            <p><strong>Year of Experience:</strong> More than 9+ years</p>
            <p className=""><strong>No. of Clients:</strong> 1200+</p>
            <div>
            <Link to="/explore" className="bg-white text-blue-700 px-6 py-3 font-semibold rounded shadow hover:bg-gray-200 transition duration-300">Explore More</Link>
            </div>
          </div>
          {/* Image */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img src="/slider01.jpg" alt="Info Era" className="rounded-lg shadow-lg" />
          </div>
        </div> 
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Info Era Software Services Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
