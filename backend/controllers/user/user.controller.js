const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../../models/user_model/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const fs = require("fs");
const path = require("path");

dotenv.config();
const { LINK_URL, LINK_URL1, EMAIL, PASSWORD } = process.env;

// Register a new employee
const registerEmployee = async (req, res) => {
  try {
    const formData = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    // Process file uploads
    formData.signature =
      req.files && req.files.signature
        ? `${baseUrl}${req.files.signature[0].filename}`
        : formData.signature;
    formData.aadhaarFrontImage =
      req.files && req.files.aadhaarFrontImage
        ? `${baseUrl}${req.files.aadhaarFrontImage[0].filename}`
        : formData.aadhaarFrontImage;
    formData.aadhaarBackImage =
      req.files && req.files.aadhaarBackImage
        ? `${baseUrl}${req.files.aadhaarBackImage[0].filename}`
        : formData.aadhaarBackImage;
    formData.panImage =
      req.files && req.files.panImage
        ? `${baseUrl}${req.files.panImage[0].filename}`
        : formData.panImage;

    // Convert role field to lowercase
    if (formData.role) {
      formData.role = formData.role.toLowerCase();
    }
    // Check if user already exists
    let user = await User.findOne({ email: formData.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    user = new User(formData);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Employee details created successfully",
      employee: user
    });
  } catch (error) {
    console.error("Error creating employee details", error);
    res
      .status(500)
      .json({ message: "Failed to create employee details", error });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: "false", message: "User not Found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: "false", message: "Password mismatch" });
    }

    const payload = {
      user: {
        userId: user._id,
        empType: user.empType,
        EmpId: user.EmpId
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    const {
      password: pwd,
      mobile: mob,
      ...userWithoutSensitiveData
    } = user.toObject();

    res.status(200).json({
      success: "true",
      message: "Login successful",
      token,
      role: user.role,
      user: userWithoutSensitiveData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password"); // Exclude password,mobile from the response

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error or User detail retrieval failed");
  }
};
// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);

    if (users) {
      return res.status(200).json({
        users,
        success: true,
        message: "All register user or employee data fetched successfully"
      });
    }
  } catch (error) {
    console.log("Error fetching register users details", error.message);
    res
      .status(500)
      .json({ message: "Failed to get users details", errpr: error.message });
  }
};

// Get all employees with role employee
const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    res
      .status(200)
      .json({ employees, success: true, message: "All employees fetched" });
  } catch (error) {
    console.error("Error fetching employee details", error);
    res
      .status(500)
      .json({ message: "Failed to fetch employee details", error });
  }
};

// Get employee details by ID
// const getEmployeeDetails = async (req, res) => {
//   try {
//     const employeeId = req.params.employeeId;
//     const employee = await User.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     return res.status(200).json({ employee, success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error or employee detail retrieval failed" });
//   }
// };

// Update employee details by ID
const updateEmployeeDetails = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const formData = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

    // Get existing employee data
    const existingEmployee = await User.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Helper function to extract filename from URL
    const getFilenameFromUrl = (url) => {
      if (!url) return null;
      return url.split('/').pop();
    };

    // Helper function to delete file if it exists
    const deleteFile = (filepath) => {
      if (!filepath) return;
      // console.log('deleteFile filepath',filepath);
      if (filepath && fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        // console.log("Deleted file: ", filepath);
      }
    };

    // Handle file updates
    const fileFields = ['signature', 'aadhaarFrontImage', 'aadhaarBackImage', 'panImage'];
    
    fileFields.forEach(field => {
      if (req.files && req.files[field]) {
        // New file uploaded - update the URL and delete old file
        // console.log('Uploading : existingEmployee[field]',existingEmployee[field]);
        const oldFilename = getFilenameFromUrl(existingEmployee[field]);
        // console.log("oldefilename ",oldFilename);
        if (oldFilename) {
          const oldFilePath = path.join(__dirname, "../../uploads", oldFilename);
          // console.log("oldfilepath ", oldFilePath);
          deleteFile(oldFilePath);
        }
        formData[field] = `${baseUrl}${req.files[field][0].filename}`;
        // console.log('new employee[field]',formData[field]);
      } else if (!formData[field]) {
        // No new file uploaded and no URL in formData - keep existing file
        formData[field] = existingEmployee[field];
      }
      // If formData[field] contains a URL but no new file, keep the URL (client sent existing URL)
    });

    // Handle password update
    // if (formData.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   formData.password = await bcrypt.hash(formData.password, salt);
    // } else {
    //   delete formData.password; // Don't update password if not provided
    // }

    // Update nested arrays
    ['familyDetails', 'educationalDetails', 'employmentDetails'].forEach(field => {
      if (formData[field]) {
        // Ensure the field is properly formatted as an array
        try {
          if (typeof formData[field] === 'string') {
            formData[field] = JSON.parse(formData[field]);
          }
        } catch (error) {
          console.error(`Error parsing ${field}:`, error);
        }
      }
    });

    // Update employee record
    const updatedEmployee = await User.findByIdAndUpdate(
      employeeId,
      { $set: formData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Employee details updated successfully",
      success: true,
      employee: updatedEmployee
    });

  } catch (error) {
    console.error("Error updating employee details:", error);
    
    // Handle specific error cases
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    return res.status(500).json({
      message: "Failed to update employee details",
      error: error.message
    });
  }
};

