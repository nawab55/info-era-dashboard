import { Outlet } from "react-router-dom";
import HRNavbar from "./HRNavbar";
import { useState } from "react";
import HRSidebar from "./HRSidebar";

function Layout() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <HRNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <div className="flex flex-1 overflow-hidden">
        <HRSidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <main className="flex-1 p-2 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

// import { Outlet } from "react-router-dom";
// import HRNavbar from "./HRNavbar";
// import { useState } from "react";
// import HRSidebar from "./HRSidebar";

// function Layout() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);

//   return (
//     <div className="max-w-full">
//       <HRNavbar
//         sidebarToggle={sidebarToggle}
//         setSidebarToggle={setSidebarToggle}
//       />
//       <main className="flex ">
//         <div>
//           <HRSidebar
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
