import { IoCalendar, IoCall, IoMail, IoHome, IoCard, IoSchool, IoBriefcase } from 'react-icons/io5';

 // eslint-disable-next-line react/prop-types
 const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 p-2 bg-gray-200 rounded-lg">
    {icon}
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

// eslint-disable-next-line react/prop-types
const SectionTitle = ({ icon, title }) => (
  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center space-x-2">
    {icon}
    <span>{title}</span>
  </h3>
);


// eslint-disable-next-line react/prop-types
const ProfileDetails = ({ employee }) => {
 
  // eslint-disable-next-line react/prop-types
  const {name,EmpId,dob,mobile,email,correspondenceAddress,aadharNo,panNo,educationalDetails,employmentDetails,familyDetails,aadhaarFrontImage,aadhaarBackImage,panImage} = employee;


  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="text-lg opacity-90">Employee ID: {EmpId}</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoItem icon={<IoCalendar className="text-blue-500" />} label="Date of Birth" value={new Date(dob).toLocaleDateString()} />
          <InfoItem icon={<IoCall className="text-blue-500" />} label="Mobile" value={mobile} />
          <InfoItem icon={<IoMail className="text-blue-500" />} label="Email" value={email} />
          <InfoItem icon={<IoHome className="text-blue-500" />} label="Address" value={correspondenceAddress} />
          <InfoItem icon={<IoCard className="text-blue-500" />} label="Aadhar No" value={aadharNo} />
          <InfoItem icon={<IoCard className="text-blue-500" />} label="PAN No" value={panNo} />
        </div>

        <SectionTitle icon={<IoSchool className="text-blue-500" />} title="Educational Details" />
        <div className="space-y-4">
          {/*eslint-disable-next-line react/prop-types*/}
          {educationalDetails.map((education, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-lg text-gray-800">{education.edegree}</h4>
              <p className="text-gray-600">{education.euniversity} - {education.especialization}</p>
              <p className="text-sm text-gray-500">
                {new Date(education.efromDate).getFullYear()} - {new Date(education.etoDate).getFullYear()}
              </p>
              <p className="text-sm font-medium text-blue-600">Percentage: {education.epercentage}%</p>
            </div>
          ))}
        </div>

        <SectionTitle icon={<IoBriefcase className="text-blue-500" />} title="Employment History" />
        <div className="space-y-4">
          {/*eslint-disable-next-line react/prop-types*/}
          {employmentDetails.map((employment, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-lg text-gray-800">{employment.designation}</h4>
              <p className="text-gray-600">{employment.companyName}</p>
              <p className="text-sm text-gray-500">
                {new Date(employment.empFromDate).toLocaleDateString()} - {new Date(employment.empToDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium text-green-600">Annual CTC: {employment.annualctc}</p>
            </div>
          ))}
        </div>

        <SectionTitle icon={<IoHome className="text-blue-500" />} title="Family Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/*eslint-disable-next-line react/prop-types*/}
          {familyDetails.map((family, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800">{family.fname}</h4>
              <p className="text-gray-600">{family.frelation}</p>
              <p className="text-sm text-gray-500">{family.foccupation}</p>
              <p className="text-sm text-gray-500">DOB: {new Date(family.fdob).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Identity Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Aadhar Card (Front)</h4>
              <img src={aadhaarFrontImage} alt="Aadhar Front" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Aadhar Card (Back)</h4>
              <img src={aadhaarBackImage} alt="Aadhar Back" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">PAN Card</h4>
              <img src={panImage} alt="PAN Card" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

