const express = require("express");
const {
  createQuery,
  getQuery,
  deleteQuery,
} = require("../../controllers/query/query.controller");

const router = express.Router();

router.post("/create", createQuery);
router.get("/get-all", getQuery);
router.delete("/delete/:id", deleteQuery);

module.exports = router;
