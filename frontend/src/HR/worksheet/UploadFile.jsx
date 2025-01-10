import { useState } from "react";
import api from "../../config/api";


const UploadFile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      const response = await api.post("/api/excel/upload", formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
              },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadFile;
