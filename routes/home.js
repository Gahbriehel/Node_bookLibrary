const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res
    .json({
      message: "Welcome to the Book Library",
      status: "Success",
    })
    .status(200);
});

module.exports = router;
