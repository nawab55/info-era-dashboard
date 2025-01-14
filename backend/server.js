const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const mongodb = require("mongodb");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const fs = require("fs");
// const { CORS, CORS1, CORS2, CORS3, CORS4 } = process.env;

const userRoutes = require("./routes/user/user.routes");
const employeeTypeRoutes = require("./routes/user/employeeType.routes");
const attendanceRoutes = require("./routes/attendance/attendance.routes");
const leaveRoutes = require("./routes/leaveApplication/leave.routes");
const invoiceRoutes = require("./routes/invoice/invoice.routes");
const customerRoutes = require("./routes/customer/customer.routes");
const categoryRoutes = require("./routes/product/category.routes");
const hsnCodeRoutes = require("./routes/product/hsncode.routes");
const serviceRoutes = require("./routes/product/service.routes");
const router = require("./routes/worksheet/worksheet.routes");
const domainRoutes = require("./routes/domain/domain.routes");
const collegeRoutes = require("./routes/training/college.routes");
const studentRoutes = require("./routes/training/student.routes");
const certificateRoutes = require("./routes/training/certificate.routes");
const studentTrainigRoutes = require("./routes/training/studentTraining.routes");
const jobRoutes = require("./routes/jobs/job.routes");
const jobFromsRoutes = require("./routes/jobs/jobForm.routes");
const activityRoutes = require("./routes/activity/activity.routes");
const ibcRoutes = require("./routes/co-partners/ibc.routes");
const bbcRoutes = require("./routes/co-partners/bbc.routes");
const complainRoutes = require("./routes/customer/complain.routes");
const notificationRoutes = require("./routes/notification/notification.routes");
const queryRoutes = require("./routes/contactQuery/query.routes");
const contactRoutes = require("./routes/contactQuery/contact.routes");
const consultingRoutes = require("./routes/consulting/consulting.routes");
const excelRoutes = require("./routes/worksheet/excelRoutes");
const questionTypeRoutes = require("./routes/assessmentTest/questionType.routes");
const questionRoutes = require("./routes/assessmentTest/question.routes");
const courseRoutes = require("./routes/assessmentTest/course.routes");
const studentDetailsRoutes = require("./routes/assessmentTest/studentDetails.routes");
const studentAssessmentRoutes = require("./routes/assessmentTest/studentAssessment.routes");


dotenv.config();

const app = express();
// Import and initialize cron jobs
require("./config/cronJobs");

const PORT = process.env.PORT || 5454;

// Connect to the database
connectDB();
const corsOptions = {
  origin: [
    process.env.CORS,
    process.env.CORS1,
    process.env.CORS2,
    process.env.CORS3,
    process.env.CORS4,
  ],
  // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies and other credentials
};

// Middleware
app.use(cors(corsOptions));

// app.use(cors({
//   origin: true,  // Allows all origins
//   credentials: true,
// }));

app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve static files from the 'uploads' directory

