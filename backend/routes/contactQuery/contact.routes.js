const express = require("express");
const {
  createContact,
  getAllContact,
  deleteContact,
} = require("../../controllers/contact/contact.controller");

const router = express.Router();

router.post("/create", createContact);
router.get("/get-all", getAllContact);
router.delete("/create/:id", deleteContact);

module.exports = router;
