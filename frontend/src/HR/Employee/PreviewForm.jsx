import {X} from "lucide-react";

const PreviewForm = ({ isOpen, onClose, formData }) => {
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
    <div className={`fixed ${isOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'} transition-opacity inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm`}>
      <div className={`bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] relative transition-transform overflow-hidden ${isOpen?'scale-y-100':'scale-y-90'}` }>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Employee Details Preview
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
          >
            <X size={32} />
          </button>
        </div>

        <div
          className="overflow-y-auto pr-4"
          style={{ maxHeight: "calc(90vh - 120px)" }}
        >
          {/* Personal Information Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Name", value: name },
                { label: "Father's Name", value: fathersName },
                { label: "Mother's Name", value: mothersName },
                { label: "Date of Birth", value: dob },
                { label: "Gender", value: gender },
                { label: "Marital Status", value: maritalStatus },
                { label: "Blood Group", value: bloodGroup },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Mobile", value: mobile },
                { label: "Alternate Mobile", value: altMobile },
                { label: "Email", value: email },
                {
                  label: "Correspondence Address",
                  value: correspondenceAddress,
                },
                { label: "Permanent Address", value: permanentAddress },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Document Details Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Document Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Aadhar Number", value: aadharNo },
                { label: "PAN Number", value: panNo },
                { label: "Employee ID", value: EmpId },
                { label: "Date of Joining", value: dateOfJoining },
                { label: "Declaration Date", value: decDate },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {aadhaarFrontImage && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm mb-2">
                    Aadhar Front Image
                  </p>
                  <img
                    src={URL.createObjectURL(aadhaarFrontImage)}
                    className="w-full rounded-md shadow-sm"
                    alt="Aadhar Front"
                  />
                </div>
              )}
              {aadhaarBackImage && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm mb-2">
                    Aadhar Back Image
                  </p>
                  <img
                    src={URL.createObjectURL(aadhaarBackImage)}
                    className="w-full rounded-md shadow-sm"
                    alt="Aadhar Back"
                  />
                </div>
              )}
              {panImage && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm mb-2">PAN Image</p>
                  <img
                    src={URL.createObjectURL(panImage)}
                    className="w-full rounded-md shadow-sm"
                    alt="PAN"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Family Details Table */}
          {familyDetails && familyDetails.length > 0 && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Family Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Relation
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Occupation
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {familyDetails.map((member, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{member.fname}</td>
                        <td className="px-4 py-3">{member.frelation}</td>
                        <td className="px-4 py-3">{member.foccupation}</td>
                        <td className="px-4 py-3">{member.fdob}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Educational Details Table */}
          {educationalDetails && educationalDetails.length > 0 && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Educational Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Degree
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        University
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialization
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {educationalDetails.map((edu, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{edu.edegree}</td>
                        <td className="px-4 py-3">{edu.euniversity}</td>
                        <td className="px-4 py-3">{edu.especialization}</td>
                        <td className="px-4 py-3">{`${edu.efromDate} - ${edu.etoDate}`}</td>
                        <td className="px-4 py-3">{edu.epercentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Employment Details Table */}
          {employmentDetails && employmentDetails.length > 0 && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Employment Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Designation
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual CTC
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employmentDetails.map((emp, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{emp.companyName}</td>
                        <td className="px-4 py-3">{emp.designation}</td>
                        <td className="px-4 py-3">{`${emp.empFromDate} - ${emp.empToDate}`}</td>
                        <td className="px-4 py-3">{emp.annualctc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

              {/* Emergency Contact Section */}
              <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Emergency Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Emergency Contact Name", value: emergencyContactName },
                { label: "Relation", value: emergencyContactRelation },
                { label: "Mobile", value: emergencyContactMobile },
                { label: "Address", value: emergencyContactAddress }
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bank Details Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Bank Account Name", value: bankAccName },
                { label: "Account Number", value: accountNumber },
                { label: "IFSC Code", value: ifscCode },
                { label: "Branch Name", value: branchName }
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Signature */}
          {signature && (
            <section className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
                Signature
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg flex justify-center">
                <img
                  src={URL.createObjectURL(signature)}
                  alt="Employee Signature"
                  className="max-h-40 rounded-md shadow-sm"
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
