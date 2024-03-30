//importing all necessary libraries
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const fetchItems = require("./routes/fetchItems");
const itemActions = require("./routes/itemActions");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connection fro database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server running",
  });
});

//routes
app.use("/", fetchItems);
app.use("/", itemActions);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
