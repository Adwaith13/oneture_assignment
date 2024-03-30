const express = require("express");
const items = require("../models/item");

const router = express.Router();

//filter to fetch data by location
router.get("/location", async (req, res) => {
  try {
    const { location } = req.query;
    const findItemByLocation = await items.find({ location: location });
    if (!findItemByLocation || findItemByLocation.length == 0) {
      return res.status(404).json({
        status: "Failed",
        message: `Item not found for ${location}`,
      });
    }
    return res.status(200).json({
      status: "success",
      data: findItemByLocation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

//filter to fetch data by industry
router.get("/industry", async (req, res) => {
  try {
    const { industry } = req.query;
    const findItemByIndustry = await items.find({ industry: industry });
    if (!findItemByIndustry) {
      return res.status(404).json({
        status: "Failed",
        message: `Item not found for ${industry} industry`,
      });
    }
    return res.status(200).json({
      status: "success",
      data: findItemByIndustry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

//search feature
router.get("/search", async (req, res) => {
  try {
    const { searchQuery } = req.query;
    if (!searchQuery) {
      return res.status(400).json({
        status: "Failed",
        message: "Search query is required",
      });
    }

    const searchResults = await items.find({
      $or: [
        { customerName: { $regex: searchQuery, $options: "i" } },
        { descriptionSummary: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if (searchResults.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No matching items found",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: searchResults,
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
