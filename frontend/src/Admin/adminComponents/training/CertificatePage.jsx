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

const CertificatePage = React.forwardRef(({ certificateData }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col justify-between h-screen border border-gray-300 p-0"
    >
      {/* Header Image */}
      <div>
        <img
          src={headerImage}
          alt="Certificate Header"
          className="w-full h-48"
        />
      </div>

      {/* Main Content */}
      <div className="text-center mt-[-2.5rem]">  
        <div className="w-full mb-2">
          <div className="flex justify-center">
            <img src={logo} alt="Company Logo" className="" />
          </div>
          <h4 className="mt-[-0.625rem] text-lg font-semibold">
            Info Era Software Services Pvt. Ltd.
          </h4>
        </div>

        <div className="w-full mb-2">
          <h1 className="text-4xl font-bold">CERTIFICATE</h1>
          <h2 className="text-2xl">OF COMPLETION</h2>
        </div>

        <div className="w-full mb-2">
          <h3 className="text-2xl font-semibold">To Whom It May Concern</h3>
        </div>

        <div className="w-full mb-2">
          <p className="text-lg">
            This is to certify that <b>{certificateData.studentName}</b>, a
            student of <b>{certificateData.course}</b> Final Year from
            <b> {certificateData.collegeName}</b> has successfully completed his
            internship at <b>Info Era Software Services Pvt. Ltd.</b>
            Patna from <b>{formatDate(certificateData.fromDate)}</b> to{" "}
            <b>{formatDate(certificateData.toDate)}</b>.
          </p>
        </div>

        <div className="w-full mb-2">
          <p className="text-lg">
            This work entitled <b>{certificateData.projectName}</b> done by{" "}
            <b>{certificateData.studentName}</b>, his conduct and performance
            during this period was excellent.
          </p>
        </div>

        <div className="w-full mb-2">
          <p className="text-lg italic">
            &quot;We wish him all the best in his future endeavors&quot;
          </p>
        </div>

        <div className="w-full mt-8">
          <div className="flex justify-end">
            <div className="w-1/3 border-t border-black pt-2">
              <h4 className="text-center">
                RAHUL RAJ
                <br />
                <span className="text-sm font-light">MANAGING DIRECTOR</span>
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Image */}
      <div>
        <img
          src={footerImage}
          alt="Certificate Footer"
          className="w-full h-20"
        />
      </div>
    </div>
  );
});

// Assigning a display name to the component to avoid the ESLint warning
CertificatePage.displayName = "CertificatePage";

export default CertificatePage;
