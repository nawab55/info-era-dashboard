import { Outlet, useLocation } from "react-router-dom";
import ClientDashboard from "./ClientDashboard";
import Breadcrumb from "../Components/breadcrumb/BreadCrumb";
// import Sidebar from "./Sidebar";

const ClientLayout = () => {
  //   const [sidebarToggle, setSidebarToggle] = useState(false);
  const location = useLocation();

  console.log("Layout rendered, current location:", location.pathname);

  return (
    <>
      <div className=" bg-blue-50 ">
        <ClientDashboard />

        <main className="">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ClientLayout;
