import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { useState } from "react";
import Sidebar from "./Sidebar";
// import Sidebar from "./Sidebar";

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
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
    // <div>
    //   <Navbar
    //     sidebarToggle={sidebarToggle}
    //     setSidebarToggle={setSidebarToggle}
    //   />
    //   <div className="flex min-w-full">
     
    //     <Sidebar
    //       sidebarToggle={sidebarToggle}
    //       setSidebarToggle={setSidebarToggle}
    //     />
    //     <Outlet />
    //   </div>
    // </div>
  );
}

export default Layout;

// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// function Layout() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);

//   return (
//     <div className="flex flex-col h-screen">
//       <Navbar
//         sidebarToggle={sidebarToggle}
//         setSidebarToggle={setSidebarToggle}
//       />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           sidebarToggle={sidebarToggle}
//           setSidebarToggle={setSidebarToggle}
//         />
//         <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Layout;