app.get("/", (req, res) => {
  res.send("Hello World----");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/type", employeeTypeRoutes);
app.use("/api/employee", attendanceRoutes);
app.use("/api/employeeLeaves", leaveRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/product", categoryRoutes);
app.use("/api/product", hsnCodeRoutes);
app.use("/api/product", serviceRoutes);
app.use("/api/worksheet", router);
app.use("/api/domain", domainRoutes);
app.use("/api/college", collegeRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/training", studentTrainigRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobform", jobFromsRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/co-partners/ibc", ibcRoutes);
app.use("/api/co-partners/bbc", bbcRoutes);
app.use("/api/complains", complainRoutes);
app.use("/api/message", notificationRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/consulting", consultingRoutes);
app.use("/api/excel", excelRoutes);
app.use("/api/assessment/question-type", questionTypeRoutes);
app.use("/api/assessment/question", questionRoutes);
app.use("/api/assessment/course", courseRoutes);
app.use("/api/assessment/student-details", studentDetailsRoutes);
app.use("/api/assessment-test", studentAssessmentRoutes);

// file Uploading Routes

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
   storage: storage, 
   limits: { fileSize: 2 * 1024 * 1024 } // Limit file size to 2MB
});

const client = new mongodb.MongoClient(process.env.MONGO_URI);
// const client = new mongodb.MongoClient(process.env.MONGO_UPLOAD_URI);

client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to MongoDB");
});

const db = client.db("Uploads");
const bucket = new mongodb.GridFSBucket(db, { bucketName: "myCustomBucket" });

// Single file upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const { fileType } = req.body;
  console.log("File received:", file);
  console.log("FileType received:", fileType);

  if (!fileType) {
    return res
      .status(400)
      .json({ success: false, message: "FileType Is Required" });
  }

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "File Is Required" });
  }

  try {
    const { filename, path } = file;
    const uploadStream = bucket.openUploadStream(filename, {
      chunkSizeBytes: 102400,
      metadata: { fileld: "fileType", value: fileType },
    });

    fs.createReadStream(path)
      .pipe(uploadStream)
      .on("error", (error) => {
        console.error(error);
        fs.unlinkSync(path); // Remove the file from the uploads folder
        return res
          .status(500)
          .json({ success: false, message: "Upload failed", error });
      })
      .on("finish", () => {
        fs.unlinkSync(path); // Remove the file from the uploads folder
        return res.status(200).json({
          success: true,
          message: "File Uploaded to Database",
          fileId: uploadStream.id,
        });
      });
      console.log("File Uploaded to Database", uploadStream)
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Upload failed", error });
  }
});

app.get("/api/file/:fileId", async (req, res) => {
  await client.connect();
  const fileId = req.params.fileId;

  try {
    const objectId = new mongodb.ObjectId(fileId);

    // Query for the specific file
    const file = await bucket.find({ _id: objectId }).next();

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const fileType = file.metadata?.value;
    console.log("fileType:", fileType);

    const downloadStream = bucket.openDownloadStream(objectId);

    res.set("Content-Type", fileType);
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.set("Content-Length", file.length);

    downloadStream.pipe(res);

    let totalSent = 0; // Initialize totalSent to 0

    downloadStream.on("data", (chunk) => {
      totalSent += chunk.length;
      const percentage = (totalSent / file.length) * 100;
      console.log(`Sent ${percentage.toFixed(2)}% of data.`);
    });

    downloadStream.on("error", (error) => {
      console.error("Error streaming file:", error);
      // Only send an error response if headers haven't been sent yet
      if (!res.headersSent) {
        res.status(500).json({ error: "Error streaming file" });
      }
    });

    // No need for downloadStream.on("end", ...) as pipe will handle ending the response
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, async () => {
  // await connectDb();
  console.log(`Server running on port ${PORT}`);
});

// Update the route to accept multiple files
// app.post("/api/upload-multiple", upload.array("files", 10), async (req, res) => {
//   const files = req.files; // Multer automatically adds an array of files here
//   const { fileType } = req.body;

//   if (!fileType) {
//     return res
//       .status(400)
//       .json({ success: false, message: "FileType is required" });
//   }

//   if (!files || files.length === 0) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Files are required" });
//   }

//   try {
//     const uploadResults = [];

//     for (const file of files) {
//       const { filename, path } = file;
//       const uploadStream = bucket.openUploadStream(filename, {
//         chunkSizeBytes: 102400,
//         metadata: { field: "fileType", value: fileType },
//       });

//       // Use a promise to handle each file upload
//       const uploadPromise = new Promise((resolve, reject) => {
//         fs.createReadStream(path)
//           .pipe(uploadStream)
//           .on("error", (error) => {
//             console.error(error);
//             fs.unlinkSync(path); // Remove the file from the uploads folder
//             reject(error);
//           })
//           .on("finish", () => {
//             fs.unlinkSync(path); // Remove the file from the uploads folder
//             resolve(uploadStream.id); // Save the file's unique ID
//           });
//       });

//       const result = await uploadPromise;
//       uploadResults.push({ fileId: result, filename });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Files uploaded successfully to the database",
//       files: uploadResults,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Upload failed", error });
//   }
// });
