/* eslint-disable react/prop-types */

const ProfileDetails = ({ employee }) => {
  return (
    <div className="p-4 border-2 hover:border-gray-400 shadow-lg border-blue-200 max-w-4xl bg-white mx-auto">
      <h2 className="text-3xl font-semibold leading-7 text-center text-blue-950 mb-8 border-b-2 border-black pb-2">{employee.name} Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><strong>Name:</strong> <span className="ml-2">{employee.name}</span></div>
        <div><strong>Father&apos;s Name:</strong> <span className="ml-2">{employee.fathersName}</span></div>
        <div><strong>Mother&apos;s Name:</strong> <span className="ml-2">{employee.mothersName}</span></div>
        <div><strong>Correspondence Address:</strong> <span className="ml-2">{employee.correspondenceAddress}</span></div>
        <div><strong>Permanent Address:</strong> <span className="ml-2">{employee.permanentAddress}</span></div>
        <div><strong>Mobile:</strong> <span className="ml-2">{employee.mobile}</span></div>
        <div><strong>Alternate Mobile:</strong> <span className="ml-2">{employee.altMobile}</span></div>
        <div><strong>Date of Birth:</strong> <span className="ml-2">{new Date(employee.dob).toLocaleDateString()}</span></div>
        <div><strong>Email:</strong> <span className="ml-2">{employee.email}</span></div>
        <div><strong>Gender:</strong> <span className="ml-2">{employee.gender}</span></div>
        <div><strong>Marital Status:</strong> <span className="ml-2">{employee.maritalStatus}</span></div>
        <div><strong>Aadhar No:</strong> <span className="ml-2">{employee.aadharNo}</span></div>
        <div>
          <strong>Aadhar Front:</strong> 
          <img src={employee.aadhaarFrontImage} alt="Aadhar Front" className="max-w-full h-auto mt-2"/>
        </div>
        <div>
          <strong>Aadhar Back:</strong> 
          <img src={employee.aadhaarBackImage} alt="Aadhar Back" className="max-w-full h-auto mt-2"/>
        </div>
        <div><strong>PAN No:</strong> <span className="ml-2">{employee.panNo}</span></div>
        <div>
          <strong>PAN Card:</strong> 
          <img src={employee.panImage} alt="PAN Card" className="max-w-full h-auto mt-2"/>
        </div>
        <div><strong>Blood Group:</strong> <span className="ml-2">{employee.bloodGroup}</span></div>
        <div><strong>Date of Joining:</strong> <span className="ml-2">{new Date(employee.dateOfJoining).toLocaleDateString()}</span></div>
        <div><strong>Employee ID:</strong> <span className="ml-2">{employee.EmpId}</span></div>
        <div><strong>Emergency Contact Name:</strong> <span className="ml-2">{employee.emergencyContactName}</span></div>
        <div><strong>Emergency Contact Relation:</strong> <span className="ml-2">{employee.emergencyContactRelation}</span></div>
        <div><strong>Emergency Contact Mobile:</strong> <span className="ml-2">{employee.emergencyContactMobile}</span></div>
        <div><strong>Emergency Contact Address:</strong> <span className="ml-2">{employee.emergencyContactAddress}</span></div>
        <div><strong>Bank Account Name:</strong> <span className="ml-2">{employee.bankAccName}</span></div>
        <div><strong>Account Number:</strong> <span className="ml-2">{employee.accountNumber}</span></div>
        <div><strong>IFSC Code:</strong> <span className="ml-2">{employee.ifscCode}</span></div>
        <div><strong>Branch Name:</strong> <span className="ml-2">{employee.branchName}</span></div>
        <div><strong>Declaration Date:</strong> <span className="ml-2">{new Date(employee.decDate).toLocaleDateString()}</span></div>
      </div>

      <h3 className="text-2xl font-semibold leading-6 text-blue-800 mt-6 mb-2">Family Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employee.familyDetails.map((family, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-2 mb-2">
            <div><strong>Name:</strong> <span className="ml-2">{family.fname}</span></div>
            <div><strong>Relation:</strong> <span className="ml-2">{family.frelation}</span></div>
            <div><strong>Occupation:</strong> <span className="ml-2">{family.foccupation}</span></div>
            <div><strong>Date of Birth:</strong> <span className="ml-2">{new Date(family.fdob).toLocaleDateString()}</span></div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold leading-6 text-blue-800 mt-6 mb-2">Educational Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employee.educationalDetails.map((education, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-2 mb-2">
            <div><strong>Degree:</strong> <span className="ml-2">{education.edegree}</span></div>
            <div><strong>University:</strong> <span className="ml-2">{education.euniversity}</span></div>
            <div><strong>Specialization:</strong> <span className="ml-2">{education.especialization}</span></div>
            <div><strong>From:</strong> <span className="ml-2">{new Date(education.efromDate).toLocaleDateString()}</span></div>
            <div><strong>To:</strong> <span className="ml-2">{new Date(education.etoDate).toLocaleDateString()}</span></div>
            <div><strong>Percentage:</strong> <span className="ml-2">{education.epercentage}</span></div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold leading-6 text-blue-800 mt-6 mb-2">Employment Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employee.employmentDetails.map((employment, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-2 mb-2">
            <div><strong>Company Name:</strong> <span className="ml-2">{employment.companyName}</span></div>
            <div><strong>Designation:</strong> <span className="ml-2">{employment.designation}</span></div>
            <div><strong>From:</strong> <span className="ml-2">{new Date(employment.empFromDate).toLocaleDateString()}</span></div>
            <div><strong>To:</strong> <span className="ml-2">{new Date(employment.empToDate).toLocaleDateString()}</span></div>
            <div><strong>Annual CTC:</strong> <span className="ml-2">{employment.annualctc}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
