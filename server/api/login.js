const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("hello login" + `${req}`);
  res.status(201).send();
});

module.exports = router;