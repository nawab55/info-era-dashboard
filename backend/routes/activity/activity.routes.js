const express = require('express');
const router = express.Router();
const { createActivity, getAllActivities, updateActivity, deleteActivity } = require('../../controllers/activity/activity.controller');
const { uploadSingleImage } = require('../../middleware/upload');

// Route to handle creating a new activity with image upload
router.post('/add-activity', uploadSingleImage ,createActivity);

// Route to get all activities
router.get('/get-all-activities', getAllActivities);

// Route to handle updating an activity with optional image upload
router.put('/update-activity/:id', uploadSingleImage, updateActivity);

// Route to handle deleting an activity
router.delete('/delete-activity/:id', deleteActivity);

module.exports = router;
