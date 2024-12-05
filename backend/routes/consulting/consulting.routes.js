const express = require("express");
const router = express.Router();
const consultingController = require("../../controllers/consulting/consulting.controller");

// Route to create a new consulting
router.post("/create-consulting", consultingController.createConsulting);

// Route to get all consulting
router.get("/get-allconsulting", consultingController.getAllConsulting);

// Route to update a consulting by ID
router.put("/:id", consultingController.updateConsulting);

//Route to delete consulting by ID
router.delete("/:id", consultingController.deleteConsulting);

module.exports = router;
