const express = require("express");

const router = express.Router();
const controller = require("./controller");

router.get("/:urlId");
router.post("/");

module.exports = router;
