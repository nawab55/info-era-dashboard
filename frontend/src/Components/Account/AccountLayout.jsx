import { Outlet } from "react-router-dom";
import AccountDashboard from "./AccountDashboard";

function AccountLayout() {
  return (
    <div className="">
      <AccountDashboard />
      <main className="mt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default AccountLayout;