// Utility function to delete file if it exists
const deleteFileIfExists = (fileUrl) => {
  if (!fileUrl) return;
//  console.log("fileUrl",fileUrl);
  try {
    // Extract filename from the full URL
    const filename = fileUrl.split('/').pop();
    // console.log("extracted filename",filename);
    const filePath = path.join(__dirname, "../../uploads", filename);
    // console.log("filePath",filePath);

    // Check if file exists before attempting to delete
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      // console.log(`File deleted successfully: ${filename}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
};

// Delete employee details by ID
const deleteEmployeeDetails = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    
    // First fetch the employee to get file URLs
    const employee = await User.findById(employeeId);
    
    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: "Employee not found" 
      });
    }

    // Delete associated files
    const filesToDelete = [
      employee.signature,
      employee.aadhaarFrontImage,
      employee.aadhaarBackImage,
      employee.panImage
    ];

    // Delete each file from the uploads folder
    filesToDelete.forEach(fileUrl => {
      if (fileUrl) {
        deleteFileIfExists(fileUrl);
      }
    });

    // Delete the employee record from database
    const deletedEmployee = await User.findByIdAndDelete(employeeId);

    return res.status(200).json({
      success: true,
      message: "Employee and associated files deleted successfully",
      deletedEmployee
    });

  } catch (error) {
    console.error("Error deleting employee details:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to delete employee details", 
      error: error.message 
    });
  }
};

// Forgot Password of User by email using nodemailer
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m"
    });

    const resetLink = `${LINK_URL1}/${user._id}/${token}`;
    // const resetLink = `${LINK_URL}/${user._id}/${token}`;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL, // Your email id
        pass: PASSWORD // Your email password
      }
    });

    // Configure Mailgen
    const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "Info Era Software Services Pvt. Ltd",
        link: "https://infoera.in",
        // This will be displayed in the footer of the email
        copyright: `Copyright © ${new Date().getFullYear()} Info Era Software Services Pvt Ltd. All rights reserved.`
      }
    });

    // Generate email content
    const emailContent = mailGenerator.generate({
      body: {
        name: user.name,
        intro: [
          "You have requested to reset your password.",
          "Valid for 15 Minutes only!"
        ],
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#22BC66",
            text: "Reset your password",
            link: resetLink
          }
        },
        outro: "If you did not request this, please ignore this email."
      }
    });

    const mailOptions = {
      from: EMAIL, // Sender address
      to: user.email, // Receiver's email address
      subject: "Password Reset Request", // Email subject
      html: emailContent
    };

    // Send email using nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending forgot password email", error);
        return res
          .status(500)
          .json({ message: "Failed to send password reset email" });
      }
      // console.log("Password reset email sent:", info.response);
      res.status(200).json({
        success: true,
        message: "Password reset email sent successfully"
      });
    });
  } catch (error) {
    console.log("Error processing forgot password request", error);
    res
      .status(500)
      .json({ message: "Failed to process forgot password request" });
  }
};

// Reset password of user
const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { userId, token } = req.params;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken || decodedToken.userId !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token or user ID" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, salt);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hasPassword },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send email to user with the updated password
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: EMAIL, // Your email id
    //     pass: PASSWORD // Your email password
    //   }
    // });
    // // Configure Mailgen
    // const mailGenerator = new Mailgen({
    //   theme: "salted",
    //   product: {
    //     name: "Info Era Software Services Pvt. Ltd",
    //     link: "https://infoera.in",
    //     // This will be displayed in the footer of the email
    //     copyright: `Copyright © ${new Date().getFullYear()} Info Era Software Services Pvt Ltd. All rights reserved.`
    //   }
    // });
    // const emailContent = mailGenerator.generate({
    //   body: {
    //     name: user.name,
    //     intro: "Your password has been successfully reset.",
    //     action: {
    //       instructions: "Your new password is:",
    //       button: {
    //         color: "#22BC66",
    //         text: password
    //       }
    //     },
    //     outro: "Please keep this password confidential."
    //   }
    // });
    // const mailOptions = {
    //   from: EMAIL, // Sender address
    //   to: user.email, // Receiver's email address
    //   subject: "Your Password has been Updated..", // Email subject
    //   html: emailContent
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log("Error sending updated password email", error);
    //     return res
    //       .status(500)
    //       .json({ message: "Failed to send updated password email" });
    //   }
    //   // console.log("Password reset email sent:", info.response);
    //   res.status(200).json({
    //     success: true,
    //     message: "Password reset email sent successfully"
    //   });
    // });
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

