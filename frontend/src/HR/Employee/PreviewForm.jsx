/* eslint-disable react/prop-types */

import { Image } from "react-bootstrap";
import "../../index.css"; // Ensure this path is correct

const PreviewForm = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  // Destructure formData
  const {
    name,
    fathersName,
    mothersName,
    correspondenceAddress,
    permanentAddress,
    mobile,
    altMobile,
    dob,
    email,
    gender,
    maritalStatus,
    aadharNo,
    aadhaarFrontImage,
    aadhaarBackImage,
    panImage,
    panNo,
    bloodGroup,
    dateOfJoining,
    EmpId,
    emergencyContactName,
    emergencyContactRelation,
    emergencyContactMobile,
    emergencyContactAddress,
    bankAccName,
    accountNumber,
    ifscCode,
    branchName,
    decDate,
    familyDetails,
    educationalDetails,
    employmentDetails,
    signature,
  } = formData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl w-full relative">
        <h2 className="text-xl font-bold mb-4">Preview Employee Form Data</h2>
        <div className="overflow-y-auto" style={{ maxHeight: "80vh" }}>
          <table className="table-auto w-full border-collapse">
            <tbody>
              <tr>
                <td className="border px-4 py-2">Name</td>
                <td className="border px-4 py-2">{name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Father&apos;s Name</td>
                <td className="border px-4 py-2">{fathersName}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Mother&apos;s Name</td>
                <td className="border px-4 py-2">{mothersName}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Correspondence Address</td>
                <td className="border px-4 py-2">{correspondenceAddress}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Permanent Address</td>
                <td className="border px-4 py-2">{permanentAddress}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Mobile</td>
                <td className="border px-4 py-2">{mobile}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Alternate Mobile</td>
                <td className="border px-4 py-2">{altMobile}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Date of Birth</td>
                <td className="border px-4 py-2">{dob}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Email</td>
                <td className="border px-4 py-2">{email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Gender</td>
                <td className="border px-4 py-2">{gender}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Marital Status</td>
                <td className="border px-4 py-2">{maritalStatus}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Aadhar Number</td>
                <td className="border px-4 py-2">{aadharNo}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Aadhar Image</td>
                <td className="border px-4 py-2 adhar-image">
                  {aadhaarFrontImage && (
                    <Image
                      src={URL.createObjectURL(aadhaarFrontImage)}
                      thumbnail
                      className="custom-image"
                    />
                  )}
                  {aadhaarBackImage && (
                    <Image
                      src={URL.createObjectURL(aadhaarBackImage)}
                      thumbnail
                      className="custom-image"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">PAN Number</td>
                <td className="border px-4 py-2">{panNo}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">PAN Image</td>
                <td className="border px-4 py-2">
                  {panImage && (
                    <Image
                      src={URL.createObjectURL(panImage)}
                      thumbnail
                      className="custom-image"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Blood Group</td>
                <td className="border px-4 py-2">{bloodGroup}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Date of Joining</td>
                <td className="border px-4 py-2">{dateOfJoining}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Employee ID</td>
                <td className="border px-4 py-2">{EmpId}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Emergency Contact Name</td>
                <td className="border px-4 py-2">{emergencyContactName}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Emergency Contact Relation</td>
                <td className="border px-4 py-2">{emergencyContactRelation}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Emergency Contact Mobile</td>
                <td className="border px-4 py-2">{emergencyContactMobile}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Emergency Contact Address</td>
                <td className="border px-4 py-2">{emergencyContactAddress}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Bank Account Name</td>
                <td className="border px-4 py-2">{bankAccName}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Account Number</td>
                <td className="border px-4 py-2">{accountNumber}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">IFSC Code</td>
                <td className="border px-4 py-2">{ifscCode}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Branch Name</td>
                <td className="border px-4 py-2">{branchName}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Declaration Date</td>
                <td className="border px-4 py-2">{decDate}</td>
              </tr>
            </tbody>
          </table>

          {/* Family Details */}
          <h4 className="mt-4">Family Details</h4>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Relation</th>
                <th className="border px-4 py-2">Occupation</th>
                <th className="border px-4 py-2">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {familyDetails.map((familyMember, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{familyMember.fname}</td>
                  <td className="border px-4 py-2">{familyMember.frelation}</td>
                  <td className="border px-4 py-2">{familyMember.foccupation}</td>
                  <td className="border px-4 py-2">{familyMember.fdob}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Educational Details */}
          <h4 className="mt-4">Educational Details</h4>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Degree</th>
                <th className="border px-4 py-2">University</th>
                <th className="border px-4 py-2">Specialization</th>
                <th className="border px-4 py-2">From Date</th>
                <th className="border px-4 py-2">To Date</th>
                <th className="border px-4 py-2">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {educationalDetails.map((eduDetail, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{eduDetail.edegree}</td>
                  <td className="border px-4 py-2">{eduDetail.euniversity}</td>
                  <td className="border px-4 py-2">{eduDetail.especialization}</td>
                  <td className="border px-4 py-2">{eduDetail.efromDate}</td>
                  <td className="border px-4 py-2">{eduDetail.etoDate}</td>
                  <td className="border px-4 py-2">{eduDetail.epercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Employment Details */}
          <h4 className="mt-4">Employment Details</h4>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Company Name</th>
                <th className="border px-4 py-2">Designation</th>
                <th className="border px-4 py-2">From Date</th>
                <th className="border px-4 py-2">To Date</th>
                <th className="border px-4 py-2">Annual CTC</th>
              </tr>
            </thead>
            <tbody>
              {employmentDetails.map((empDetail, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{empDetail.companyName}</td>
                  <td className="border px-4 py-2">{empDetail.designation}</td>
                  <td className="border px-4 py-2">{empDetail.empFromDate}</td>
                  <td className="border px-4 py-2">{empDetail.empToDate}</td>
                  <td className="border px-4 py-2">{empDetail.annualctc}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signature Image */}
          <h4 className="mt-4">Signature</h4>
          {signature && (
            <Image
              src={URL.createObjectURL(signature)}
              thumbnail
              className="custom-image"
            />
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-800 text-3xl w-10 h-10 flex items-center justify-center"
        >
          &times;
        </button>

      </div>
    </div>
  );
};

export default PreviewForm;
