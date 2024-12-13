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
  if (!certificateData) return null;
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
          <h2>ISO: 9001:2015, 27001:2013</h2>
          <p>CIN No: U72300BR20114PTC022956</p>
          <p>email: info@infoera.in</p>
          <p>website: www.infoera.in</p>
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
            This certificate is proudly awarded to
            <b>{certificateData.studentName}</b>, for the completion of
            <b>{certificateData.projectName} </b> on{" "}
            <b>{certificateData.topic} topic</b> with Info Era Software Services
            Pvt. Ltd. we congratulate you for your outstanding performance in
            this training program from{" "}
            <b>{formatDate(certificateData.fromDate)}</b> to{" "}
            <b>{formatDate(certificateData.toDate)}</b>.
          </p>
        </div>

        <div className="w-full mb-2">
          <p className="text-lg">
            This Training done by <b>{certificateData.studentName}</b>
            {/* <b>{certificateData.projectName}</b> */},during this period was
            excellent.
          </p>
        </div>

        <div className="w-full mb-2">
          <p className="text-lg italic">
            &quot;We wish you all the best for your future endeavors&quot;
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
