const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/add-products", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

router.post("/add-products", (req, res, next) => {
  console.log("body -->", req.body);
  res.redirect("/");
});

module.exports = router;
