import { Outlet } from "react-router-dom";
import AccountDashboard from "./AccountDashboard";

function AccountLayout() {
  return (
    <div className="">
      <AccountDashboard />
      <main className="mt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default AccountLayout;
