
import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  // Extract the last segment of the path to use as the dynamic text
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1];

  // Map the route segments to more user-friendly names if necessary
  const routeNames = {
    'add-college': ' Add College',
    'add-student': ' Add Student',
    'training-certificate' : ' Training Certificate',
    'college-reports' : ' College Reports',
    'student-reports' : ' Student Reports',
    'certificate-reports' : ' Certificate Reports',
    'print-certificate' : ' Print Certificate',
    'post-job' : ' Post Job',
    'activity' : ' Activity',
    'add-activity' : ' Add Activity',
    'report_ibc' : ' IBC',
    'report_bbc' : ' BBC',
    'profile' : ' Profile',
    'edit_password' : ' Edit Password',
    'invoice-details' : ' Invoice Details',
    'request-complain' : ' Service Complain',
    // Add more routes here as needed
  };

  const pageTitle = routeNames[currentPage] || ' Home';

  return (
    <div className=" md:ml-60 mt-16 px-8 py-8 text-gray-700 bg-inherit">
      <span className="from-neutral-600 text-3xl">Dashboard /</span>
      <span className="text-3xl font-bold">{pageTitle}</span>
    </div>
  );
};

export default Breadcrumb;
