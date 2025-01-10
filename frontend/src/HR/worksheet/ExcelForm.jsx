import { useState } from 'react';
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import * as GC from '@grapecity/spread-sheets';
import * as ExcelIO from '@grapecity/spread-excelio'; // Import ExcelIO explicitly

const ExcelForm = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [workbook, setWorkbook] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workbook) {
      alert('Please load and edit the Excel file first!');
      return;
    }

    // Convert the updated workbook to JSON
    const workbookData = workbook.toJSON();

    // Prepare FormData for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('workbook', JSON.stringify(workbookData)); // Send workbook as JSON

    const response = await fetch('http://localhost:5000/api/excel/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
  };

  const handleView = () => {
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const excelIO = new ExcelIO.IO(); // Create an instance of ExcelIO
        const spread = new GC.Spread.Sheets.Workbook(
          document.getElementById('spread-container'),
          {
            sheetCount: 1,
          }
        );
  
        excelIO.open(
          e.target.result,
          (json) => {
            spread.fromJSON(json);
  
            // Get the first sheet
            const sheet = spread.getActiveSheet();
  
            // Add an extra column
            const columnCount = sheet.getColumnCount();
            sheet.setColumnCount(columnCount + 1); // Increase column count by 1
  
            // Set header for the new column
            const newColumnIndex = columnCount; // Index of the new column
            sheet.setValue(0, newColumnIndex, 'New Column'); // Set header in the first row
  
            setWorkbook(spread); // Save workbook instance in state
          },
          (error) => {
            console.error('Error loading Excel file:', error);
            alert('Failed to load Excel file. Please try again.');
          }
        );
      };
  
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select a file first.');
    }
  };
  

  return (
    <div>
      <h1>Upload and Edit Excel File</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter file name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
        <button type="button" onClick={handleView}>Load & Edit</button>
        <button type="submit">Submit Updated File</button>
      </form>

      <div
        id="spread-container"
        style={{
          width: '100%',
          height: '500px',
          marginTop: '20px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default ExcelForm;
