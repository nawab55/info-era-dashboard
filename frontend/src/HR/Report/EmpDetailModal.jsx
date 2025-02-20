/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { FaTimes, FaDownload, FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import PrintableEmployeeDetails from "./PrintableEmployeeDetails";

const EmpDetailModal = ({ employee, onClose }) => {
  const componentRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // Preload images for better handling in canvas
  const preloadImages = async (element) => {
    const images = Array.from(element.querySelectorAll("img"));
    return Promise.all(
      images.map((img) => {
        if (!img.src) return Promise.resolve();
        return new Promise((resolve) => {
          const image = new Image();
          image.crossOrigin = "Anonymous";
          image.src = img.src;
          image.onload = resolve;
          image.onerror = resolve; // Continue even if some images fail
        });
      })
    );
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const content = componentRef.current;
      await preloadImages(content);

      // Capture entire content at once
      const canvas = await html2canvas(content, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: "#ffffff"
      });

      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add first page
      doc.addImage(
        canvas,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
      }

      doc.save(`Employee_Details_${employee.name}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setIsGenerating(false);
  };

  // Print button handler
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: `Employee_Details-${employee.name}`,
      pageStyle: `
        @page {
          margin: 10mm;
          size: auto;
        }
        @media print {
          .page-break {
              margin-top: ;
              display: block;
              page-break-before: auto;
          }
          body {
            font-size: 12pt;
            line-height: 1;
            color: #000;
          }
          .no-print {
            display: none !important;
          }
          .printable-content {
            height: 100vh;
            width: 100%;
            padding: 0;
            margin: 0;
          }
          .printable-content * {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .print-section {
            page-break-before: auto;
            page-break-after: auto;
          }
        }
      `,
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-h-screen bg-white rounded-lg shadow-lg md:w-2/3 lg:w-3/4 xl:w-1/2">
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
          <h2 className="text-xl font-semibold md:text-2xl text-blue-950">
            Employee Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-700 no-print"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        {/* Display Employee Details */}
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)] printable-content">
          <PrintableEmployeeDetails ref={componentRef} employee={employee} />
        </div>
        {/* Print and Download PDF Buttons */}
        <div className="flex items-center justify-between p-4 space-x-4 border-t-2 border-gray-200 no-print">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 space-x-2 font-semibold text-white rounded bg-blue-950 hover:bg-blue-800"
          >
            <FaPrint className="w-5 h-5" />
            <span>Print</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
          >
            <FaDownload className="w-4 h-4" />
            <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpDetailModal;





// /* eslint-disable react/prop-types */
// import { useRef } from "react";
// import { FaPrint, FaTimes } from "react-icons/fa";
// import { useReactToPrint } from "react-to-print";
// import PrintableEmployeeDetails from "./PrintableEmployeeDetails";

// const EmpDetailModal = ({ employee, onClose }) => {
//   const componentRef = useRef();

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `Employee_Details-${employee.name}`,
//     pageStyle: `
//       @page {
//         margin: 10mm;
//         size: auto;
//       }
//       @media print {
//         .page-break {
//             margin-top: ;
//             display: block;
//             page-break-before: auto;
//         }
//         body {
//           font-size: 12pt;
//           line-height: 1;
//           color: #000;
//         }
//         .no-print {
//           display: none !important;
//         }
//         .printable-content {
//           height: 100vh;
//           width: 100%;
//           padding: 0;
//           margin: 0;
//         }
//         .printable-content * {
//           page-break-inside: avoid;
//           break-inside: avoid;
//         }
//         .print-section {
//           page-break-before: auto;
//           page-break-after: auto;
//         }
//       }
//     `,
//   });

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-11/12 max-h-screen bg-white rounded-lg shadow-lg md:w-2/3 lg:w-3/4 xl:w-2/3">
//         <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
//           <h2 className="text-3xl font-semibold text-blue-950">Employee Details</h2>
//           <button onClick={onClose} className="text-gray-600 hover:text-red-700 no-print">
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Display Employee Details */}
//         <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] printable-content">
//           <PrintableEmployeeDetails ref={componentRef} employee={employee} />
//         </div>

//         {/* Print Button */}
//         <div className="flex items-center justify-end p-4 space-x-4 border-t-2 border-gray-200 no-print">
//           <button
//             onClick={handlePrint}
//             className="flex items-center px-4 py-2 space-x-2 font-semibold text-white rounded bg-blue-950 hover:bg-blue-800"
//           >
//             <FaPrint className="w-5 h-5" />
//             <span>Print</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmpDetailModal;




  // chatgpt
// /* eslint-disable react/prop-types */
// import { useRef, useState } from "react";
// import { FaTimes, FaDownload } from "react-icons/fa";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import PrintableEmployeeDetails from "./PrintableEmployeeDetails";

// const EmpDetailModal = ({ employee, onClose }) => {
//   const componentRef = useRef();
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleDownloadPDF = async () => {
//     setIsGenerating(true);

//     const content = componentRef.current;
//     const scaleFactor = 2; // Higher scale for better quality

//     try {
//       const canvas = await html2canvas(content, {
//         scale: scaleFactor,
//         useCORS: true, // Ensures images are loaded
//         logging: false,
//         allowTaint: false,
//         windowWidth: content.scrollWidth,
//         windowHeight: content.scrollHeight,
//       });

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pdf = new jsPDF("p", "mm", "a4");

//       const imgWidth = 210; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let position = 0; // Initial position

//       if (imgHeight <= 297) {
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       } else {
//         let y = 0;
//         while (y < imgHeight) {
//           pdf.addImage(imgData, "PNG", 0, -y, imgWidth, imgHeight);
//           y += 297; // Move to next A4 page
//           if (y < imgHeight) pdf.addPage();
//         }
//       }

//       pdf.save(`Employee_Details_${employee.name.replace(/\s/g, "_")}.pdf`);
//     } catch (error) {
//       console.error("PDF Generation Error:", error);
//     }

//     setIsGenerating(false);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-11/12 max-h-screen bg-white rounded-lg shadow-lg md:w-2/3 lg:w-3/4 xl:w-1/2">
//         <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
//           <h2 className="text-xl font-semibold md:text-2xl text-blue-950">
//             Employee Details
//           </h2>
//           <button onClick={onClose} className="text-gray-600 hover:text-red-700">
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
//           <div ref={componentRef} className="p-4 bg-white">
//             <PrintableEmployeeDetails employee={employee} />
//           </div>
//         </div>

//         <div className="flex items-center justify-end p-4 space-x-4 border-t-2 border-gray-200">
//           <button
//             onClick={handleDownloadPDF}
//             disabled={isGenerating}
//             className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
//           >
//             <FaDownload className="w-4 h-4" />
//             <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmpDetailModal;



// deepseek
/* eslint-disable react/prop-types */
// import { useRef, useState } from "react";
// import { FaTimes, FaDownload } from "react-icons/fa";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import PrintableEmployeeDetails from "./PrintableEmployeeDetails";

// const EmpDetailModal = ({ employee, onClose }) => {
//   const componentRef = useRef();
//   const [isGenerating, setIsGenerating] = useState(false);

//   const preloadImages = async (element) => {
//     const images = Array.from(element.querySelectorAll("img"));
//     return Promise.all(images.map(img => {
//       if (!img.src) return Promise.resolve();
//       return new Promise((resolve, reject) => {
//         const image = new Image();
//         image.crossOrigin = "Anonymous";
//         image.src = img.src;
//         image.onload = resolve;
//         image.onerror = reject;
//       });
//     }));
//   };

//   const handleDownloadPDF = async () => {
//     setIsGenerating(true);
//     try {
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const content = componentRef.current;
//       await preloadImages(content);

//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
      
//       const canvas = await html2canvas(content, {
//         scale: 1,
//         scrollY: -window.scrollY,
//         useCORS: true,
//         allowTaint: true,
//         logging: true,
//       });

//       const imgWidth = pageWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       let position = 0;
//       let remainingHeight = imgHeight;

//       while (remainingHeight > 0) {
//         const sectionHeight = remainingHeight > pageHeight ? pageHeight : remainingHeight;
//         const sectionCanvas = await html2canvas(content, {
//           scale: 1,
//           windowHeight: sectionHeight,
//           scrollY: position,
//           useCORS: true,
//         });

//         const sectionImgData = sectionCanvas.toDataURL("image/png", 1.0);
//         doc.addImage(sectionImgData, "PNG", 0, 0, imgWidth, sectionHeight);
        
//         remainingHeight -= pageHeight;
//         position += sectionCanvas.height / 2; // Adjust for scale factor

//         if (remainingHeight > 0) {
//           doc.addPage();
//         }
//       }

//       doc.save(`Employee_Details_${employee.name}.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//     setIsGenerating(false);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-11/12 max-h-screen bg-white rounded-lg shadow-lg md:w-2/3 lg:w-3/4 xl:w-1/2">
//         <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
//           <h2 className="text-xl font-semibold md:text-2xl text-blue-950">
//             Employee Details
//           </h2>
//           <button onClick={onClose} className="text-gray-600 hover:text-red-700">
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
//           <PrintableEmployeeDetails ref={componentRef} employee={employee} />
//         </div>

//         <div className="flex items-center justify-end p-4 space-x-4 border-t-2 border-gray-200">
//           <button
//             onClick={handleDownloadPDF}
//             disabled={isGenerating}
//             className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
//           >
//             <FaDownload className="w-4 h-4" />
//             <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmpDetailModal;