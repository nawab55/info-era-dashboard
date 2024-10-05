const express = require('express');
const router = express.Router();
const { createComplain, getAllComplains, getComplainReplies, addReplyComment, getComplainByClientId, updateComplainStatusAndReply, } = require('../../controllers/customer/complain.controller');
const { uploadComplainFile } = require('../../middleware/upload');
const { authenticate } = require('../../middleware/auth');

// Route to create a new complain
router.post('/create', authenticate, uploadComplainFile, createComplain);

// Route to get all complains
router.get('/get-all', getAllComplains);

// Route to get all complain of respected customer 
router.get('/get-all/cuctomer-complain', authenticate, getComplainByClientId);

// Route to update complain status 
router.put('/update-status/:tokenId', updateComplainStatus);

// Route to get replies for a specific complain
router.get('/:tokenId/replies', authenticate, getComplainReplies);

// Route to add a reply of comment for a specific complain
router.post('/reply/:tokenId/comment', addReplyComment);

module.exports = router;

// const res = await api.post(`/api/complains/reply/${complain.tokenId}/comment`, {
//     status,
//     replyMessage: reply,
//   }, {
//     headers: {
//       Authorization: `Bearer ${sessionStorage.getItem('token')}`
//     }
//   });
//   // update status in complain request
//   await api.put(`/api/complains/update-status/${complain.tokenId}`,
//     status,
//   )
//   toast.success(res.data.message);
