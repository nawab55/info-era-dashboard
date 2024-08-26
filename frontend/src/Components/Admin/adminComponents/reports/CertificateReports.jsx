import { useState, useEffect } from "react";
import api from "../../../../config/api";
import { format } from "date-fns";

const CertificateReports = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await api.get("/api/certificate/get-all");
        setCertificates(response.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section className="md:ml-60 bg-inherit px-4">
      <div className="bg-sky-200 p-4 text-center text-black text-2xl font-bold border-b-2 border-black">
        Certificate Reports
      </div>
      <div className="p-4">
        <div className="overflow-x-auto pb-20">
          <table className="min-w-full text-center text-sm bg-indigo-100">
            <thead className="border-b border-black font-medium bg-indigo-300 sticky top-0">
              <tr className="text-slate-950 border font-bold text-lg border-black">
                <th className="px-1 py-1 border border-black">Year</th>
                <th className="px-1 py-1 border border-black">College Name</th>
                <th className="px-1 py-1 border border-black">Registration No</th>
                <th className="px-1 py-1 border border-black">Student Name</th>
                <th className="px-1 py-1 border border-black">Project Name</th>
                <th className="px-1 py-1 border border-black">Language</th>
                <th className="px-1 py-1 border border-black">To Date</th>
                <th className="px-1 py-1 border border-black">From Date</th>
                <th className="px-1 py-1 border border-black">Payment</th>
                <th className="px-1 py-1 border border-black">Mobile No</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-gray-100 border border-black">
              {certificates.map((cert, index) => (
                <tr
                  key={index}
                  className="text-sm font-medium border border-black hover:bg-blue-200 text-center"
                >
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.year}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.collegeName}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.regNo}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.studentName}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.projectName}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.language}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{format(new Date(cert.toDate), 'MM/dd/yyyy')}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{format(new Date(cert.fromDate), 'MM/dd/yyyy')}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.payment}</td>
                  <td className="whitespace-nowrap px-1 py-1 border border-black">{cert.mobileNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CertificateReports;
