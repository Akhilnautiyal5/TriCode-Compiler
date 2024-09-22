"use strict";

var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");
var morgan = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mongoose = require("mongoose");
var app = express();
require("dotenv").config();
var connectionString = process.env.DB_CONNECTION_STRING;

// Improved MongoDB connection with error handling
mongoose.connect(connectionString).then(function () {
  return console.log("Connected to MongoDB");
})["catch"](function (err) {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit the process if unable to connect to the database
});

// Set up middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, "public")));

// Configure CORS with options
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 Error handling middleware
app.use(function (req, res, next) {
  var error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});
module.exports = app;