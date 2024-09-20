var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var userModel = require("../models/userModel");
var projectModel = require("../models/projectModel");
var jwt = require("jsonwebtoken");

//require jwt secret key for authentication
require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET;

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

const secret = "secret";

router.post("/signup", async (req, res) => {
	let { username, name, email, password } = req.body;
	let emailcon = await userModel.findOne({ email });
	if (emailcon) {
		return res.json({ success: false, message: "User Already Exist" });
	} else {
		bcrypt.genSalt(12, function (err, salt) {
			bcrypt.hash(password, salt, async (err, hash) => {
				let user = await userModel.create({
					username,
					name,
					email,
					password: hash,
				});
				let token = jwt.sign({ email: email, userId: user._id }, jwtSecretKey);
				return res.json({
					success: true,
					message: "User created successfully",
					token: token,
					userId: user._id,
				});
			});
		});
	}
});

router.post("/login", async (req, res) => {
	let { email, password } = req.body;
	let user = await userModel.findOne({ email });
	if (user) {
		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				let token = jwt.sign({ email: email, userId: user._id }, jwtSecretKey);
				return res.json({
					success: true,
					message: "User logged in successfully",
					token: token,
					userId: user._id,
				});
			} else {
				return res.json({
					success: false,
					message: "Invalid email or password",
				});
			}
		});
	} else {
		return res.json({ success: false, message: "Invalid email or password" });
	}
});

router.post("/getUserDetails", async (req, res) => {
	let { userId } = req.body;
	let user = await userModel.findOne({ _id: userId });
	if (user) {
		return res.json({
			success: true,
			message: "User details fetched successfully",
			user: user,
		});
	} else {
		return res.json({ success: false, message: "User not found" });
	}
});

router.post("/createProject", async (req, res) => {
	let { userId, title } = req.body;
	let user = await userModel.findOne({ _id: userId });
	if (user) {
		let project = await projectModel.create({ title, createdBy: userId });
		return res.json({
			success: true,
			message: "Project created successfully",
			projectId: project._id,
		});
	} else {
		return res.json({ success: false, message: "User not found" });
	}
});

router.post("/getProjects", async (req, res) => {
	let { userId } = req.body;
	let user = await userModel.findById(userId);
	if (user) {
		let projects = await projectModel.find({ createdBy: userId });
		return res.json({
			success: true,
			messages: "projects fetched successfully",
			projects,
		});
	} else {
		return res.json({ success: false, message: "User not found" });
	}
});

router.post("/deleteProject", async (req, res) => {
	let { userId, projectId } = req.body;
	let user = await userModel.findById(userId);
	if (user) {
		let project = await projectModel.findByIdAndDelete({ _id: projectId });
		return res.json({ success: true, message: "Project deleted successfully" });
	} else {
		return res.json({ success: false, message: "Project not found" });
	}
});

router.post("/getProjectCode", async (req, res) => {
	let { userId, projectId } = req.body;
	let user = await userModel.findOne({ _id: userId });
	if (user) {
		let project = await projectModel.findOne({ _id: projectId });
		return res.json({
			success: true,
			message: "project code fetched successfully",
			project: project,
		});
	} else {
		res.json({ success: false, message: "User not found" });
	}
});

router.post("/updateProject", async (req, res) => {
	let { userId, projectId, htmlCode, cssCode, jsCode } = req.body;
	let user = await userModel.findOne({ _id: userId });
	if (user) {
		const project = await projectModel.findOneAndUpdate(
			{ _id: projectId },
			{ htmlCode, cssCode, jsCode },
			{ new: true }
		);

		if (!project) {
			return res.json({ success: false, message: "Project not found" });
		}

		return res.json({
			success: true,
			message: "Project code updated successfully",
			project,
		});
	} else {
		res.json({ success: false, message: "User not found" });
	}
});



module.exports = router;
