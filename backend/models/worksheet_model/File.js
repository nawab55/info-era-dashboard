const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: String,
  filePath: String,
});

module.exports = mongoose.model("File", fileSchema);
