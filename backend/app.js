const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();
const connectionString = process.env.DB_CONNECTION_STRING;

// Improved MongoDB connection with error handling
mongoose.connect(connectionString)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if unable to connect to the database
});

// Set up middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message,
        error: process.env.NODE_ENV === "development" ? err : {}
    });
});

module.exports = app;
