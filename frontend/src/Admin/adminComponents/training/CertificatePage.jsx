/* eslint-disable react/prop-types */
import React from "react";
import logo from "/infoera.png";
import headerImage from "/certificate-header.png";
import footerImage from "/certificate-footer.png";

const formatDate = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date)
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "/");
};

const CertificatePage = React.forwardRef(
  ({ certificateData, studentData }, ref) => {
    if (!certificateData) return null;

    return (
      <div
        ref={ref}
        className="flex flex-col justify-between h-screen border border-gray-300 p-6 bg-white"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          {/* Logo and Company Info */}
          <div className="">
            <img src={logo} alt="Company Logo" className="h-16 " />
            <div className="text-sm leading-normal">
              <h4 className="text-xl font-semibold text-nowrap">
                Info Era Software Services Pvt. Ltd.
              </h4>
              <h2 className="text-base font-medium">
                ISO: 9001:2015, 27001:2013
              </h2>
              <p className="text-base">CIN No: U72300BR20114PTC022956</p>
              <p className="text-base">Email: info@infoera.in</p>
              <p className="text-base">Website: www.infoera.in</p>
            </div>
          </div>

          {/* Header Image */}
          <div className=" h-full">
            <img
              src={headerImage}
              alt="Certificate Header"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">CERTIFICATE OF COMPLETION</h1>
          <h3 className="text-2xl font-semibold mb-6">
            To Whom It May Concern
          </h3>

          <div className=" text-justify text-lg leading-relaxed px-12">
            <p className="mb-0">
              This certificate is proudly awarded to{" "}
              <b>{certificateData.studentName}</b> for the completion of the{" "}
              <b>{certificateData.projectName}</b> on{" "}
              <b>{studentData.trainingTopic}</b> with Info Era Software Services
              Pvt. Ltd.{" "}
            </p>
            <p className="mb-1">
              We Congratulate you for your outstanding performance in this
              training program, conducted from{" "}
              <b>{formatDate(certificateData.fromDate)}</b> to{" "}
              <b>{formatDate(certificateData.toDate)}</b>.
            </p>

            <p className="mb-4">
              During this period, the training undertaken by{" "}
              <b>{certificateData.studentName}</b> was evaluated as excellent.
            </p>

            <p className="italic text-center mt-8">
              &quot;We wish you all the best for your future endeavors.&quot;
            </p>
          </div>

          {/* Signature Section */}
          <div className="flex justify-start mt-20 px-12">
            <div className="text-center">
              <div className="border-t border-black pt-2 w-48">
                <h4 className="text-lg font-medium">RAHUL RAJ</h4>
                <p className="text-sm font-light">MANAGING DIRECTOR</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div>
          <img
            src={footerImage}
            alt="Certificate Footer"
            className="w-full h-auto"
          />
        </div>
      </div>
    );
  }
);

// Assigning a display name to the component to avoid the ESLint warning
CertificatePage.displayName = "CertificatePage";

export default CertificatePage;
