const path = require("path");
const router = require("express").Router();

// All  routes respond with index.html
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
