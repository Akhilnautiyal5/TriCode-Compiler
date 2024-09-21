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
mongoose
	.connect(connectionString)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Set up middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const allowedOrigins = ["https://example.com", "https://yourdomain.com"];

app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin, like mobile apps or curl requests
			if (!origin) return callback(null, true);

			// Check if the origin is in the allowedOrigins array
			if (allowedOrigins.indexOf(origin) === -1) {
				return callback(new Error("Not allowed by CORS"));
			}
			return callback(null, true);
		},
		credentials: true, // Allow credentials (cookies, tokens, etc.)
	})
);

// Handle preflight requests
app.options("*", cors()); // Allow preflight for all routes

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Error handling middleware
app.use((req, res, next) => {
	res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		message: err.message,
		error: process.env.NODE_ENV === "development" ? err : {},
	});
});

module.exports = app;
