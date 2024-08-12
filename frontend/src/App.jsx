import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
// import Register from "./Components/Register";
import Home from "./Components/Home";
import AuthGuard from "./Components/AuthGuard";
import Layout from "./Components/Employee/Layout";
import WorkList from "./Components/Employee/sidebarComponent/WorkList";
import EmpHome from "./Components/Employee/EmpHome";
import Attendance from "./Components/Employee/sidebarComponent/Attendance";
import Salary from "./Components/Employee/sidebarComponent/Salary";
import LeaveHistory from "./Components/Employee/sidebarComponent/LeaveHistory";
import OfferLetter from "./Components/Employee/sidebarComponent/OfferLetter";
import IncrementLetter from "./Components/Employee/sidebarComponent/IncrementLetter";
import DailySheet from "./Components/Employee/sidebarComponent/DailySheet";

import AccountLayout from "./Components/Account/AccountLayout";
import Dashboard from "./Components/Account/Dashboard";
import Profile from "./Components/Account/AccountSidebarComponent/Profile";
import AddCategory from "./Components/Account/Invoice/AddCategory";
import AddHsnCode from "./Components/Account/Invoice/AddHsnCode";
import Services from "./Components/Account/Invoice/Services";
import InvoiceForm from "./Components/Account/Invoice/InvoiceForm";
import InvoiceReports from "./Components/Account/Invoice/InvoiceReports";
import CustomerForm from "./Components/Account/Invoice/CustomerForm";
import CustomerUpdate from "./Components/Account/Invoice/CustomerUpdate"
import CustomerReports from "./Components/Account/Invoice/CustomerReports";

import HRLayout from "./Components/HR/HRLayout"
import HRHome from "./Components/HR/HRHome";
import EmpRegistrationForm from "./Components/HR/Employee/EmpRegistrationForm";
import Worksheet from "./Components/HR/worksheet/Worksheet";
import HRAttendance from "./Components/HR/HRAttendance";
import AttendanceReport from "./Components/HR/Report/AttendanceReport";
import Project from "./Components/HR/Report/Project";
import Domain from "./Components/Account/AccountSidebarComponent/Domain";
import DomainReports from "./Components/Account/AccountSidebarComponent/DomainReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home />} />

        <Route element={<AuthGuard />}>
          <Route path="/hr" element={<HRLayout />}>
            <Route index element={<HRHome />} />
            <Route path="register" element={<EmpRegistrationForm />} />
            <Route path="worksheet" element={<Worksheet />} />
            <Route path="attendance" element={<HRAttendance />} />
            <Route path="report/view_attendance" element={<AttendanceReport />} />
            <Route path="report/view_project" element={<Project />} />
          </Route>
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/account" element={<AccountLayout />}>
            {/* <Route path="" element={<Dashboard />} /> */}
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="product/addCategory" element={<AddCategory />} />
            <Route path="product/addHsnCode" element={<AddHsnCode />} />
            <Route path="product/services" element={<Services />} />
            <Route path="invoiceForm" element={<InvoiceForm />} />
            <Route path="invoiceReports" element={<InvoiceReports />} />
            <Route path="customer/addCustomer" element={<CustomerForm />} />
            <Route path="updateCustomer/:id" element={<CustomerUpdate />} />
            <Route path="customer/customerReport" element={<CustomerReports />} />
            <Route path="domain" element={<Domain />} />
            <Route path="domain/report" element={<DomainReports />} /> 
          </Route>

          <Route path="/employee" element={<Layout />}>
            <Route index element={<EmpHome />} />
            <Route path="worklist" element={<WorkList />} />
            <Route path="dailysheet" element={<DailySheet />} />
            <Route path="salary" element={<Salary />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<LeaveHistory />} />
            <Route path="hr/offer-letter" element={<OfferLetter />} />
            <Route path="hr/increment-letter" element={<IncrementLetter />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
