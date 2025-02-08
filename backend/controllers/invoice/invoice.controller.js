const Invoice = require("../../models/invoice_model/invoice.model");

// Function to create a new invoice
const createInvoice = async (req, res) => {
  try {
    // const invoiceData = req.body;
    const { customerId, ...invoiceData } = req.body; // Destructure customerId separately
    if (!customerId) {
      return res
        .status(400)
        .json({ message: "Customer ID is required", success: false });
    }

    invoiceData.customerId = customerId; // Set customerId explicitly

    const newInvoice = await Invoice.create(invoiceData);
    res.status(201).json({
      invoiceData: newInvoice,
      message: "Invoice data added in db successfully",
      success: "true",
    });

    // // Fetch the latest invoice to get the highest invoice number
    // const latestInvoice = await Invoice.findOne().sort({ $natural: -1 }).exec();
    // // Determine the next invoice number
    // let count;
    // if (latestInvoice) {
    //     // Extract the number part from the invoiceNo
    //     const lastCount = parseInt(latestInvoice.invoiceNo.split('/')[1], 10);

    //     // Increment count or reset to 1 if parsing fails
    //     count = isNaN(lastCount) ? 1 : lastCount + 1;
    // } else {
    //     count = 1; // Start from 1 if no invoices exist
    // }
    // invoiceData.invoiceNo = `IE/${count}`;

    // Create a new invoice with the incremented invoice number
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error creating an invoice",
      error: error.message,
      success: "false",
    });
  }
};

// Function to update an existing invoice
const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params; // Get invoice ID from URL parameters
    const { customerId, ...invoiceData } = req.body;

    // Validate required fields
    if (!id) {
      return res.status(400).json({ 
        message: "Invoice ID is required", 
        success: false 
      });
    }

    if (!customerId) {
      return res.status(400).json({ 
        message: "Customer ID is required", 
        success: false 
      });
    }

    // Find the invoice and update it
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id, 
      {
        ...invoiceData,
        customerId: customerId
      }, 
      { 
        new: true, // Return the updated document
        runValidators: true // Run model validations on update
      }
    );

    // Check if invoice was found and updated
    if (!updatedInvoice) {
      return res.status(404).json({
        message: "Invoice not found",
        success: false
      });
    }

    // Respond with updated invoice
    res.status(200).json({
      invoiceData: updatedInvoice,
      message: "Invoice updated successfully",
      success: true
    });

  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({
      message: "Error updating invoice",
      error: error.message,
      success: false
    });
  }
};

// Function to get all Invoices
// const getInvoices = async (req, res) => {
//   try {
//     // Fetch all invoices
//     const invoices = await Invoice.find().exec();

//     // Fetch the latest invoice by dynamically sorting based on the numeric part of invoiceNo
//     const latestInvoice = await Invoice.find()
//       .sort((a, b) => {
//         const aNumeric = parseInt(a.invoiceNo.split("/")[1], 10);
//         const bNumeric = parseInt(b.invoiceNo.split("/")[1], 10);
//         return bNumeric - aNumeric; // Descending order
//       })
//       .limit(1);

//     console.log("Latest Invoice:", latestInvoice[0]);

//     // Calculate the next invoice number
//     let count;
//     if (latestInvoice.length > 0) {
//       const latestNumber = parseInt(
//         latestInvoice[0].invoiceNo.split("/")[1],
//         10
//       );
//       count = latestNumber + 1;
//     } else {
//       count = 1; // Start from 1 if no invoices exist
//     }
//     const latestInvoiceNo = `IE/${count}`;
//     console.log("Next Invoice Number:", latestInvoiceNo);

//     // Respond with data
//     res.status(200).json({
//       invoices,
//       latestInvoiceNo,
//       success: true,
//       message:
//         "Fetched all invoices and generated the next invoice number successfully.",
//     });
//   } catch (error) {
//     console.error("Error fetching invoices:", error);
//     res.status(500).json({
//       message: "Error fetching invoices and latest invoice number",
//       error,
//     });
//   }
// };

// Optimized Approach Using Aggregation
// Alternatively, you can achieve this with a MongoDB aggregation pipeline for better performance when dealing with large datasets:
const getInvoices = async (req, res) => {
  try {
    // Fetch all invoices
    const invoices = await Invoice.find().exec();

    // Use aggregation to extract numeric part and sort
    const latestInvoice = await Invoice.aggregate([
      {
        $addFields: {
          numericPart: {
            $toInt: {
              $arrayElemAt: [{ $split: ["$invoiceNo", "/"] }, 1],
            },
          },
        },
      },
      { $sort: { numericPart: -1 } },
      { $limit: 1 },
    ]);

    // console.log("Latest Invoice[0]:", latestInvoice[0]);
    // console.log("Latest Invoice:", latestInvoice);

    // Calculate the next invoice number
    let count;
    if (latestInvoice.length > 0) {
      const latestNumber = latestInvoice[0].numericPart;
      count = latestNumber + 1;
    } else {
      count = 1; // Start from 1 if no invoices exist
    }
    const latestInvoiceNo = `IE/${count}`;
    // console.log("Next Invoice Number:", latestInvoiceNo);

    // Respond with data
    res.status(200).json({
      invoices,
      latestInvoiceNo,
      success: true,
      message:
        "Fetched all invoices and generated the next invoice number successfully.",
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({
      message: "Error fetching invoices and latest invoice number",
      error,
    });
  }
};

// function to get Single invoice by id
const getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not Found" });
    }
    res.status(200).json({ invoice, message: "Fetched single invoice" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching Single Invoice", error });
  }
};

// Function to get all invoices for a specific customer
const getInvoicesByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const invoices = await Invoice.find({ customerId }).exec();
    if (!invoices.length) {
      return res.status(404).json({
        message: "No invoices found for this customer",
        success: false,
      });
    }
    res.status(200).json({
      invoices,
      success: true,
      message: "Fetched all invoices for customer",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching invoices for customer", error });
  }
};

// function to update an invoice by id
// const updateInvoice = async (req, res) => {
//   try {
//     const invoiceId = req.params.id;
//     const invoiceData = req.body;
//     const updatedInvoice = await Invoice.findByIdAndUpdate(
//       invoiceId,
//       invoiceData,
//       { new: true }
//     );

//     if (!updatedInvoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }
//     res
//       .status(200)
//       .json({ updatedInvoice, message: "Invoice updated successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error updating invoice", error });
//   }
// };

module.exports = {
  createInvoice,
  updateInvoice,
  getInvoices,
  getInvoiceById,
  getInvoicesByCustomerId,
  // updateInvoice,
};
