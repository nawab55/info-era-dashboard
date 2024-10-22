import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
// import Register from "./Components/Register";
import AuthGuard from "./Components/AuthGuard";
import Home from "./Home";

// Employee Dashboard
import Layout from "./Employee/Layout";
import WorkList from "./Employee/sidebarComponent/WorkList";
import EmpHome from "./Employee/EmpHome";
import Attendance from "./Employee/attendance/Attendance";
import ViewAttendance from "./Employee/attendance/ViewAttendance";
import Salary from "./Employee/sidebarComponent/Salary";
import LeaveApplication from "./Employee/sidebarComponent/LeaveApplication";
import Notification from "./Employee/sidebarComponent/Notification";
import ReportAProblem from "./Employee/sidebarComponent/ReportAProblem";
import OfferLetter from "./Employee/sidebarComponent/OfferLetter";
import IncrementLetter from "./Employee/sidebarComponent/IncrementLetter";
import DailySheet from "./Employee/sidebarComponent/DailySheet";

// Account Dashboard
import AccountLayout from "./Account/AccountLayout";
import Dashboard from "./Account/Dashboard";
import Profile from "./Account/AccountSidebarComponent/Profile";
import AddCategory from "./Account/Invoice/AddCategory";
import AddHsnCode from "./Account/Invoice/AddHsnCode";
import Services from "./Account/Invoice/Services";
import InvoiceForm from "./Account/Invoice/InvoiceForm";
import InvoiceReports from "./Account/Invoice/InvoiceReports";
import CustomerForm from "./Account/Invoice/CustomerForm";
import CustomerUpdate from "./Account/Invoice/CustomerUpdate";
import CustomerReports from "./Account/Invoice/CustomerReports";

// HR Dashboard
import HRLayout from "./HR/HRLayout";
import HRHome from "./HR/HRHome";
import EmpRegistrationForm from "./HR/Employee/EmpRegistrationForm";
import Worksheet from "./HR/worksheet/Worksheet";
import HRAttendance from "./HR/HRAttendance";
import ViewLeaveApplication from "./HR/Leave/ViewLeaveApplication";
import Alerts from "./HR/notification/Alerts";
import Issues from "./HR/notification/Issues";
import ClientComplain from "./HR/notification/ClientComplain";
import AttendanceReport from "./HR/Report/AttendanceReport";
import Project from "./HR/Report/Project";
import Domain from "./Account/AccountSidebarComponent/Domain";
import DomainReports from "./Account/AccountSidebarComponent/DomainReports";
import EmpRegReports from "./HR/Report/EmpRegReports";
import WorksheetReports from "./HR/Report/WorksheetReports";
import EmployeeType from "./HR/Employee/EmployeeType";

// Admin Dashboard
import AdminLayout from "./Admin/AdminLayout";
import AdminHome from "./Admin/AdminHome";
import AddCollege from "./Admin/adminComponents/training/AddCollege";
import AddStudent from "./Admin/adminComponents/training/AddStudent";
import Certificate from "./Admin/adminComponents/training/Certificate";
import CollegeReports from "./Admin/adminComponents/reports/CollegeReports";
import StudentReports from "./Admin/adminComponents/reports/StudentReports";
import CertificateReports from "./Admin/adminComponents/reports/CertificateReports";
import PrintCertificate from "./Admin/adminComponents/training/PrintCertificate";
import PostJob from "./Admin/adminComponents/jobs/PostJob";
import Activity from "./Admin/adminComponents/activity/Activity";
import AddActivity from "./Admin/adminComponents/activity/AddActivity";
import Ibc from "./Admin/adminComponents/co-partners/Ibc";
import Bbc from "./Admin/adminComponents/co-partners/Bbc";

