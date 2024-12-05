import { useState } from "react";
import { toast } from "react-toastify";
import { 
  Building2, 
  Code, 
  MapPin, 
  Globe, 
  Smartphone, 
  Plus, 
  CheckCircle 
} from "lucide-react";
import api from "../../../config/api";

const AddCollege = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeCode: "",
    address: "",
    website: "",
    mobileNo: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.collegeName.trim()) newErrors.collegeName = "College Name is required";
    if (!formData.collegeCode.trim()) newErrors.collegeCode = "College Code is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        await api.post("/api/college/create-colleges", formData);
        toast.success("College Details added successfully..", {
          icon: <CheckCircle className="text-green-500" />
        });
        
        // Reset form after successful submission
        setFormData({
          collegeName: "",
          collegeCode: "",
          address: "",
          website: "",
          mobileNo: "",
        });
      } catch (error) {
        console.error("There was an error adding the college:", error);
        toast.error("Failed to add college. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  // eslint-disable-next-line react/prop-types
  const InputField = ({ icon: Icon, name, label, type = "text", placeholder }) => (
    <div className="mb-4 group">
      <label 
        htmlFor={name} 
        className="text-sm font-medium text-gray-700 mb-2 flex items-center"
      >
        {Icon && (
          <Icon 
            className="mr-2 text-blue-500 group-focus-within:text-blue-700 transition-colors" 
            size={20} 
          />
        )}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`
            w-full px-4 py-3 border rounded
            outline-none focus:ring-2
            ${ errors[name]
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"}
            transition-all duration-300 ease-in-out
            ${errors[name] ? 'animate-shake' : ''}
          `}
        />
        {errors[name] && (
          <p className="text-red-500 text-xs mt-1 absolute left-0 -bottom-5">
            {errors[name]}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 lg:py-12 py-4">
      <div className="max-w-4xl w-full bg-white border overflow-hidden ">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 shadow-md">
          <h2 className="lg:text-2xl text-xl lg:font-extrabold font-bold text-white text-center flex items-center justify-center">
            Add New College
          </h2>
        </div>
        <form onSubmit={handleSubmit} className=" p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InputField 
              icon={Building2}
              name="collegeName"
              label="College Name"
              placeholder="Enter college name"
            />
            <InputField 
              icon={Code}
              name="collegeCode"
              label="College Code"
              placeholder="Enter college code"
            />
            <InputField 
              icon={MapPin}
              name="address"
              label="Address"
              placeholder="Enter college address"
            />
            <InputField 
              icon={Globe}
              name="website"
              label="Website"
              placeholder="Enter college website"
            />
            <div className="md:col-span-2">
              <InputField 
                icon={Smartphone}
                name="mobileNo"
                label="Mobile Number"
                placeholder="Enter contact number"
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex items-center justify-center
                py-3 px-6 bg-blue-600 text-white 
                rounded-lg font-semibold 
                hover:bg-blue-700 transition-all 
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2
                transform hover:scale-[1.02] active:scale-[0.98]
                duration-300 ease-in-out
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? (
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <Plus className="mr-2" size={20} />
              )}
              {isSubmitting ? 'Adding...' : 'Add College'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCollege;