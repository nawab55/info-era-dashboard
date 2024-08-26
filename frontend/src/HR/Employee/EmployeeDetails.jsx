/* eslint-disable react/prop-types */

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeDetails = ({ employee }) => {

  const downloadPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Adding title
    doc.setFontSize(18);
    doc.text('Employee Details', 14, 10, );  // centeres title

    // Configuring autoTable settings to minimize space
    const options = {
      startY: 15,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: 'center'   // Centering the content
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontSize: 10,
        halign: 'center'  // Centering the header
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 40 },
      },
    };

    // Employee Details Data
    const employeeData = [
      ['Name', employee.name],
      ['Father\'s Name', employee.fathersName],
      ['Mother\'s Name', employee.mothersName],
      ['Correspondence Address', employee.correspondenceAddress],
      ['Permanent Address', employee.permanentAddress],
      ['Mobile', employee.mobile],
      ['Alternate Mobile', employee.altMobile],
      ['Date of Birth', new Date(employee.dob).toLocaleDateString()],
      ['Email', employee.email],
      ['Gender', employee.gender],
      ['Marital Status', employee.maritalStatus],
      ['Aadhar No', employee.aadharNo],
      ['PAN No', employee.panNo],
      ['Blood Group', employee.bloodGroup],
      ['Date of Joining', new Date(employee.dateOfJoining).toLocaleDateString()],
      ['Employee ID', employee.EmpId],
      ['Emergency Contact Name', employee.emergencyContactName],
      ['Emergency Contact Relation', employee.emergencyContactRelation],
      ['Emergency Contact Mobile', employee.emergencyContactMobile],
      ['Emergency Contact Address', employee.emergencyContactAddress],
      ['Bank Account Name', employee.bankAccName],
      ['Account Number', employee.accountNumber],
      ['IFSC Code', employee.ifscCode],
      ['Branch Name', employee.branchName],
      ['Declaration Date', new Date(employee.decDate).toLocaleDateString()],
    ];

    doc.autoTable({
      ...options,
      head: [['Field', 'Value']],
      body: employeeData,
    });

    // Adding Family Details Table
    doc.text('Family Details', 14, doc.previousAutoTable.finalY + 10);
    const familyData = employee.familyDetails.map(family => [
      family.fname, family.frelation, family.foccupation, new Date(family.fdob).toLocaleDateString()
    ]);
    doc.autoTable({
      ...options,
      startY: doc.previousAutoTable.finalY + 15,
      head: [['Name', 'Relation', 'Occupation', 'Date of Birth']],
      body: familyData,
    });

    // Adding Educational Details Table
    doc.text('Educational Details', 14, doc.previousAutoTable.finalY + 10);
    const educationalData = employee.educationalDetails.map(education => [
      education.edegree, education.euniversity, education.especialization, 
      new Date(education.efromDate).toLocaleDateString(), 
      new Date(education.etoDate).toLocaleDateString(), 
      education.epercentage
    ]);
    doc.autoTable({
      ...options,
      startY: doc.previousAutoTable.finalY + 15,
      head: [['Degree', 'University', 'Specialization', 'From', 'To', 'Percentage']],
      body: educationalData,
    });

    // Adding Employment Details Table
    doc.text('Employment Details', 14, doc.previousAutoTable.finalY + 10);
    const employmentData = employee.employmentDetails.map(employment => [
      employment.companyName, employment.designation, 
      new Date(employment.empFromDate).toLocaleDateString(), 
      new Date(employment.empToDate).toLocaleDateString(), 
      employment.annualctc
    ]);
    doc.autoTable({
      ...options,
      startY: doc.previousAutoTable.finalY + 15,
      head: [['Company Name', 'Designation', 'From', 'To', 'Annual CTC']],
      body: employmentData,
    });

    // Save the PDF
    doc.save(`${employee.name}_details.pdf`);
  };

  return (
    <div className="p-4 mt-8 border-2 hover:border-gray-400 shadow-lg border-blue-200 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold leading-7 text-blue-950 mb-8 border-b-2 pb-2">Employee Details</h2>
      
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
        <div className="">
          <strong>Aadhar Front:</strong> <img src={employee.aadhaarFrontImage} alt="Aadhar Front" className="max-w-full h-auto mt-2"/>
        </div>
        <div className="">
          <strong>Aadhar Back:</strong> <img src={employee.aadhaarBackImage} alt="Aadhar Back" className="max-w-full h-auto mt-2"/>
        </div>
        <div><strong>PAN No:</strong> <span className="ml-2">{employee.panNo}</span></div>
        <div className="">
          <strong>PAN Card:</strong> <img src={employee.panImage} alt="PAN Card" className="max-w-full h-auto mt-2"/>
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

      <button 
        onClick={downloadPDF} 
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download PDF
      </button>
    </div>
  );
};

export default EmployeeDetails;
