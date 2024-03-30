const mongoose = require("mongoose");

//schema to store data
const itemSchema = new mongoose.Schema({
  customerLogo: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  headlineURL: {
    type: String,
    required: true,
  },
  description_summary: {
    type: String,
    required: true,
  },
  pageURL: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
});

const item = mongoose.model("item", itemSchema);
module.exports = item;
