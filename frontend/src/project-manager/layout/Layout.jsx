import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;


// deepseek response 
// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// function Layout() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);

//   return (
//     <div className="flex flex-col h-screen max-w-full overflow-hidden">
//       {/* Navbar at the top */}
//       <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

//       {/* Main Content Area */}
//       <main className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

//         {/* Content Area */}
//         <div
//           className={`flex-1 overflow-y-auto transition-all duration-300 ${
//             sidebarToggle ? "ml-64" : "ml-0"
//           }`}
//         >
//           <div className="min-h-full p-4">
//             <Outlet />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Layout;


// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// function Layout() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);

//   return (
//     <div className="max-w-full">
//       <Navbar
//         sidebarToggle={sidebarToggle}
//         setSidebarToggle={setSidebarToggle}
//       />
//       <main className="flex ">
//         <div>
//           <Sidebar
//             sidebarToggle={sidebarToggle}
//             setSidebarToggle={setSidebarToggle}
//           />
//         </div> 
//         <div className="flex-1 max-w-full overflow-auto">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Layout;


// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';

// const Layout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // pass for login, manager.infoera@123 ,  manager@gmail.com

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//       <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-300`}>
//         <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <main className="p-6 mt-16">
//           <Outlet />
//         </main>
//       </div> 
//     </div>
//   );
// };

// export default Layout;