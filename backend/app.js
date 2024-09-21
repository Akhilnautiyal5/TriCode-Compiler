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

app.use(
	cors({
		origin: "https://tri-code-compiler.vercel.app", // This is where Access-Control-Allow-Origin is set globally
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // This is Access-Control-Allow-Methods
		credentials: true, // This sets Access-Control-Allow-Credentials
		allowedHeaders: [
			"Origin",
			"X-Requested-With",
			"Content-Type",
			"Accept",
			"Authorization",
		], // This is Access-Control-Allow-Headers
	})
);

app.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Origin",
		"https://tri-code-compiler.vercel.app"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

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
