const express = require('express');
const router = express.Router();
const { 
    createComplain, 
    getAllComplains, 
    getComplainReplies, 
    addReplyComment, 
    getComplainByClientId, 
    updateComplainStatus, 
    addComplainComment, 
} = require('../../controllers/customer/complain.controller');
const { uploadComplainFile } = require('../../middleware/upload');
const { authenticate } = require('../../middleware/auth');

// Route to create a new complain
router.post('/create', authenticate, uploadComplainFile, createComplain);

// Route to get all complains
router.get('/get-all', authenticate, getAllComplains);

// Route to get all complain of respected customer 
router.get('/get-all/cuctomer-complain', authenticate, getComplainByClientId);

// Route to update complain status 
router.put('/update-status/:tokenId', updateComplainStatus);

// Route to get replies (and comments) for a specific complain
router.get('/:tokenId/replies', getComplainReplies);

// Route to add a reply message of comment for a specific complain
router.post('/reply/:tokenId/comment', authenticate, addReplyComment);

// Route to add a comment for a specific complain
router.post('/:tokenId/comment', addComplainComment);

module.exports = router;