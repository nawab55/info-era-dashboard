
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";

const PrintableEmployeeDetails = React.forwardRef(({ employee }, ref) => {
  return (
    <div ref={ref} className="p-4 space-y-6 bg-white print:p-2">
      {/* Header Section */}
      <div className="mb-6 text-center print:mb-4">
        <h1 className="mb-2 text-2xl font-bold text-blue-800 print:text-xl">
          {employee.name}
        </h1>
        {/* <p className="text-sm text-gray-500">Employee ID: {employee.EmpId}</p> */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-3">
        {/* Personal Details */}
        <div className="space-y-2">
          <SectionTitle title="Personal Details" />
          <DetailItem label="Name" value={employee.name} />
          <DetailItem label="Date of Birth" value={new Date(employee.dob).toLocaleDateString()} />
          <DetailItem label="Gender" value={employee.gender} />
          <DetailItem label="Marital Status" value={employee.maritalStatus} />
          <DetailItem label="Blood Group" value={employee.bloodGroup} />
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <SectionTitle title="Contact Information" />
          <DetailItem label="Mobile" value={employee.mobile} />
          <DetailItem label="Alternate Mobile" value={employee.altMobile} />
          <DetailItem label="Email" value={employee.email} />
          <DetailItem label="Address" value={employee.correspondenceAddress} />
        </div>

        {/* Document Section */}
        <div className="space-y-2 col-span-full print:break-inside-avoid">
          <SectionTitle title="Documents" />
          <div className="grid grid-cols-3 gap-2 print:grid-cols-3">
            <ImageItem label="Aadhar Front" src={employee.aadhaarFrontImage} />
            <ImageItem label="Aadhar Back" src={employee.aadhaarBackImage} />
            <ImageItem label="PAN Card" src={employee.panImage} />
          </div>
        </div>

        {/* Employment Details */}
        <div className="space-y-2">
          <SectionTitle title="Employment Details" />
          <DetailItem label="Date of Joining" value={new Date(employee.dateOfJoining).toLocaleDateString()} />
          <DetailItem label="Designation" value={employee.designation} />
          <DetailItem label="Employee ID" value={employee.EmpId} />
        </div>

        {/* Bank Details */}
        <div className="space-y-2">
          <SectionTitle title="Account Details" />
          <DetailItem label="Account Holder" value={employee.bankAccName} />
          <DetailItem label="Account No" value={employee.accountNumber} />
          <DetailItem label="IFSC Code" value={employee.ifscCode} />
          <DetailItem label="Branch" value={employee.branchName} />
        </div>
      </div>

      {/* Additional Sections */}
      <div className="print:break-before-auto">
        <AdditionalSections employee={employee} />
      </div>
    </div>
  );
});

// Updated Section Components
const SectionTitle = ({ title }) => (
  <h3 className="pb-1 mb-2 text-lg font-semibold text-blue-700 border-b border-blue-200 print:text-base">
    {title}
  </h3>
);

const DetailItem = ({ label, value }) => (
  <div className="flex items-start justify-between text-sm">
    <span className="font-medium text-gray-700 print:font-normal">{label}:</span>
    <span className="text-gray-600 text-right max-w-[60%] break-words">
      {value || "N/A"}
    </span>
  </div>
);

const ImageItem = ({ label, src }) => (
  <div className="flex flex-col items-center">
    <p className="mb-1 text-xs font-medium text-gray-700">{label}:</p>
    {src && (
      <img
        src={src}
        alt={label}
        className="object-contain w-full h-24 border rounded print:h-20"
        crossOrigin="anonymous"
      />
    )}
  </div>
);

const AdditionalSections = ({ employee }) => (
  <>
    {/* Family Details */}
    <div className="mt-2 print:mt-4">
      <SectionTitle title="Family Details" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 print:grid-cols-3">
        {employee.familyDetails.map((family, index) => (
          <div key={index} className="p-2 text-sm border rounded">
            <DetailItem label="Name" value={family.fname} />
            <DetailItem label="Relation" value={family.frelation} />
            <DetailItem label="Occupation" value={family.foccupation} />
            <DetailItem label="DOB" value={new Date(family.fdob).toLocaleDateString()} />
          </div>
        ))}
      </div>
    </div>

    {/* Educational Details */}
    <div className="mt-2 print:mt-4">
      <SectionTitle title="Education" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 print:grid-cols-3">
        {employee.educationalDetails.map((education, index) => (
          <div key={index} className="p-2 text-sm border rounded">
            <DetailItem label="Degree" value={education.edegree} />
            <DetailItem label="University" value={education.euniversity} />
            <DetailItem label="Specialization" value={education.especialization} />
            <DetailItem label="Percentage" value={education.epercentage} />
          </div>
        ))}
      </div>
    </div>

    {/* Employment History */}
    <div className="mt-12 print:mt-12">
      <SectionTitle title="Employment History" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 print:grid-cols-2">
        {employee.employmentDetails.map((employment, index) => (
          <div key={index} className="p-2 text-sm border rounded">
            <DetailItem label="Company" value={employment.companyName} />
            <DetailItem label="Designation" value={employment.designation} />
            <DetailItem 
              label="Duration" 
              value={`${new Date(employment.empFromDate).toLocaleDateString()} - ${new Date(employment.empToDate).toLocaleDateString()}`} 
            />
            <DetailItem label="CTC" value={employment.annualctc} />
          </div>
        ))}
      </div>
    </div>
  </>
);

export default PrintableEmployeeDetails;









/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// import React from "react";

// const PrintableEmployeeDetails = React.forwardRef(({ employee }, ref) => {
//   return (
//     <div ref={ref} className="p-4 space-y-6 bg-white">
//       {/* Header Section */}
//       <div className="mb-8 text-center">
//         <h1 className="mb-2 text-3xl font-bold text-blue-800">
//           {employee.name}
//         </h1>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-2 gap-6 ">
//         {/* Personal Details */}
//         <div className="space-y-4">
//           <SectionTitle title="Personal Details" />
//           <DetailItem label="Name" value={employee.name} />
//           <DetailItem
//             label="Date of Birth"
//             value={new Date(employee.dob).toLocaleDateString()}
//           />
//           <DetailItem label="Gender" value={employee.gender} />
//           <DetailItem label="Marital Status" value={employee.maritalStatus} />
//           <DetailItem label="Blood Group" value={employee.bloodGroup} />
//         </div>

//         {/* Contact Information */}
//         <div className="space-y-4">
//           <SectionTitle title="Contact Information" />
//           <DetailItem label="Mobile" value={employee.mobile} />
//           <DetailItem label="Alternate Mobile" value={employee.altMobile} />
//           <DetailItem label="Email" value={employee.email} />
//           <DetailItem label="Address" value={employee.correspondenceAddress} />
//         </div>

//         {/* Document Section */}
//         <div className="space-y-4">
//           <SectionTitle title="Documents" />
//           <div className="grid grid-cols-3 gap-4 ">
//             <ImageItem label="Aadhar Front" src={employee.aadhaarFrontImage} />
//             <ImageItem label="Aadhar Back" src={employee.aadhaarBackImage} />
//             <ImageItem label="PAN Card" src={employee.panImage} />
//           </div>
//         </div>

//         {/* Employment Details */}
//         <div className="space-y-4">
//           <SectionTitle title="Employment Details" />
//           <DetailItem
//             label="Date of Joining"
//             value={new Date(employee.dateOfJoining).toLocaleDateString()}
//           />
//           <DetailItem label="Designation" value={employee.designation} />
//           <DetailItem label="Employee ID" value={employee.EmpId} />
//         </div>
//         {/* Bank Details */}
//         <div className="space-y-4">
//           <SectionTitle title="Account Details" />
//           <DetailItem label="Account Holder Name" value={employee.bankAccName} />
//           <DetailItem label="Account No" value={employee.accountNumber} />
//           <DetailItem label="IFSC Code" value={employee.ifscCode} />
//           <DetailItem label="Branch Name" value={employee.branchName} />
//         </div>
//       </div>

//       {/* Additional Sections (Family, Education, Employment) */}
//       <AdditionalSections employee={employee} />
//     </div>
//   );
// });

// const SectionTitle = ({ title }) => (
//   <h3 className="pb-2 mb-3 text-xl font-semibold text-blue-700 border-b-2 border-blue-200">
//     {title}
//   </h3>
// );

// const DetailItem = ({ label, value }) => (
//   <div className="flex items-start justify-between">
//     <span className="font-medium text-gray-700">{label}:</span>
//     <span className="text-gray-600 text-right max-w-[60%]">
//       {value || "N/A"}
//     </span>
//   </div>
// );

// const ImageItem = ({ label, src }) => (
//   <div className="">
//     <p className="mb-1 font-medium text-gray-700">{label}:</p>
//     {src && (
//       <img
//         src={src}
//         alt={label}
//         className="object-contain h-24 p-1 border rounded-lg w-28"
//       />
//     )}
//   </div>
// );

// const AdditionalSections = ({ employee }) => (
//   <>
//     {/* Family Details */}
//     <div className="mt-8">
//       <SectionTitle title="Family Details" />
//       <div className="grid grid-cols-3 gap-4 ">
//         {employee.familyDetails.map((family, index) => (
//           <div key={index} className="p-4 rounded-lg bg-gray-50">
//             <DetailItem label="Name" value={family.fname} />
//             <DetailItem label="Relation" value={family.frelation} />
//             <DetailItem label="Occupation" value={family.foccupation} />
//             <DetailItem
//               label="Date of Birth"
//               value={new Date(family.fdob).toLocaleDateString()}
//             />
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Educational Details */}
//     <div className="mt-8">
//       <SectionTitle title="Educational Details" />
//       <div className="grid grid-cols-2 gap-4 ">
//         {employee.educationalDetails.map((education, index) => (
//           <div key={index} className="p-4 rounded-lg bg-gray-50">
//             <DetailItem label="Degree" value={education.edegree} />
//             <DetailItem label="University" value={education.euniversity} />
//             <DetailItem
//               label="Specialization"
//               value={education.especialization}
//             />
//             <DetailItem label="Percentage" value={education.epercentage} />
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Employment History */}
//     <div className="mt-8">
//       <SectionTitle title="Employment History" />
//       <div className="grid grid-cols-2 gap-4 ">
//         {employee.employmentDetails.map((employment, index) => (
//           <div key={index} className="p-4 rounded-lg bg-gray-50">
//             <DetailItem label="Company" value={employment.companyName} />
//             <DetailItem label="Designation" value={employment.designation} />
//             <DetailItem
//               label="Duration"
//               value={`${new Date(
//                 employment.empFromDate
//               ).toLocaleDateString()} - ${new Date(
//                 employment.empToDate
//               ).toLocaleDateString()}`}
//             />
//             <DetailItem label="Annual CTC" value={employment.annualctc} />
//           </div>
//         ))}
//       </div>
//     </div>
//   </>
// );

// export default PrintableEmployeeDetails;