// Client Dashboard
import ClientLayout from "./client/ClientLayout";
import ClientHome from "./client/ClientHome";
import ClientLogin from "./client/login/ClientLogin";
import ClientAuth from "./client/auth/ClientAuth";
import CustomerProfile from "./client/clientComponent/profile/CustomerProfile";
import ResetPassword from "./client/clientComponent/reset_password/ResetPassword";
import InvoiceDetails from "./client/clientComponent/InvoiceDetail/InvoiceDetails";
import Complain from "./client/clientComponent/service/Complain";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/client_login" element={<ClientLogin />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route element={<AuthGuard />}>
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard_admin" element={<AdminHome />} />
            <Route path="add-college" element={<AddCollege />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="training-certificate" element={<Certificate />} />
            <Route path="print-certificate" element={<PrintCertificate />} />
            <Route path="college-reports" element={<CollegeReports />} />
            <Route path="student-reports" element={<StudentReports />} />
            <Route
              path="certificate-reports"
              element={<CertificateReports />}
            />
            <Route path="report_ibc" element={<Ibc />} />
            <Route path="report_bbc" element={<Bbc />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="activity" element={<Activity />} />
            <Route path="add-activity" element={<AddActivity />} />
          </Route>

          {/* HR Dashboard */}
          <Route path="/hr" element={<HRLayout />}>
            <Route index element={<HRHome />} />
            <Route path="register" element={<EmpRegistrationForm />} />
            <Route path="worksheet" element={<Worksheet />} />
            <Route path="attendance" element={<HRAttendance />} />
            <Route path="leaves" element={<ViewLeaveApplication />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="issues" element={<Issues />} />
            <Route path="client/complain" element={<ClientComplain />} />
            <Route
              path="report/view_emp-registration"
              element={<EmpRegReports />}
            />
            <Route
              path="report/view_worksheet"
              element={<WorksheetReports />}
            />
            <Route
              path="report/view_attendance"
              element={<AttendanceReport />}
            />
            <Route path="report/view_project" element={<Project />} />
            <Route path="employee/type" element={<EmployeeType />} />
          </Route>
        </Route>

        <Route element={<AuthGuard />}>
          {/* Account Dashboard */}
          <Route path="/account" element={<AccountLayout />}>
            {/* <Route path="" element={<Dashboard />} /> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="product/addCategory" element={<AddCategory />} />
            <Route path="product/addHsnCode" element={<AddHsnCode />} />
            <Route path="product/services" element={<Services />} />
            <Route path="invoiceForm" element={<InvoiceForm />} />
            <Route path="invoiceReports" element={<InvoiceReports />} />
            <Route path="customer/addCustomer" element={<CustomerForm />} />
            <Route path="updateCustomer/:id" element={<CustomerUpdate />} />
            <Route
              path="customer/customerReport"
              element={<CustomerReports />}
            />
            <Route path="domain" element={<Domain />} />
            <Route path="domain/report" element={<DomainReports />} />
          </Route>

          {/* Employee Dashboard  */}
          <Route path="/employee" element={<Layout />}>
            <Route index element={<EmpHome />} />
            <Route path="worklist" element={<WorkList />} />
            <Route path="dailysheet" element={<DailySheet />} />
            <Route path="salary" element={<Salary />} />
            <Route path="attendance/add" element={<Attendance />} />
            <Route path="attendance/view" element={<ViewAttendance />} />
            <Route path="leaves" element={<LeaveApplication />} />
            <Route path="alerts" element={<Notification />} />
            <Route path="report-problem" element={<ReportAProblem />} />
            <Route path="hr/offer-letter" element={<OfferLetter />} />
            <Route path="hr/increment-letter" element={<IncrementLetter />} />
          </Route>
        </Route>

        {/* Client Dashboard */}
        <Route element={<ClientAuth />}>
          <Route path="/client" element={<ClientLayout />}>
            <Route path="dashboard_client" element={<ClientHome />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="edit_password" element={<ResetPassword />} />
            <Route path="invoice-details" element={<InvoiceDetails />} />
            <Route path="request-complain" element={<Complain />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
