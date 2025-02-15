import { Outlet } from "react-router-dom";
import AccountNavbar from "./AccountNavbar";
import AccountSidebar from "./AccountSidebar";
import { useState } from "react";

function AccountLayout() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <AccountNavbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <div className="flex flex-1 overflow-hidden">
        <AccountSidebar
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

export default AccountLayout;


// import { Outlet } from "react-router-dom";
// import AccountNavbar from "./AccountNavbar";
// import AccountSidebar from "./AccountSidebar";
// import { useState } from "react";

// function AccountLayout() {
//   const [sidebarToggle, setSidebarToggle] = useState(false);
//   return (
//     <div>
//       <AccountNavbar setSidebarToggle={setSidebarToggle} />
//       <main className="flex flex-1 ">
//         <AccountSidebar
//           sidebarToggle={sidebarToggle}
//           setSidebarToggle={setSidebarToggle}
//         />
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default AccountLayout;



