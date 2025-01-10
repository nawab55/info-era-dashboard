import { useState, useEffect } from "react";
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import * as GC from "@grapecity/spread-sheets";
import * as ExcelIO from "@grapecity/spread-excelio";
import { FaEye, FaTimes } from "react-icons/fa";
import api from "../../config/api";

const ViewAndEditFile = () => {
  const [fileId, setFileId] = useState(null); // Store the file ID
  const [file, setFile] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [isViewerOpen, setViewerOpen] = useState(false);

  // Fetch the latest file and ID
  const fetchFile = async () => {
    try {
      const response = await api.get("/api/excel/file", {
        responseType: "blob",
      });

      // Extract file ID from headers if provided
      const contentDisposition = response.headers["content-disposition"];
      const id = contentDisposition?.match(/filename\*=UTF-8''(.+)/)?.[1];

      setFileId(id);
      setFile(response.data);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  // Open and display the file in the viewer
  const handleView = () => {
    if (!file) {
      alert("No file available to view.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const excelIO = new ExcelIO.IO();
      const spread = new GC.Spread.Sheets.Workbook(
        document.getElementById("spread-container"),
        { sheetCount: 1 }
      );

      excelIO.open(
        e.target.result,
        (json) => {
          spread.fromJSON(json);
          const sheet = spread.getActiveSheet();
          // Example modification: Add a new column
          sheet.setColumnCount(sheet.getColumnCount() + 1);
          sheet.setValue(0, sheet.getColumnCount() - 1, "New Column");
          setWorkbook(spread);
        },
        (error) => {
          console.error("Error loading Excel file:", error);
        }
      );
    };

    reader.readAsArrayBuffer(file);
    setViewerOpen(true);
  };

  // Submit the modified workbook directly to the backend
const handleSubmit = async () => {
    if (!workbook) {
      alert("No workbook to submit.");
      return;
    }
  
    const excelIO = new ExcelIO.IO();
    excelIO.save(workbook.toJSON(), (blob) => {
      const formData = new FormData();
      // Create a new file from the blob data
      const updatedFile = new File([blob], "updated-file.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      
      formData.append("excelFile", updatedFile); // Append the updated file
      formData.append("fileId", fileId); // Include the file ID in the payload
  
      // Log to confirm formData is being populated
      console.log("FormData:", formData);
  
      api
        .post(`/api/excel/update`, formData)
        .then((response) => {
          alert(response.data.message);
          setViewerOpen(false);
        })
        .catch((error) => {
          console.error("Error updating file:", error);
        });
    });
  };
  

  useEffect(() => {
    fetchFile();
  }, []);

  return (
    <div className="min-w-full min-h-screen ">
      <h1>View and Edit Excel File</h1>
      <button onClick={handleView}>
        <FaEye /> View File
      </button>

      {isViewerOpen && (
        <div className="w-full h-48">
          <div
            id="spread-container"
          />
          <button onClick={handleSubmit}>Submit Updates</button>
          <button onClick={() => setViewerOpen(false)}>
            <FaTimes /> Close Viewer
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAndEditFile;
