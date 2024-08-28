const express = require("express");
const router = express.Router();
const bbcController = require("../../controllers/co-partners/bbc.controller");

router.post("/register", bbcController.registerBBC);
router.get("/all", bbcController.getAllBBC);
router.delete("/delete/:id", bbcController.deleteBBC);

module.exports = router;
