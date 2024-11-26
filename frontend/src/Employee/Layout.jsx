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
    <div>
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <div className="flex min-w-full">
     
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

// import { Outlet } from "react-router-dom";
// import AccountDashboard from "./AccountDashboard";

// function AccountLayout() {
//   return (
//     <div className="">
//       <AccountDashboard />
//       <main className="pt-2">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default AccountLayout;
