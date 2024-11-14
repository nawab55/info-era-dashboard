const express = require("express");
const router = express.Router();
const consultingController = require("../../controllers/consulting/consulting.controller");

// Route to create a new job
router.post("/create-consulting", consultingController.createConsulting);

// Route to get all jobs
router.get("/get-allconsulting", consultingController.getAllConsulting);

// Route to update a job by ID
router.put("/:id", consultingController.updateConsulting);

module.exports = router;
