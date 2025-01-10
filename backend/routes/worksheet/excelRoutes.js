const express = require("express");
// const multer = require("multer");
// const path = require("path");
const { uploadFile, getFile, updateFile } = require("../../controllers/worksheet/excelController");
const upload = require("../../config/multerConfig"); // Import Multer configuration

const router = express.Router();
// const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.post("/upload", upload.single("excelFile"), uploadFile);
router.get("/file", getFile);
router.post("/update", upload.single("excelFile"), updateFile);

module.exports = router;
