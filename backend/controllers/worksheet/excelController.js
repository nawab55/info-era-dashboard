const File = require("../../models/worksheet_model/File");
const fs = require("fs");
const path = require("path");

exports.uploadFile = async (req, res) => {
  const { originalname, path: filePath } = req.file;

  const newFile = new File({ originalName: originalname, filePath });
  await newFile.save();

  res.json({ message: "File uploaded successfully" });
};

exports.getFile = async (req, res) => {
    try {
      const file = await File.findOne();
      if (!file) {
        return res.status(404).json({ message: "No file record found in the database" });
      }
  
      if (!fs.existsSync(file.filePath)) {
        return res.status(404).json({ message: "File does not exist on the server" });
      }
  
      res.download(file.filePath, file.originalName);
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ message: "Server error fetching the file" });
    }
  };
  

  exports.updateFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
          }
      const existingFile = await File.findOne();
  
      if (existingFile) {
        console.log("Existing file:", existingFile);
  
        // Delete the existing file from the filesystem
        if (fs.existsSync(existingFile.filePath)) {
          try {
            fs.unlinkSync(existingFile.filePath); // Remove the old file
            console.log("Old file deleted successfully.");
          } catch (err) {
            console.error("Error deleting the old file:", err);
          }
        } else {
          console.warn("File does not exist on the filesystem:", existingFile.filePath);
        }
  
        // Remove the document from the database
        await File.deleteOne({ _id: existingFile._id }); // Use deleteOne to remove the document
        console.log("Existing file document removed from database.");
      }
  
      // Save the new file
      const { originalname, path: filePath } = req.file;
      console.log("New file received:", { originalname, filePath });
      const updatedFile = new File({ originalName: originalname, filePath });
      await updatedFile.save();
  
      console.log("New file saved successfully:", updatedFile);
      res.json({ message: "File updated successfully" });
    } catch (error) {
      console.error("Error updating file:", error);
      res.status(500).json({ message: "Error updating file", error: error.message });
    }
  };
  