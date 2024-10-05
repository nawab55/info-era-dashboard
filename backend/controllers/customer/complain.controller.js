const Complain = require('../../models/customer_model/complain.model');
const Reply = require('../../models/customer_model/reply.model');
const Customer = require('../../models/customer_model/customer.model');
const path = require('path');

// Create a new complain
const createComplain = async (req, res) => {
  const customerId = req.customer._id;   // Retrieve customer ID from the token
  try {
    const { tokenId, complainTitle, description } = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    const complainFile = req.file ? `${baseUrl}${req.file.filename}` : null;

    // Fetch customer information by _id // Ensure the customer exists
    const customer = await Customer.findById(customerId);
    // console.log(customer.name);
    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }

    // Create a new complain with the provided data
    const newComplain = new Complain({
      clientId: customer._id,
      clientName: customer.name,
      tokenId,
      complainTitle,
      description,
      complainFile,
    });

    await newComplain.save();
    res.status(201).json({ success: true, message: 'Complain created successfully', complain: newComplain });
  } catch (error) {
    console.error('Error creating complain', error);
    res.status(500).json({ message: 'Failed to create complain', error });
  }
};

// Get all complain of customer by customer Id
const getComplainByClientId = async (req, res) => {
  try {
    const customerId = req.customer._id;   // Retrieve customer ID from the token
    // console.log(customerId);
    const complains = await Complain.find({clientId: customerId});
    // console.log(complains);
    
    res.status(200).json({success: true, complains });
  } catch (error) {
    console.error('Error fetching complains of respected customer', error);
    res.status(500).json({ message: 'Failed to fetch complains of customer', error }); 
  }
}

// Get all complains
const getAllComplains = async (req, res) => {
  try {
    const complains = await Complain.find({});
    res.status(200).json({ success: true, complains });
  } catch (error) {
    console.error('Error fetching complains', error);
    res.status(500).json({ message: 'Failed to fetch complains', error });
  }
};

// Update Complain Status and Add Reply
const updateComplainStatusAndReply = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { status, replyMessage } = req.body;

    // Find the complain by tokenId
    const complain = await Complain.findOne({ tokenId });
    if (!complain) {
      return res.status(404).json({ success: false, message: 'Complain not found' });
    }

    // Update the complain status
    complain.status = status || complain.status;
    await complain.save();

    // Add a reply if provided
    if (replyMessage) {
      const newReply = new Reply({
        tokenId: complain.tokenId,
        message: replyMessage,
      });
      await newReply.save();
    }

    res.status(200).json({ success: true, message: 'Complain updated successfully', complain });
  } catch (error) {
    console.error('Error updating complain', error);
    res.status(500).json({ message: 'Failed to update complain', error });
  }
};

// Get replies for a specific complain
const getComplainReplies = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const replies = await Reply.find({ tokenId }).sort({ createdAt: 'asc' });

    if (!replies.length) {
      return res.status(404).json({ success: false, message: 'No replies found for this complain.' });
    }

    res.status(200).json({ success: true, replies });
  } catch (error) {
    console.error('Error fetching replies', error);
    res.status(500).json({ message: 'Failed to fetch replies', error });
  }
};

// Add a reply of comment for a specific complain
const addReplyComment = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { status, replyMessage } = req.body;
    //     status,
//     replyMessage: reply,

    if (!replyMessage) {
      return res.status(400).json({ success: false, message: 'Comment cannot be empty.' });
    }

    const newReply = new Reply({
      tokenId,
      message: comment,
    });

    await newReply.save();
    res.status(201).json({ success: true, message: 'Comment added successfully', reply: newReply });
  } catch (error) {
    console.error('Error adding comment', error);
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

// Export controller functions
module.exports = {
  createComplain,
  getAllComplains,
  getComplainByClientId,
  updateComplainStatusAndReply,
  getComplainReplies,
  addReplyComment,
};
