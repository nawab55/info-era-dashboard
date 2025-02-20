/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import PreviewForm from "./PreviewForm";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EmpRegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    fathersName: "",
    mothersName: "",
    correspondenceAddress: "",
    permanentAddress: "",
    mobile: "",
    altMobile: "",
    dob: "",
    email: "",
    password: "",
    empType: "",
    designation: "",
    gender: "",
    maritalStatus: "",
    aadharNo: "",
    aadhaarFrontImage: null,
    aadhaarBackImage: null,
    panImage: null,
    panNo: "",
    bloodGroup: "",
    dateOfJoining: "",
    EmpId: "",
    role: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactMobile: "",
    emergencyContactAddress: "",
    bankAccName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    decDate: "",
    familyDetails: [
      { fname: "", frelation: "", foccupation: "", fdob: "" },
      { fname: "", frelation: "", foccupation: "", fdob: "" },
      { fname: "", frelation: "", foccupation: "", fdob: "" },
    ],
    educationalDetails: [
      {
        edegree: "",
        euniversity: "",
        especialization: "",
        efromDate: "",
        etoDate: "",
        epercentage: "",
      },
      {
        edegree: "",
        euniversity: "",
        especialization: "",
        efromDate: "",
        etoDate: "",
        epercentage: "",
      },
      {
        edegree: "",
        euniversity: "",
        especialization: "",
        efromDate: "",
        etoDate: "",
        epercentage: "",
      },
    ],
    employmentDetails: [
      {
        companyName: "",
        designation: "",
        empFromDate: "",
        empToDate: "",
        annualctc: "",
      },
      {
        companyName: "",
        designation: "",
        empFromDate: "",
        empToDate: "",
        annualctc: "",
      },
    ],
    signature: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const totalPages = 6;

  const openPreview = () => setShowPreview(true);
  const closePreview = () => setShowPreview(false);

  const prevPage = () => {
    setErrors({});
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (validatePage()) {
      setErrors({});
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const validatePage = () => {
    const newErrors = {};
    // Add validation for each field
    if (currentPage === 1) {
      if (!formData.name) newErrors.name = "Required";
      if (!formData.fathersName) newErrors.fathersName = "Required";
      if (!formData.mothersName) newErrors.mothersName = "Required";
      if (!formData.correspondenceAddress)
        newErrors.correspondenceAddress = "Rrequired";
      if (!formData.permanentAddress) newErrors.permanentAddress = "Required";
      if (!formData.mobile) newErrors.mobile = "Required";
      if (!formData.dob) newErrors.dob = "Required";
      if (!formData.email) newErrors.email = "Required";
      if (!formData.password) newErrors.password = "Required";
      if (!formData.empType) newErrors.empType = "Required";
      if (!formData.gender) newErrors.gender = "Required";
      if (!formData.aadharNo) newErrors.aadharNo = "Required";
      if (!formData.aadhaarFrontImage) newErrors.aadhaarFrontImage = "Required";
      if (!formData.aadhaarBackImage) newErrors.aadhaarBackImage = "Required";
      if (!formData.panImage) newErrors.panImage = "Required";
      if (!formData.panNo) newErrors.panNo = "Required";
      if (!formData.dateOfJoining) newErrors.dateOfJoining = "Required";
      if (!formData.emergencyContactName)
        newErrors.emergencyContactName = "Required";
      if (!formData.emergencyContactRelation)
        newErrors.emergencyContactRelation = "Required";
      if (!formData.emergencyContactMobile)
        newErrors.emergencyContactMobile = "Required";
      if (!formData.emergencyContactAddress)
        newErrors.emergencyContactAddress = "Required";
    } else if (currentPage === 2) {
      if (formData.familyDetails && formData.familyDetails.length > 0) {
        const firstFamilyMember = formData.familyDetails[0];
    
        if (!firstFamilyMember.fname) {
          newErrors[`familyDetails[0].fname`] = "Required";
        }
    
        if (!firstFamilyMember.frelation || !firstFamilyMember.frelation[0]) {
          newErrors[`familyDetails[0].frelation`] = "Required";
        }
      }
    } 
    else if (currentPage === 3) {
      if (formData.educationalDetails && formData.educationalDetails.length > 0) {
        const firstEducationalDetail = formData.educationalDetails[0];
    
        if (!firstEducationalDetail.edegree[0]) {
          newErrors[`educationalDetails[0][edegree]`] = "Required";
        }
        if (!firstEducationalDetail.euniversity[0]) {
          newErrors[`educationalDetails[0][euniversity]`] = "Required";
        }
        if (!firstEducationalDetail.especialization[0]) {
          newErrors[`educationalDetails[0][especialization]`] = "Required";
        }
        if (!firstEducationalDetail.efromDate[0]) {
          newErrors[`educationalDetails[0][efromDate]`] = "Required";
        }
        if (!firstEducationalDetail.etoDate[0]) {
          newErrors[`educationalDetails[0][etoDate]`] = "Required";
        }
        // if (!firstEducationalDetail.epercentage[0]) {
        //   newErrors[`educationalDetails[0][epercentage]`] = "Required";
        // }
      }
    } else if (currentPage === 4) {
      if (formData.employmentDetails && formData.employmentDetails.length > 0) {
        const firstEmploymentDetail = formData.employmentDetails[0];
    
        if (!firstEmploymentDetail.companyName[0]) {
          newErrors[`employmentDetails[0][companyName]`] = "Required";
        }
        if (!firstEmploymentDetail.designation[0]) {
          newErrors[`employmentDetails[0][designation]`] = "Required";
        }
        if (!firstEmploymentDetail.empFromDate[0]) {
          newErrors[`employmentDetails[0][empFromDate]`] = "Required";
        }
        if (!firstEmploymentDetail.empToDate[0]) {
          newErrors[`employmentDetails[0][empToDate]`] = "Required";
        }
        // if (!firstEmploymentDetail.annualctc[0]) {
        //   newErrors[`employmentDetails[0][annualctc]`] = "Required";
        // }
      }
    }
    
    // else if (currentPage === 3) {
    //   formData.educationalDetails.forEach((educationalDetail, index) => {
    //     if (!educationalDetail.edegree[0])
    //       newErrors[`educationalDetails[${index}][edegree]`] = "Required";
    //     if (!educationalDetail.euniversity[0])
    //       newErrors[`educationalDetails[${index}][euniversity]`] = "Required";
    //     if (!educationalDetail.especialization[0])
    //       newErrors[`educationalDetails[${index}][especialization]`] =
    //         "Required";
    //     if (!educationalDetail.efromDate[0])
    //       newErrors[`educationalDetails[${index}][efromDate]`] = "Required";
    //     if (!educationalDetail.etoDate[0])
    //       newErrors[`educationalDetails[${index}][etoDate]`] = "Required";
    //     if (!educationalDetail.epercentage[0])
    //       newErrors[`educationalDetails[${index}][epercentage]`] = "Required";
    //   });
    // } else if (currentPage === 4) {
    //   formData.employmentDetails.forEach((employmentDetail, index) => {
    //     if (!employmentDetail.companyName[0])
    //       newErrors[`employmentDetails[${index}][companyName]`] = "Required";
    //     if (!employmentDetail.designation[0])
    //       newErrors[`employmentDetails[${index}][designation]`] = "Required";
    //     if (!employmentDetail.empFromDate[0])
    //       newErrors[`employmentDetails[${index}][empFromDate]`] = "Required";
    //     if (!employmentDetail.empToDate[0])
    //       newErrors[`employmentDetails[${index}][empToDate]`] = "Required";
    //     if (!employmentDetail.annualctc[0])
    //       newErrors[`employmentDetails[${index}][annualctc]`] = "Required";
    //   });
    // } 
    else if (currentPage === 5) {
      if (!formData.bankAccName) newErrors.bankAccName = "Required";
      if (!formData.accountNumber) newErrors.accountNumber = "Required";
      if (!formData.ifscCode) newErrors.ifscCode = "Required";
    } else if (currentPage === 6) {
      if (!formData.decDate) newErrors.decDate = "Required";
      if (!formData.signature) newErrors.signature = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // console.log(files)
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, ":", value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors(prev=>({...prev,[name]: ""}))
  };

  const handleFamilyDetailChange = (index, field, value) => {
    const newFamilyDetails = [...formData.familyDetails];
    newFamilyDetails[index][field] = value;
    // newFamilyDetails[index] = {
    //   ...newFamilyDetails[index],
    //   [field]: value,
    // };
    setFormData((prevState) => ({
      ...prevState,
      familyDetails: newFamilyDetails,
    }));
  };

  const handleEducationalChange = (index, field, value) => {
    const newEducationalDetails = [...formData.educationalDetails];
    newEducationalDetails[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      educationalDetails: newEducationalDetails,
    }));
  };

  const handleEmploymentChange = (index, field, value) => {
    const newEmploymentDetails = [...formData.employmentDetails];
    newEmploymentDetails[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      employmentDetails: newEmploymentDetails,
    }));
  };

  useEffect(() => {
    if (location.state?.employee) {
      const employee = location.state.employee;
      setIsEditMode(true);
      setEmployeeId(employee._id);

      // Format dates
      const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
      };

      // Prepare form data from employee data
      const preparedData = {
        ...employee,
        dob: formatDate(employee.dob),
        dateOfJoining: formatDate(employee.dateOfJoining),
        decDate: formatDate(employee.decDate),
        familyDetails: employee.familyDetails.map((detail) => ({
          ...detail,
          fdob: formatDate(detail.fdob)
        })),
        educationalDetails: employee.educationalDetails.map((detail) => ({
          ...detail,
          efromDate: formatDate(detail.efromDate),
          etoDate: formatDate(detail.etoDate)
        })),
        employmentDetails: employee.employmentDetails.map((detail) => ({
          ...detail,
          empFromDate: formatDate(detail.empFromDate),
          empToDate: formatDate(detail.empToDate)
        }))
      };

      setFormData(preparedData);
    }
  }, [location.state]);

  useEffect(() => {
    fetchEmployeeTypes();
  }, []);

  const fetchEmployeeTypes = async () => {
    try {
      const response = await api.get("/api/type/employee-types");
      setEmployeeTypes(response.data);
    } catch (error) {
      console.error("Error fetching employee types:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDeclarationChecked) {
      toast.error("Please accept the declaration to submit the form.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formDataToSend.append(`${key}[${index}][${subKey}]`, subValue);
          });
        });
      } else {
        formDataToSend.append(key, value);
      }
    });
      try {
        let response;
        if (isEditMode) {
          response = await api.put(
            `/api/user/employee/${employeeId}`,
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          );
          toast.success("Employee details updated successfully!");
        } else {
          response = await api.post("/api/user/register", formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          toast.success("Employee registered successfully!");
        }

        if (response.status === 200 || response.status === 201) {
          navigate("/hr/report/view_emp-registration"); // Navigate back to the reports page
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        toast.error(
          `Failed to ${isEditMode ? "update" : "register"} employee: ${
            error.message
          }`
        );
      }

    // try {
    //   const response = await api.post("/api/user/register", formDataToSend, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   if (response.status === 201) {
    //     toast.success("Form submitted successfully!");
    //   } else {
    //     toast.error("Failed to submit the form.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting the form:", error);
    //   toast.error("Failed to submit the form.", error.message);
    // }
  };

  return (
    <>
      <div className="flex-1 p-4">
        <div className="flex justify-center">
          <h1 className="px-4 py-2 text-xl font-bold text-center border-b-4 border-blue-600 ">
            {isEditMode ? "Edit Employee" : "Employee Registration Form"}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-4"
        >
          <div className="">
            {currentPage === 1 && (
              <div className="p-2 border lg:p-6">
                <div className="flex items-center h-9 ">
                  <h2 className="ml-2 text-base font-semibold leading-7 md:text-2xl text-blue-950">
                    Personal Details
                  </h2>
                </div>

                <div className="mt-4">
                  <div className="flex min-w-full gap-2">
                    <CustomInput
                      label={"Name"}
                      placeholder="Enter Name..."
                      name={"name"}
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <CustomInput
                      label={"Father's Name"}
                      placeholder="Enter Father's Name..."
                      name={"fathersName"}
                      value={formData.fathersName}
                      onChange={handleChange}
                      error={errors.fathersName}
                    />
                    <CustomInput
                      label={"Mother's Name"}
                      placeholder="Enter Mother's Name..."
                      name={"mothersName"}
                      value={formData.mothersName}
                      onChange={handleChange}
                      error={errors.mothersName}
                    />
                  </div>
                  <div className="flex min-w-full gap-2">
                    <CustomTextArea
                      name={"correspondenceAddress"}
                      error={errors.correspondenceAddress}
                      value={formData.correspondenceAddress}
                      label={"Correspondence Address"}
                      onChange={handleChange}
                    />
                    <CustomTextArea
                      name={"permanentAddress"}
                      error={errors.permanentAddress}
                      value={formData.permanentAddress}
                      label={"Permanent Address"}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2">
                    <CustomInput
                      label={"Mobile No."}
                      placeholder="Enter Mobile Number..."
                      name={"mobile"}
                      type="number"
                      value={formData.mobile}
                      onChange={handleChange}
                      error={errors.mobile}
                    />
                    <CustomInput
                      label={"Alternative Mobile No."}
                      placeholder="Enter Alternate Number..."
                      name={"altMobile"}
                      type="number"
                      value={formData.altMobile}
                      onChange={handleChange}
                    />

                    <CustomInput
                      label={"Date Of Birth."}
                      name={"dob"}
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      error={errors.dob}
                    />
                  </div>
                  <div className="flex gap-2">
                    <CustomInput
                      label={"Email Id"}
                      placeholder="Enter Email"
                      name={"email"}
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    {!isEditMode && (
                      <CustomInput
                        label={"Password"}
                        placeholder="Enter Password"
                        name={"password"}
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                      />
                    )}
                    <CustomSelect
                      label={"Employee Type"}
                      options={employeeTypes.map(
                        (employeeType) => employeeType.type
                      )}
                      selectedOption={formData.empType}
                      onChange={(option) =>
                        setFormData((prev) => ({ ...prev, empType: option }))
                      }
                      error={errors.empType}
                    />
                  </div>

                  <div className="flex gap-2">
                    <CustomSelect
                      label={"Gender"}
                      options={["Male", "Female"]}
                      selectedOption={formData.gender}
                      onChange={(option) =>
                        setFormData((prev) => ({ ...prev, gender: option }))
                      }
                      error={errors.gender}
                    />

                    <CustomSelect
                      label={"Marital Status"}
                      options={["Single", "Married"]}
                      selectedOption={formData.maritalStatus}
                      onChange={(option) =>
                        setFormData((prev) => ({
                          ...prev,
                          maritalStatus: option
                        }))
                      }
                      error={errors.maritalStatus}
                    />
                    <CustomInput
                      label={"Aadhar No"}
                      name={"aadharNo"}
                      type="number"
                      placeholder="Enter Adhar No"
                      value={formData.aadharNo}
                      onChange={handleChange}
                      error={errors.aadharNo}
                    />
                  </div>

                  <div className="flex gap-2">
                    <CustomInput
                      label={"Aadhaar Front Image"}
                      name={"aadhaarFrontImage"}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      error={errors.aadhaarFrontImage}
                    />
                    <CustomInput
                      label={"Aadhaar Back Image"}
                      name={"aadhaarBackImage"}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      error={errors.aadhaarBackImage}
                    />

                    <CustomInput
                      label={"Designation"}
                      name={"designation"}
                      type="text"
                      placeholder="Enter Designation.."
                      value={formData.designation}
                      onChange={handleChange}
                      error={errors.designation}
                    />
                  </div>

                  <div className="flex gap-2">
                    <CustomInput
                      label={"PAN No"}
                      name={"panNo"}
                      type="text"
                      placeholder="Enter Pan Number.."
                      value={formData.panNo}
                      onChange={handleChange}
                      error={errors.panNo}
                    />

                    <CustomInput
                      label={"PAN Card Imag"}
                      name={"panImage"}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      error={errors.panImage}
                    />

                    <CustomInput
                      label={"Blood Group"}
                      name={"bloodGroup"}
                      type="text"
                      placeholder="Enter Pan Number.."
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      error={errors.bloodGroup}
                    />
                  </div>

                  <div className="flex gap-2">
                    <CustomInput
                      label={"Date of Joining"}
                      name={"dateOfJoining"}
                      type="date"
                      placeholder="Enter Date of Joining.."
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      error={errors.dateOfJoining}
                    />

                    <CustomInput
                      label={"Emp id"}
                      name={"EmpId"}
                      type="text"
                      placeholder="Enter EmpId.."
                      value={formData.EmpId}
                      onChange={handleChange}
                      error={errors.EmpId}
                    />

                    <CustomSelect
                      label={"Role"}
                      options={[
                        "Employee",
                        "HR",
                        "Admin",
                        "Account",
                        "Project-Manager"
                      ]}
                      selectedOption={formData.role}
                      onChange={(option) =>
                        setFormData((prev) => ({
                          ...prev,
                          role: option
                        }))
                      }
                      error={errors.role}
                    />
                  </div>
                </div>

                <div className="flex items-center h-9 ">
                  <h2 className="ml-2 text-base font-semibold leading-7 md:text-2xl text-blue-950">
                    Emergency Contact Details
                  </h2>
                </div>

                <div className="flex gap-2">
                  <CustomInput
                    label={"Name"}
                    name={"emergencyContactName"}
                    type="text"
                    placeholder="Enter Name.."
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    error={errors.emergencyContactName}
                  />
                  <CustomInput
                    label={"Relation"}
                    name={"emergencyContactRelation"}
                    type="text"
                    placeholder="Enter Relation.."
                    value={formData.emergencyContactRelation}
                    onChange={handleChange}
                    error={errors.emergencyContactRelation}
                  />
                  <CustomInput
                    label={"Mobile Number"}
                    name={"emergencyContactMobile"}
                    type="text"
                    placeholder="Enter Number.."
                    value={formData.emergencyContactMobile}
                    onChange={handleChange}
                    error={errors.emergencyContactMobile}
                  />
                </div>

                <CustomTextArea
                  label={"Address"}
                  name={"emergencyContactAddress"}
                  value={formData.emergencyContactAddress}
                  error={errors.emergencyContactAddress}
                  onChange={handleChange}
                />
              </div>
            )}
            {/* Family Details */}
            {currentPage === 2 && (
              <div className="p-4 mt-8 border">
                <div className="flex items-center h-9 ">
                  <h2 className="ml-2 text-base font-semibold leading-7 md:text-2xl text-blue-950">
                    Family Details
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full mt-4 border border-collapse border-gray-200 rounded-lg shadow-md">
                    <thead className="text-gray-800 bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                          S.No
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                          Name <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                          Relation <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                          Occupation
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                          Date of Birth
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.familyDetails.map((familyMember, index) => (
                        <tr
                          key={index}
                          className="bg-white border hover:bg-gray-50 odd:bg-gray-50"
                        >
                          <td className="px-4 py-3 text-center border-b">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 border-b">
                            <CustomInput
                              label=""
                              name={`familyDetails[${index}].fname`}
                              value={familyMember.fname}
                              placeholder="Enter Name"
                              error={errors[`familyDetails[${index}].fname`]}
                              onChange={(e) =>
                                handleFamilyDetailChange(
                                  index,
                                  "fname",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3 border-b">
                            <CustomInput
                              label=""
                              name={`familyDetails[${index}].frelation`}
                              value={familyMember.frelation}
                              placeholder="Enter Relation"
                              error={
                                errors[`familyDetails[${index}].frelation`]
                              }
                              onChange={(e) =>
                                handleFamilyDetailChange(
                                  index,
                                  "frelation",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3 border-b">
                            <CustomInput
                              label=""
                              name={`familyDetails[${index}].foccupation`}
                              value={familyMember.foccupation}
                              placeholder="Enter Occupation"
                              error={
                                errors[`familyDetails[${index}].foccupation`]
                              }
                              onChange={(e) =>
                                handleFamilyDetailChange(
                                  index,
                                  "foccupation",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3 border-b">
                            <CustomInput
                              label=""
                              type="date"
                              name={`familyDetails[${index}].fdob`}
                              value={familyMember.fdob || ""}
                              placeholder="Select Date"
                              error={errors[`familyDetails[${index}].fdob`]}
                              onChange={(e) =>
                                handleFamilyDetailChange(
                                  index,
                                  "fdob",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Educational Details Form */}
            {currentPage === 3 && (
              <div className="p-4 mt-8 border">
                <div className="flex items-center h-9 ">
                  <h2 className="ml-2 text-base font-semibold leading-7 md:text-2xl text-blue-950">
                    Educational Details
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full mt-4 border border-collapse border-spacing-0">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100 border">
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                          Degree <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                          University/Institute{" "}
                          <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                          Specialization <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                          From <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                          To <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                          Percentage <span className="text-red-600">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.educationalDetails.map((eduDetail, index) => (
                        <tr
                          key={index}
                          className="bg-white border odd:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <CustomInput
                              label=""
                              type="text"
                              name={`educationalDetails[${index}].edegree`}
                              value={eduDetail.edegree}
                              placeholder="Enter degree"
                              error={
                                errors[`educationalDetails[${index}][edegree]`]
                              }
                              onChange={(e) =>
                                handleEducationalChange(
                                  index,
                                  "edegree",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3">
                            <CustomInput
                              label=""
                              type="text"
                              name={`educationalDetails[${index}].euniversity`}
                              value={eduDetail.euniversity}
                              placeholder="Enter university/institute"
                              error={
                                errors[
                                  `educationalDetails[${index}][euniversity]`
                                ]
                              }
                              onChange={(e) =>
                                handleEducationalChange(
                                  index,
                                  "euniversity",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3">
                            <CustomInput
                              label=""
                              type="text"
                              name={`educationalDetails[${index}].especialization`}
                              value={eduDetail.especialization}
                              placeholder="Enter specialization"
                              error={
                                errors[
                                  `educationalDetails[${index}][especialization]`
                                ]
                              }
                              onChange={(e) =>
                                handleEducationalChange(
                                  index,
                                  "especialization",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3">
                            <CustomInput
                              label=""
                              type="date"
                              name={`educationalDetails[${index}].efromDate`}
                              value={eduDetail.efromDate}
                              error={
                                errors[
                                  `educationalDetails[${index}][efromDate]`
                                ]
                              }
                              onChange={(e) =>
                                handleEducationalChange(
                                  index,
                                  "efromDate",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3">
                            <CustomInput
                              label=""
                              type="date"
                              name={`educationalDetails[${index}].etoDate`}
                              value={eduDetail.etoDate}
                              error={
                                errors[`educationalDetails[${index}][etoDate]`]
                              }
                              onChange={(e) =>
                                handleEducationalChange(
                                  index,
                                  "etoDate",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3">
                            <CustomInput
                              label=""
                              type="text"
                              name={`educationalDetails[${index}].epercentage`}
                              value={eduDetail.epercentage}
                              placeholder="Enter percentage"
                              error={
                                errors[
                                  `educationalDetails[${index}][epercentage]`
                                ]
                              }
                              onChange={(e) =>
                                handleEducationalChange(
                                  index,
                                  "epercentage",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Employment Details */}
            {currentPage === 4 && (
              <div className="p-4 mt-8 border">
                <div className="flex items-center h-9 ">
                  <h2 className="ml-2 text-base font-semibold leading-7 md:text-2xl text-blue-950">
                    Employment Details
                  </h2>
                </div>
                <div className="overflow-x-auto bg-gray-50 rounded-b-md">
                  <table className="w-full mt-4 border border-collapse border-gray-300">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100 border">
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800 border border-gray-300">
                          Company Name <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800 border border-gray-300">
                          Designation <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800 border border-gray-300">
                          From <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800 border border-gray-300">
                          To <span className="text-red-600">*</span>
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800 border border-gray-300">
                          Annual CTC <span className="text-red-600">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.employmentDetails.map((empDetail, index) => (
                        <tr
                          key={index}
                          className="bg-white border odd:bg-gray-50"
                        >
                          <td className="px-4 py-3 border border-gray-300">
                            <CustomInput
                              label="Company Name"
                              name={`employmentDetails[${index}][companyName]`}
                              value={empDetail.companyName || ""}
                              error={
                                errors[
                                  `employmentDetails[${index}][companyName]`
                                ]
                              }
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "companyName",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="px-4 py-3 border border-gray-300">
                            <CustomInput
                              label="Designation"
                              name={`employmentDetails[${index}][designation]`}
                              value={empDetail.designation || ""}
                              error={
                                errors[
                                  `employmentDetails[${index}][designation]`
                                ]
                              }
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "designation",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="px-4 py-3 border border-gray-300">
                            <CustomInput
                              label="From"
                              type="date"
                              name={`employmentDetails[${index}][empFromDate]`}
                              value={empDetail.empFromDate || ""}
                              error={
                                errors[
                                  `employmentDetails[${index}][empFromDate]`
                                ]
                              }
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "empFromDate",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="px-4 py-3 border border-gray-300">
                            <CustomInput
                              label="To"
                              type="date"
                              name={`employmentDetails[${index}][empToDate]`}
                              value={empDetail.empToDate || ""}
                              error={
                                errors[`employmentDetails[${index}][empToDate]`]
                              }
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "empToDate",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="px-4 py-3 border border-gray-300">
                            <CustomInput
                              type="text"
                              label="Annual CTC"
                              name={`employmentDetails[${index}][annualctc]`}
                              value={empDetail.annualctc || ""}
                              error={
                                errors[`employmentDetails[${index}][annualctc]`]
                              }
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "annualctc",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentPage === 5 && (
              <div className="p-4 mt-8 border">
                <div className="flex items-center h-9 ">
                  <h2 className="ml-2 text-base font-semibold leading-7 md:text-2xl text-blue-950">
                    Bank Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 mt-4 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Name */}
                  <div className="sm:col-span-3">
                    <CustomInput
                      label="Name"
                      name="bankAccName"
                      value={formData.bankAccName}
                      error={errors.bankAccName}
                      placeholder="Enter account holder's name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Account No */}
                  <div className="sm:col-span-3">
                    <CustomInput
                      label="Account No"
                      name="accountNumber"
                      value={formData.accountNumber}
                      error={errors.accountNumber}
                      placeholder="Enter account number"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* IFSC Code */}
                  <div className="sm:col-span-3">
                    <CustomInput
                      label="IFSC Code"
                      name="ifscCode"
                      value={formData.ifscCode}
                      error={errors.ifscCode}
                      placeholder="Enter IFSC code"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Branch Name */}
                  <div className="sm:col-span-3">
                    <CustomInput
                      label="Branch Name"
                      name="branchName"
                      value={formData.branchName}
                      placeholder="Enter branch name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentPage === 6 && (
              <div className="p-4 mt-8 border">
                <div className="flex items-center h-9 ">
                  <h2 className="ml-2 text-base font-semibold leading-7 md:text-2xl text-blue-950">
                    Declaration
                  </h2>
                </div>

                {/* Declaration Text */}
                <p className="mt-4 text-base font-medium leading-relaxed text-gray-800">
                  I hereby declare that the statements made in my application
                  form are true, complete, and correct to the best of my
                  knowledge and belief. In the event of any information being
                  found fraudulent, false, or incorrect at any stage, my
                  services are liable to be terminated without notice.
                </p>

                {/* Declaration Checkbox */}
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={isDeclarationChecked}
                    onChange={(e) => setIsDeclarationChecked(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    required
                  />
                  <label
                    htmlFor="declaration"
                    className="ml-3 text-base font-medium text-gray-900 cursor-pointer"
                  >
                    I agree to the declaration.
                  </label>
                </div>

                {/* Form Inputs */}
                <div className="flex gap-2 mt-8">
                  {/* Name */}
                  <CustomInput
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    placeholder="Enter your name"
                    error={errors.name}
                    onChange={handleChange}
                  />

                  {/* Date */}
                  <CustomInput
                    label="Date"
                    type="date"
                    name="decDate"
                    value={formData.decDate || ""}
                    error={errors.decDate}
                    onChange={handleChange}
                  />
                  {/* Signature */}

                  <CustomInput
                    label="Signature"
                    type="file"
                    name="signature"
                    error={errors.signature}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center mt-6 gap-x-6">
              <button
                type="button"
                className={`text-base font-semibold leading-6 ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-900"
                }`}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                type="button"
                className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                  currentPage === totalPages
                    ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                }`}
                onClick={nextPage}
              >
                Next
              </button>
              {/* <button
                  type="button"
                  className="text-base font-semibold leading-6 text-gray-900"
                  onClick={openPreview}
                >
                  Preview
              </button> */}
            </div>
            {/* Save Button - only visible on the last page */}
            {currentPage === totalPages && (
              <div className="flex items-center justify-end mt-6 gap-x-6">
                <button
                  type="button"
                  className="text-base font-semibold leading-6 text-gray-900"
                  onClick={openPreview}
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isEditMode ? "Update" : "Submit"}
                </button>
              </div>
            )}
          </div>
        </form>
        {/* Conditional rendering of PreviewForm */}
        {showPreview && (
          <PreviewForm
            isOpen={showPreview}
            onClose={closePreview}
            formData={formData}
          />
        )}
      </div>
    </>
  );
};

export default EmpRegistrationForm;

function CustomInput({
  label,
  type = "text",
  name,
  value,
  placeholder = "",
  error,
  onChange,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const isPasswordField = type === "password";

  return (
    <div className="flex-1 mb-4">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          // type={type}
          type={isPasswordField && isPasswordVisible ? "text" : type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full px-4 py-2 rounded border transition-all duration-200 outline-none focus:ring-1 focus:ring-blue-300 ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 flex items-center text-gray-500 right-3"
          >
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
        {error && <span className="text-sm text-red-500 ">{error}</span>}
      </div>
    </div>
  );
}

function CustomTextArea({
  label,
  name,
  value,
  placeholder = "",
  error,
  onChange,
}) {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          rows={3}
          className={`w-full px-4 py-2 rounded border transition-all duration-200 resize-none outline-none focus:ring-1 focus:ring-blue-300 ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function CustomSelect({ label, options, selectedOption, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const listboxRef = useRef(null);
  const selectedOptionRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setFocusedIndex(-1);
    selectedOptionRef.current?.focus();
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (isOpen && e.key === "Escape") {
        setIsOpen(false);
        selectedOptionRef.current?.focus();
      }
    };

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
        if (focusedIndex >= 0) {
          e.preventDefault();
          handleSelect(options[focusedIndex]);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setFocusedIndex(0);
    }
  };

  useEffect(() => {
    if (isOpen && listboxRef.current) {
      const focusedElement = listboxRef.current.querySelector(
        `#option-${focusedIndex}`
      );
      focusedElement?.focus();
    }
  }, [isOpen, focusedIndex]);

  const id = label + Math.random().toString;

  return (
    <div className="flex-1 w-auto mb-4">
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div
        className="relative"
        ref={dropdownRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {/* Selected Option */}
        <button
          id={id}
          ref={selectedOptionRef}
          type="button"
          aria-autocomplete="list"
          aria-controls={`${id}-listbox`}
          aria-activedescendant={
            focusedIndex >= 0 ? `option-${focusedIndex}` : ""
          }
          className={`flex items-center justify-between w-full ${
            error
              ? "border-red-500 ring-red-300 outline-red-300"
              : "border-gray-300 ring-blue-300 outline-blue-300"
          } px-4 py-2  outline-1   bg-white border rounded cursor-pointer transition-all duration-200 ${
            isOpen ? "ring-1" : "ring-0"
          }`}
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "ArrowDown") {
              e.preventDefault();
              toggleDropdown();
            }
          }}
        >
          <span className="text-left text-gray-700 select-none">
            {selectedOption || "Select an option"}
          </span>
          <FiChevronDown
            className={`text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {/* Dropdown Options */}
        <ul
          id={`${id}-listbox`}
          ref={listboxRef}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          className={`absolute ${
            isOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-10 opacity-0 pointer-events-none"
          } transition-all z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto`}
        >
          {options.map((option, index) => (
            <li
              key={option._id || index}
              id={`option-${index}`}
              role="option"
              aria-selected={selectedOption === option}
              tabIndex={-1}
              className={`px-4 py-2 outline-none cursor-pointer select-none 
                  ${
                    selectedOption === option
                      ? "bg-indigo-50 font-semibold"
                      : ""
                  } 
                  ${
                    focusedIndex === index
                      ? "bg-indigo-200"
                      : "hover:bg-indigo-100"
                  }
                `}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setFocusedIndex(index)}
              onKeyDown={handleKeyDown}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
