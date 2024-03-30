const express = require("express");
const items = require("../models/item");

const router = express.Router();

//fetching all the data
router.get("/items", async (req, res) => {
  try {
    const itemsData = await items.find();
    if (!itemsData) {
      return res.status(404).json({
        status: "Failed",
        message: "No data available",
      });
    }
    return res.status(200).json({
      status: "Success",
      data: itemsData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
