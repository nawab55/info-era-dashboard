const multer = require('multer');
// const { fileURLToPath } = require('url');
// const { dirname } = require('path');
const path = require('path');

// Convert module URL to file path and directory name
// const currentModuleFile = fileURLToPath(__filename);
// const __dirname = dirname(currentModuleFile);

// Configure storage for multer
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // Construct the upload path
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

// Define a function to filter files to only accept specific file types
const imageFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|gif|heic|pdf|docx|avif)$/;
  if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
    return cb(new Error("Only image, pdf, or docx files are allowed."), false);
  }
  cb(null, true);
};

// Configure multer to handle multiple fields with specific limits
const upload = multer({
  storage: storageConfig,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
}).fields([
  { name: 'signature', maxCount: 1 },
  { name: 'aadhaarFrontImage', maxCount: 1 },
  { name: 'aadhaarBackImage', maxCount: 1 },
  { name: 'panImage', maxCount: 1 },
]);

// Export the configured multer instance
module.exports = upload;
