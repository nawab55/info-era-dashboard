/* eslint-disable react/prop-types */
import { BsClock } from "react-icons/bs";

const LeaveCard = ({ request }) => {
  return (
    <div className="bg-blue-50 p-3 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-0.5">
        <div className="flex items-center font-bold">
          <BsClock className="mr-2 text-blue-800" />
          <span className="text-sm text-purple-800">
            {new Date(request.appliedDate).toLocaleDateString("en-GB")}{" "}
            {/* Format as day/month/year */}
          </span>
        </div>
        <span className="text-sm bg-yellow-100 px-3 py-1.5 rounded-2xl shadow-md text-yellow-600 font-bold">
          {request.status}
        </span>
      </div>
      <p className="text-md font-semibold text-blue-900">{request.type}</p>
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-blue-900">
          From:
          <span className="pl-2 font-normal text-purple-700">
            {new Date(request.fromDate).toLocaleDateString("en-GB")}
          </span>{" "}
        </p>
        <p className="text-sm font-semibold text-blue-900">
          To:
          <span className="pl-2 font-normal text-purple-700">
            {new Date(request.toDate).toLocaleDateString("en-GB")}
          </span>
        </p>
      </div>
      <p className="text-sm font-semibold text-blue-900">
        Reason:<span className="ml-2 font-normal text-blue-900">{request.reason}</span>
      </p>
    </div>
  );
};

export default LeaveCard;

{
  /* <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {currentRequests.map((request, index) => (
            <div key={index} className='bg-blue-50 p-4 rounded-lg shadow-md'>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <BsClock className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{new Date(request.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                </div>
                <span className="text-sm text-purple-600 font-bold">{request.status}</span>
              </div>
              <p className="text-md font-semibold text-blue-gray-700">{request.type}</p>
              <div className='flex justify-between'>
                <p className="text-sm font-semibold text-gray-600">From: <span className='pl-2 font-normal'>{request.fromDate.split('T')[0]}</span> </p>
                <p className="text-sm font-semibold text-gray-600">To: <span className='pl-2 font-normal'>{request.toDate.split('T')[0]}</span></p>
              </div>
              <p className="text-sm font-semibold text-gray-600">Reason: <span className='ml-2 font-normal'>{request.reason}</span></p>
            </div>
          ))}
        </div> */
}
