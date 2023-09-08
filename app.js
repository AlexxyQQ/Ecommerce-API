const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// To use .env file
require("dotenv").config();

const userRoutes = require("./routes/userRoute");

const app = express(); // create express app
app.use(cors({ origin: true }));

// Connect to database
mongoose
  .connect(process.env.PRO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log(err));

// Body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));

// Dev logging middleware
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
module.exports = app; // export app

// Routes
app.use("/api/users", userRoutes);
