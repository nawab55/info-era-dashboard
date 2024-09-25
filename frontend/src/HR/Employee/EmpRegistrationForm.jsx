import  { useEffect, useState } from "react";
import api from "../../config/api";
// import axios from "axios";
// import API_BASE_URL from "../../../config/api"
import { toast } from "react-toastify";
import PreviewForm from "./PreviewForm";

const EmpRegistrationForm = () => {
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
      { edegree: "", euniversity: "", especialization: "", efromDate: "", etoDate: "", epercentage: "", },
      { edegree: "", euniversity: "", especialization: "", efromDate: "", etoDate: "", epercentage: "", },
      { edegree: "", euniversity: "", especialization: "", efromDate: "", etoDate: "", epercentage: "", },
    ],
    employmentDetails: [
      { companyName: "", designation: "", empFromDate: "", empToDate: "", annualctc: "" },
      { companyName: "", designation: "", empFromDate: "", empToDate: "", annualctc: "" },
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
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.fathersName)
        newErrors.fathersName = "Father's Name is required";
      if (!formData.mothersName)
        newErrors.mothersName = "Mother's Name is required";
      if (!formData.correspondenceAddress)
        newErrors.correspondenceAddress = "CorrespondenceAddress is required";
      if (!formData.permanentAddress)
        newErrors.permanentAddress = "PermanentAddress is required";
      if (!formData.mobile) newErrors.mobile = "Mobile no is required";
      if (!formData.dob) newErrors.dob = "Dob is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.empType) newErrors.empType = "Employee type is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.aadharNo) newErrors.aadharNo = "AadharNo is required";
      if (!formData.aadhaarFrontImage) newErrors.aadhaarFrontImage = "Aadhaar Front Image is required";
      if (!formData.aadhaarBackImage) newErrors.aadhaarBackImage = "Aadhaar Back Image is required";
      if (!formData.panImage) newErrors.panImage = "PanImage is required";
      if (!formData.panNo) newErrors.panNo = "PanNo is required";
      if (!formData.dateOfJoining) newErrors.dateOfJoining = "DateOfJoining is required";
      if (!formData.emergencyContactName) newErrors.emergencyContactName = "EmergencyContactName is required";
      if (!formData.emergencyContactRelation) newErrors.emergencyContactRelation ="EmergencyContactRelation is required";
      if (!formData.emergencyContactMobile) newErrors.emergencyContactMobile = "EmergencyContactMobile is required";
      if (!formData.emergencyContactAddress) newErrors.emergencyContactAddress = "EmergencyContactAddress is required";
    } else if (currentPage === 2) {
      formData.familyDetails.forEach((familyMember, index) => {
        if (!familyMember.fname)
          newErrors[`familyDetails[${index}].fname`] = "Family Name is required";
        if (!familyMember.frelation)
          newErrors[`familyDetails[${index}].frelation`] = "Relation is required";
      });
    } else if (currentPage === 3) {
      formData.educationalDetails.forEach((educationalDetail, index) => {
        if (!educationalDetail.edegree)
          newErrors[`educationalDetails[${index}][edegree]`] = "Educational degree is required";
        if (!educationalDetail.euniversity)
          newErrors[`educationalDetails[${index}][euniversity]`] = "Educational university is required";
        if (!educationalDetail.especialization)
          newErrors[`educationalDetails[${index}][especialization]`] = "Educational especialization is required";
        if (!educationalDetail.efromDate)
          newErrors[`educationalDetails[${index}][efromDate]`] = "Educational fromDate is required";
        if (!educationalDetail.etoDate)
          newErrors[`educationalDetails[${index}][etoDate]`] = "Educational toDate is required";
        if (!educationalDetail.epercentage)
          newErrors[`educationalDetails[${index}][epercentage]`] = "Educational percentage is required";
      });
    } else if (currentPage === 4) {
      formData.employmentDetails.forEach((employmentDetail, index) => {
        if (!employmentDetail.companyName)
          newErrors[`employmentDetails[${index}][companyName]`] = "Employement Company name is required";
        if (!employmentDetail.designation)
          newErrors[`employmentDetails[${index}][designation]`] = "Employement Designation is required";
        if (!employmentDetail.empFromDate)
          newErrors[`employmentDetails[${index}][empFromDate]`] = "Employement fromDate is required";
        if (!employmentDetail.empToDate)
          newErrors[`employmentDetails[${index}][empToDate]`] = "Employement toDate is required";
        if (!employmentDetail.annualctc)
          newErrors[`employmentDetails[${index}][annualctc]`] = "Employement annualctc is required";
      });
    } else if (currentPage === 5) {
      if (!formData.bankAccName)
        newErrors.bankAccName = "Bank Account Name is required";
      if (!formData.accountNumber)
        newErrors.accountNumber = "Account Number is required";
      if (!formData.ifscCode) newErrors.ifscCode = "IFSC Code is required";
    } else if (currentPage === 6) {
      if (!formData.decDate) newErrors.decDate = "Declaration Date is required";
      if (!formData.signature) newErrors.signature = "signature image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0]; // Capture the File Input
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     signature: file,
  //   }));
  // };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    fetchEmployeeTypes();
  }, []);

  const fetchEmployeeTypes = async () => {
    try {
      const response = await api.get('/api/type/employee-types');
      setEmployeeTypes(response.data);
    } catch (error) {
      console.error('Error fetching employee types:', error);
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
      const response = await api.post("/api/user/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit the form.");
    }
  };  

  return (
    <>
      <div className="p-4 md:ml-52 mt-16">
        <h1 className="text-base md:text-2xl font-bold pb-2 text-center uppercase border-b border-gray-300">
            Employee Registration Form
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="">
            {currentPage === 1 && (
              <div className="p-2 border-2 hover:border-gray-400 shadow-lg border-red-900/10">
                <div className="flex items-center bg-blue-200 h-9 border-b-2 border-black">
                  <h2 className="text-base md:text-2xl ml-2 font-semibold leading-7 text-blue-950">
                    Personal Details
                  </h2>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-6">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        value={formData.name}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />
                      {errors.name && (
                        <span className="text-red-600">{errors.name}</span>
                      )}
                    </div>
                  </div>
                  {/* Fathers Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fathersName"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Father&apos;s Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="fathersName"
                        id="fathersName"
                        value={formData.fathersName}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.fathersName && (
                        <span className="text-red-600">{errors.fathersName}</span>
                      )}
                    </div>
                  </div>
                  {/* Mothers Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="mothersName"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Mother&apos;s Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="mothersName"
                        id="mothersName"
                        value={formData.mothersName}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.mothersName && (
                        <span className="text-red-600">{errors.mothersName}</span>
                      )}
                    </div>
                  </div>
                  {/* Correspondence Address */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="correspondenceAddress"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Correspondence Address{" "}
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="correspondenceAddress"
                        id="correspondenceAddress"
                        autoComplete="street-address"
                        value={formData.correspondenceAddress}
                        onChange={handleChange}
                        className="ps-2 block w-full h-16 rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.correspondenceAddress && (
                        <span className="text-red-600">{errors.correspondenceAddress}</span>
                      )}
                    </div>
                  </div>
                  {/* Permanent Address */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="permanentAddress"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Permanent Address <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="permanentAddress"
                        id="permanentAddress"
                        autoComplete="street-address"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        className="ps-2 block w-full h-16 rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.permanentAddress && (
                        <span className="text-red-600">{errors.permanentAddress}</span>
                      )}
                    </div>
                  </div>
                  {/* Mobile No */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="mobile"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Mobile No <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        autoComplete="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.mobile && (
                        <span className="text-red-600">{errors.mobile}</span>
                      )}
                    </div>
                  </div>
                  {/* Alternative Mobile No */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="altMobile"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Alternative Mobile No
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        name="altMobile"
                        id="altMobile"
                        autoComplete="tel"
                        value={formData.altMobile}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none" 
                      />
                    </div>
                  </div>
                  {/* Date of Birth */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="dob"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Date of Birth <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="px-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.dob && (
                        <span className="text-red-600">{errors.dob}</span>
                      )}
                    </div>
                  </div>
                  {/* Email */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Email Id <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2 ">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.email && (
                        <span className="text-red-600">{errors.email}</span>
                      )}
                    </div>
                  </div>
                  {/* Password */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="password"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2 ">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                    </div>
                  </div>
                  {/* Employee Type */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="empType"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Employee Type <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        name="empType"
                        id="empType"
                        value={formData.empType}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Select Type</option>
                        {employeeTypes.map((type) => (
                          <option key={type._id} value={type.type}>
                            {type.type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Gender */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="gender"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Gender <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  {/* Marital Status */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="maritalStatus"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Marital Status <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        name="maritalStatus"
                        id="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        
                      >
                        <option value="">Select Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </select>
                    </div>
                  </div>
                  {/* Aadhar No */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="aadharNo"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Aadhar No <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="aadharNo"
                        id="aadharNo"
                        value={formData.aadharNo}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.aadharNo && (
                        <span className="text-red-600">{errors.aadharNo}</span>
                      )}
                    </div>
                  </div>
                  {/* Aadhaar Card Image */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="aadhaarFrontImage"
                      className="block text-base ml-2 font-medium leading-8 text-gray-900"
                    >
                      Aadhaar Front Image <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        name="aadhaarFrontImage"
                        id="aadhaarFrontImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none"
                        required
                      />
                      {errors.aadhaarFrontImage && (
                        <span className="text-red-600">{errors.aadhaarFrontImage}</span>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="aadhaarBackImage"
                      className="block text-base ml-2 font-medium leading-8 text-gray-900"
                    >
                      Aadhaar Back Image <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        name="aadhaarBackImage"
                        id="aadhaarBackImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none"
                        required
                      />
                      {errors.aadhaarBackImage && (
                        <span className="text-red-600">{errors.aadhaarBackImage}</span>
                      )}
                    </div>
                  </div>
                  {/* designation */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="designation"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Designation <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="designation"
                        id="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />
                      
                    </div>
                  </div>
                  {/* PAN No */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="panNo"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      PAN No <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="panNo"
                        id="panNo"
                        value={formData.panNo}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />
                      {errors.panNo && (
                        <span className="text-red-600">{errors.panNo}</span>
                      )}
                    </div>
                  </div>
                  {/* PAN Card Image */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="panImage"
                      className="block text-base ml-2 font-medium leading-8 text-gray-900"
                    >
                      PAN Card Image <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="file"
                        name="panImage"
                        id="panImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none"
                        required
                      />
                      {errors.panImage && (
                        <span className="text-red-600">{errors.panImage}</span>
                      )}
                    </div>
                  </div>
                  {/* Blood Group */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="bloodGroup"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Blood Group <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="bloodGroup"
                        id="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                      />{" "}
                    </div>
                  </div>
                  {/* Date of Joining */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="dateOfJoining"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Date of Joining <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="dateOfJoining"
                        id="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        className="px-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                        required
                      />{" "}
                      {errors.dateOfJoining && (
                        <span className="text-red-600">{errors.dateOfJoining}</span>
                      )}
                    </div>
                  </div>
                  {/* Employee Id */}
                  <div className="sm:col-span-1">
                    <label htmlFor="EmpId" className="block text-base ml-2 font-medium leading-6 text-gray-900">
                      EmpId <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="EmpId"
                        id="EmpId"
                        value={formData.EmpId}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Role */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="role"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Role <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2 ">
                      <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Type</option>
                        <option value="employee">Employee</option>
                        <option value="hr">HR</option>
                        <option value="admin">Admin</option>
                        <option value="account">Account</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className=" flex bg-blue-200 h-9 border-t-2 border-b-2 border-black mt-8 items-center">
                  <h2 className="text-base md:text-3xl ml-2 font-semibold leading-7 text-blue-950">
                    Emergency Contact Details
                  </h2>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Emergency Contact Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="emergencyContactName"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="emergencyContactName"
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                      {errors.emergencyContactName && (
                        <span className="text-red-600">{errors.emergencyContactName}</span>
                      )}
                    </div>
                  </div>
                  {/* Emergency Contact Relation */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="emergencyContactRelation"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Relation <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="emergencyContactRelation"
                        id="emergencyContactRelation"
                        value={formData.emergencyContactRelation}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                      {errors.emergencyContactRelation && (
                        <span className="text-red-600">{errors.emergencyContactRelation}</span>
                      )}
                    </div>
                  </div>
                  {/* Emergency Contact Mobile */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="emergencyContactMobile"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Mobile No <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="tel"
                        name="emergencyContactMobile"
                        id="emergencyContactMobile"
                        value={formData.emergencyContactMobile}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                      {errors.emergencyContactMobile && (
                        <span className="text-red-600">{errors.emergencyContactMobile}</span>
                      )}
                    </div>
                  </div>
                  {/* Emergency Contact Address */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="emergencyContactAddress"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Address <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="emergencyContactAddress"
                        id="emergencyContactAddress"
                        value={formData.emergencyContactAddress}
                        onChange={handleChange}
                        className="ps-2 block w-full h-16 rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                      {errors.emergencyContactAddress && (
                        <span className="text-red-600">{errors.emergencyContactAddress}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Family Details */}
            {currentPage === 2 && (
              <div className="p-4 mt-8 border-2 hover:border-gray-400 shadow-lg border-red-900/10">
                <div className="bg-blue-200 h-9 border-b-2 border-black">
                  <h2 className="text-3xl ml-2 font-semibold leading-7 text-blue-950">
                    Family Details
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full mt-4">
                    <thead>
                      <tr>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          S.No
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Name <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Relation <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Occupation <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Date of Birth <span className="text-red-600">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.familyDetails.map((familyMember, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">{index + 1}</td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              name={`familyDetails[${index}].fname`}
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={familyMember.fname}
                              onChange={(e) => handleFamilyDetailChange(index, "fname", e.target.value )}
                              required
                            />
                            {errors[`familyDetails[${index}].fname`] && (
                              <span className="text-red-600">{errors[`familyDetails[${index}].fname`]}</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={familyMember.frelation}
                              onChange={(e) => handleFamilyDetailChange(index, "frelation", e.target.value)}
                              required
                            />
                            {errors[`familyDetails[${index}].frelation`] && (
                              <span className="text-red-600">{errors[`familyDetails[${index}].frelation`]}</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={familyMember.foccupation}
                              onChange={(e) => handleFamilyDetailChange(index, "foccupation", e.target.value)}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="date"
                              className="px-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={familyMember.fdob || ""}
                              onChange={(e) => handleFamilyDetailChange(index, "fdob", e.target.value)}
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
              <div className="p-4 mt-8 border-2 hover:border-gray-400 shadow-lg border-red-900/10">
                <div className="bg-blue-200 h-9 border-b-2 border-black">
                  <h2 className="text-3xl ml-2 font-semibold leading-7 text-blue-950">
                    Educational Details
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full mt-4">
                    <thead>
                      <tr>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Degree <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          University/Institute{" "}
                          <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Specialization <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          From <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          To <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Percentage <span className="text-red-600">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.educationalDetails.map((eduDetail, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={eduDetail.edegree}
                              onChange={(e) => handleEducationalChange(index, "edegree", e.target.value)}
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />
                            {errors[`educationalDetails[${index}][edegree]`] && (
                              <span className="text-red-600">{errors[`educationalDetails[${index}][edegree]`]}</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={eduDetail.euniversity}
                              onChange={(e) => handleEducationalChange(index, "euniversity",e.target.value)}
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />
                            {errors[`educationalDetails[${index}][euniversity]`] && (
                              <span className="text-red-600">{errors[`educationalDetails[${index}][euniversity]`]}</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={eduDetail.especialization}
                              onChange={(e) => handleEducationalChange(index, "especialization", e.target.value)}
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />
                            {errors[`educationalDetails[${index}][especialization]`] && (
                              <span className="text-red-600">{errors[`educationalDetails[${index}][especialization]`]}</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="date"
                              value={eduDetail.efromDate}
                              onChange={(e) => handleEducationalChange(index, "efromDate", e.target.value)}
                              className="px-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />
                            {errors[`educationalDetails[${index}][efromDate]`] && (
                              <span className="text-red-600">{errors[`educationalDetails[${index}][efromDate]`]}</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="date"
                              value={eduDetail.etoDate}
                              onChange={(e) => handleEducationalChange(index, "etoDate", e.target.value)}
                              className="px-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />
                            {errors[`educationalDetails[${index}][etoDate]`] && (
                              <span className="text-red-600">{errors[`educationalDetails[${index}][etoDate]`]}</span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={eduDetail.epercentage}
                              onChange={(e) => handleEducationalChange(index, "epercentage", e.target.value)}
                              className=" ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />{" "}
                            {errors[`educationalDetails[${index}][epercentage]`] && (
                              <span className="text-red-600">{errors[`educationalDetails[${index}][epercentage]`]}</span>
                            )}
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
              <div className="p-4 border-2 hover:border-gray-400 shadow-lg border-red-900/10">
                <div className="bg-blue-200 h-9 border-b-2 border-black">
                  <h2 className="text-3xl ml-2 font-semibold leading-7 text-blue-950">
                    Employment Details
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full mt-4">
                    <thead>
                      <tr>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Company Name <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Designation <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          From <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          To <span className="text-red-600">*</span>
                        </th>
                        <th className="text-base font-medium text-gray-900 py-2 px-4">
                          Annual CTC <span className="text-red-600">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.employmentDetails.map((empDetail, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={empDetail.companyName || ""}
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "companyName",
                                  e.target.value
                                )
                              }
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />{" "}
                            {errors[
                              `employmentDetails[${index}][companyName]`
                            ] && (
                              <span className="text-red-600">
                                {
                                  errors[
                                    `employmentDetails[${index}][companyName]`
                                  ]
                                }
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={empDetail.designation || ""}
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "designation",
                                  e.target.value
                                )
                              }
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />{" "}
                            {errors[
                              `employmentDetails[${index}][designation]`
                            ] && (
                              <span className="text-red-600">
                                {
                                  errors[
                                    `employmentDetails[${index}][designation]`
                                  ]
                                }
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="date"
                              value={empDetail.empFromDate || ""}
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "empFromDate",
                                  e.target.value
                                )
                              }
                              className="px-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />{" "}
                            {errors[
                              `employmentDetails[${index}][empFromDate]`
                            ] && (
                              <span className="text-red-600">
                                {
                                  errors[
                                    `employmentDetails[${index}][empFromDate]`
                                  ]
                                }
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="date"
                              value={empDetail.empToDate || ""}
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "empToDate",
                                  e.target.value
                                )
                              }
                              className="px-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />{" "}
                            {errors[
                              `employmentDetails[${index}][empToDate]`
                            ] && (
                              <span className="text-red-600">
                                {
                                  errors[
                                    `employmentDetails[${index}][empToDate]`
                                  ]
                                }
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={empDetail.annualctc || ""}
                              onChange={(e) =>
                                handleEmploymentChange(
                                  index,
                                  "annualctc",
                                  e.target.value
                                )
                              }
                              className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              required
                            />{" "}
                            {errors[
                              `employmentDetails[${index}][annualctc]`
                            ] && (
                              <span className="text-red-600">
                                {
                                  errors[
                                    `employmentDetails[${index}][annualctc]`
                                  ]
                                }
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentPage === 5 && (
              <div className="p-4 border-2 hover:border-gray-400 shadow-lg border-red-900/10">
                <div className="bg-blue-200 h-9 border-b-2 border-black">
                  <h2 className="text-3xl ml-2 font-semibold leading-7 text-blue-950">
                    Bank Details
                  </h2>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Name */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="bankAccName"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="bankAccName"
                        id="bankAccName"
                        autoComplete="given-name"
                        value={formData.bankAccName}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />{" "}
                      {errors.bankAccName && (
                        <span className="text-red-600">{errors.bankAccName}</span>
                      )}
                    </div>
                  </div>

                  {/* Account No */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="accountNumber"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Account No <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="accountNumber"
                        id="accountNumber"
                        autoComplete="given-account"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />{" "}
                      {errors.accountNumber && (
                        <span className="text-red-600">
                          {errors.accountNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* IFSC Code */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ifscCode"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      IFSC Code <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="ifscCode"
                        id="ifscCode"
                        autoComplete="given-ifsc"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />{" "}
                      {errors.ifscCode && (
                        <span className="text-red-600">{errors.ifscCode}</span>
                      )}
                    </div>
                  </div>
                  {/* Branch Name */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="branchName"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Branch Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="branchName"
                        id="branchName"
                        autoComplete="given-branch"
                        value={formData.branchName}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset ring-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 6 && (
              <div className="p-4 border-2 hover:border-gray-400 shadow-lg border-red-900/10">
                <div className="bg-blue-200 h-9 border-b-2 border-black mb-4">
                  <h2 className="text-3xl ml-2 font-semibold leading-7 text-blue-950">
                    Declaration
                  </h2>
                </div>

                <p className="text-base text-wrap p-4 font-medium leading-6 text-black">
                  I hereby declare that the above ststement made in my
                  application form are true,Complete and Correct to the best of
                  my knowledge and belief. In the event of any information being
                  fraud/false or incorrect at any stage, my services are liable
                  to be terminated without notice.
                </p>
                <input
                  type="checkbox"
                  id="declaration"
                  checked={isDeclarationChecked}
                  onChange={(e) => setIsDeclarationChecked(e.target.checked)}
                  className="ml-4 focus:outline-none focus:ring-0 focus:ring-offset-0 "
                  required
                />
                <label
                  htmlFor="declaration"
                  className="ml-2 text-base font-medium leading-6 text-gray-900 cursor-pointer"
                >
                  I agree to the declaration.
                </label>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        className="ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />{" "}
                      {errors.name && (
                        <span className="text-red-600">{errors.name}</span>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="decDate"
                      className="block text-base ml-2 font-medium leading-6 text-gray-900"
                    >
                      Date <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="decDate"
                        id="decDate"
                        value={formData.decDate}
                        onChange={handleChange}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />{" "}
                      {errors.decDate && (
                        <span className="text-red-600">{errors.decDate}</span>
                      )}
                    </div>
                  </div>
                  {/* Signature */}
                  <div>
                    {/* <h2 className="text-2xl font-semibold mb-4">Signature</h2> */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="signature"
                        className="block text-base ml-2 mb-2 font-medium leading-6 text-gray-900"
                      >
                        Signature <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="file"
                        id="signature"
                        name="signature"
                        onChange={handleFileChange}
                        className="border border-gray-300"
                        required
                      />{" "}
                      {errors.signature && (
                        <span className="text-red-600">{errors.signature}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-center gap-x-6">
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
              <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-base font-semibold leading-6 text-gray-900"
                onClick={openPreview}
              >
                Preview
              </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </form>
        {/* Conditional rendering of PreviewForm */}
        {showPreview && (
              <PreviewForm isOpen={showPreview} onClose={closePreview} formData={formData} />
        )}
      </div>
    </>
  );
};

export default EmpRegistrationForm;
