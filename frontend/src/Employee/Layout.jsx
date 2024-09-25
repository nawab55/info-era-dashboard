import { Outlet, useLocation } from "react-router-dom";
// import { useState } from "react";
// import Dashboard from "./Dashboard";
import EmpDashboard from "./EmpDashboard";
// import Sidebar from "./Sidebar";

function Layout() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);
  const location = useLocation();

  console.log("Layout rendered, current location:", location.pathname);

  return (
    <div className="">
      {/* <Sidebar sidebarToggle={sidebarToggle} /> */}
      <div className="">
        <EmpDashboard />
        {/* <Dashboard
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        /> */}
        <main className="">
          <Outlet />
        </main>
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