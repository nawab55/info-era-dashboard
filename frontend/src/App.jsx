import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
// import Register from "./Components/Register";
import AuthGuard from "./Components/AuthGuard";
// import Home from "./Home";
import AuthLogin from "./Components/AuthLogin";
import NotFound from "./NotFound";
import ForgotPassword from "./Components/ForgotPassword";
import UpdatePassword from "./Components/ResetPassword";

// Employee Dashboard
import Layout from "./Employee/Layout";
import WorkList from "./Employee/sidebarComponent/WorkList";
import EmpHome from "./Employee/EmpHome";
import Attendance from "./Employee/attendance/Attendance";
import ViewAttendance from "./Employee/attendance/ViewAttendance";
import LeaveApplication from "./Employee/sidebarComponent/LeaveApplication";
import Notification from "./Employee/sidebarComponent/Notification";
import ReportAProblem from "./Employee/sidebarComponent/ReportAProblem";
import DailySheet from "./Employee/sidebarComponent/DailySheet";

// Account Dashboard
import AccountLayout from "./Account/AccountLayout";
import Dashboard from "./Account/Dashboard";
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
// import HRHome from "./HR/HRHome";
import DashboardOverview from "./HR/DashboardOverview";

import EmpRegistrationForm from "./HR/Employee/EmpRegistrationForm";
import Worksheet from "./HR/worksheet/Worksheet";
import HRAttendance from "./HR/HRAttendance";
import ViewLeaveApplication from "./HR/Leave/ViewLeaveApplication";
import Alerts from "./HR/notification/Alerts";
import Issues from "./HR/notification/Issues";
import ClientComplain from "./HR/notification/ClientComplain";
import Domain from "./Account/AccountSidebarComponent/Domain";
import DomainReports from "./Account/AccountSidebarComponent/DomainReports";
import EmpRegReports from "./HR/Report/EmpRegReports";
import WorksheetReports from "./HR/Report/WorksheetReports";
import EmployeeType from "./HR/Employee/EmployeeType";
import AddQuestionType from "./HR/Assessment/AddQuestionType";
import AddQuestion from "./HR/Assessment/AddQuestion";
import AddCourse from "./HR/Assessment/AddCourse";
import QuestionListReports from "./HR/Assessment/QuestionListReports";
import AssessmentResult from "./HR/Assessment/AssessmentResult";
import AssessmentStatus from "./HR/Assessment/AssessmentStatus";
import StudentResponseDetails from "./HR/Assessment/StudentResponseDetails";
import StudentResultsDetails from "./HR/Assessment/StudentResultsDetails";

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
import JobsReports from "./Admin/adminComponents/reports/JobsReports";
import TrainingReports from "./Admin/adminComponents/reports/TrainingReports";
import ClientsQuery from "./Admin/adminComponents/reports/ClientsQuery";
import PostJob from "./Admin/adminComponents/jobs/PostJob";
import Activity from "./Admin/adminComponents/activity/Activity";
import AddActivity from "./Admin/adminComponents/activity/AddActivity";
import Ibc from "./Admin/adminComponents/co-partners/Ibc";
import Bbc from "./Admin/adminComponents/co-partners/Bbc";
import Consultant from "./Admin/adminComponents/consultant/Consultant";
import Contact from "./Admin/adminComponents/contact/Contact";

// Project Manager Dashboard
import PMLayout from "./project-manager/layout/Layout";
import PMDashboard from "./project-manager/pages/Dashboard";
import AddWorksheet from "./project-manager/pages/AddWorksheet";
import ManagerAttendance from "./project-manager/pages/Attendance";
import ManagerViewAttendance from "./project-manager/pages/ViewAttendance";
import EmpWorksheetReports from "./project-manager/pages/EmpWorksheetReports";

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
        <Route element={<AuthLogin />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/client_login" element={<ClientLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<UpdatePassword />}
        />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* Admin Dashboard */} {/* Protected Routes */}
        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminHome />} />
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
            <Route path="jobs-reports" element={<JobsReports />} />
            <Route path="training-reports" element={<TrainingReports />} />
            <Route path="client-query-reports" element={<ClientsQuery />} />
            <Route path="report_ibc" element={<Ibc />} />
            <Route path="report_bbc" element={<Bbc />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="activity" element={<Activity />} />
            <Route path="add-activity" element={<AddActivity />} />
            <Route path="consultant" element={<Consultant />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Route>
        {/* HR Dashboard */}
        <Route element={<AuthGuard allowedRoles={["hr"]} />}>
          <Route path="/hr" element={<HRLayout />}>
            <Route index element={<DashboardOverview />} />
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
            <Route path="employee/type" element={<EmployeeType />} />
            <Route path="add/question-type" element={<AddQuestionType />} />
            <Route path="add/question" element={<AddQuestion />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route
              path="question-list/reports"
              element={<QuestionListReports />}
            />
            <Route path="assessment-reports" element={<AssessmentResult />} />
            <Route path="assessment-status" element={<AssessmentStatus />} />
            <Route
              path="student-details/:mobile"
              element={<StudentResponseDetails />}
            />
            <Route
              path="student-results/:mobile"
              element={<StudentResultsDetails />}
            />
          </Route>
        </Route>
        {/* Project Manager Dashboard */}
        <Route element={<AuthGuard allowedRoles={["project-manager"]} />}>
          <Route path="/project-manager" element={<PMLayout />}>
            <Route path="dashboard" element={<PMDashboard />} />
            <Route path="add-worksheet" element={<AddWorksheet />} />
            <Route path="attendance" element={<ManagerAttendance />} />
            <Route
              path="report/view_worksheet"
              element={<EmpWorksheetReports />}
            />
            <Route
              path="report/view-attendance"
              element={<ManagerViewAttendance />}
            />
          </Route>
        </Route>
        {/* Account Dashboard */}
        <Route element={<AuthGuard allowedRoles={["account"]} />}>
          <Route path="/account" element={<AccountLayout />}>
            {/* <Route path="" element={<Dashboard />} /> */}
            <Route path="dashboard" element={<Dashboard />} />
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
        </Route>
        {/* Employee Dashboard  */}
        <Route element={<AuthGuard allowedRoles={["employee"]} />}>
          <Route path="/employee" element={<Layout />}>
            <Route index element={<EmpHome />} />
            <Route path="worklist" element={<WorkList />} />
            <Route path="dailysheet" element={<DailySheet />} />
            <Route path="attendance/add" element={<Attendance />} />
            <Route path="attendance/view" element={<ViewAttendance />} />
            <Route path="leaves" element={<LeaveApplication />} />
            <Route path="alerts" element={<Notification />} />
            <Route path="report-problem" element={<ReportAProblem />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