module.exports = {
  registerEmployee,
  loginUser,
  getUserById,
  getAllEmployees,
  getAllUsers,
  updateEmployeeDetails,
  deleteEmployeeDetails,
  forgotPassword,
  resetPassword
};




// const fs = require('fs');
// const path = require('path');
// const User = require("../../models/user_model/User");

// // Delete employee details by ID
// const deleteEmployeeDetails = async (req, res) => {
//   try {
//     const employeeId = req.params.employeeId;
    
//     // Find the employee to be deleted
//     const deletedEmployee = await User.findById(employeeId);

//     if (!deletedEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // If employee found, delete their associated files
//     const filesToDelete = [
//       deletedEmployee.signature,
//       deletedEmployee.aadhaarFrontImage,
//       deletedEmployee.aadhaarBackImage,
//       deletedEmployee.panImage,
//     ];

//     // Loop through the files and remove them if they exist
//     filesToDelete.forEach(filePath => {
//       if (filePath) {
//         const fullPath = path.join(__dirname, `../../uploads/${filePath.split('/uploads/')[1]}`);

//         // Check if file exists before attempting to delete
//         if (fs.existsSync(fullPath)) {
//           fs.unlinkSync(fullPath);  // Delete the file
//         }
//       }
//     });

//     // Now, delete the employee record from the database
//     await User.findByIdAndDelete(employeeId);

//     return res.status(200).json({
//       message: "Employee details and files deleted successfully",
//       success: true
//     });
//   } catch (error) {
//     console.error("Error deleting employee details", error);
//     res.status(500).json({ message: "Failed to delete employee details", error });
//   }
// };




// update employee details by ID
// const updateEmployeeDetails = async (req, res) => {
//   try {
//     const employeeId = req.params.employeeId;
//     const formData = req.body;
//     const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;

//     // Fetch the current employee data from the database
//     const currentEmployee = await User.findById(employeeId);
//     if (!currentEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     // Process file uploads if provided in the form data
//     if (req.files) {
//       // Signature file
//       if (req.files.signature) {
//         formData.signature = `${baseUrl}${req.files.signature[0].filename}`;
//         // Delete the old signature file if new one is uploaded
//         if (currentEmployee.signature) {
//           const oldSignaturePath = path.join(__dirname, `../uploads/${currentEmployee.signature.split('/uploads/')[1]}`);
//           fs.unlinkSync(oldSignaturePath); // Remove old file
//         }
//       }

//       // Aadhaar front image
//       if (req.files.aadhaarFrontImage) {
//         formData.aadhaarFrontImage = `${baseUrl}${req.files.aadhaarFrontImage[0].filename}`;
//         if (currentEmployee.aadhaarFrontImage) {
//           const oldAadhaarFrontImagePath = path.join(__dirname, `../uploads/${currentEmployee.aadhaarFrontImage.split('/uploads/')[1]}`);
//           fs.unlinkSync(oldAadhaarFrontImagePath); // Remove old file
//         }
//       }

//       // Aadhaar back image
//       if (req.files.aadhaarBackImage) {
//         formData.aadhaarBackImage = `${baseUrl}${req.files.aadhaarBackImage[0].filename}`;
//         if (currentEmployee.aadhaarBackImage) {
//           const oldAadhaarBackImagePath = path.join(__dirname, `../uploads/${currentEmployee.aadhaarBackImage.split('/uploads/')[1]}`);
//           fs.unlinkSync(oldAadhaarBackImagePath); // Remove old file
//         }
//       }

//       // PAN image
//       if (req.files.panImage) {
//         formData.panImage = `${baseUrl}${req.files.panImage[0].filename}`;
//         if (currentEmployee.panImage) {
//           const oldPanImagePath = path.join(__dirname, `../uploads/${currentEmployee.panImage.split('/uploads/')[1]}`);
//           fs.unlinkSync(oldPanImagePath); // Remove old file
//         }
//       }
//     }

//     // Update other fields if present in the formData
//     const updatedEmployee = await User.findByIdAndUpdate(employeeId, formData, {
//       new: true, // Return the updated document
//     });

//     if (!updatedEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     return res.status(200).json({
//       message: "Employee details updated successfully",
//       success: true,
//       employee: updatedEmployee
//     });
//   } catch (error) {
//     console.error("Error updating employee details", error);
//     res.status(500).json({ message: "Failed to update employee details", error });
//   }
// };
