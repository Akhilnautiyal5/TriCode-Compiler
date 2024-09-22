var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var userModel = require("../models/userModel");
var projectModel = require("../models/projectModel");
var jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET;

router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/signup", async (req, res) => {
	let { username, name, email, password } = req.body;
	let existingUser = await userModel.findOne({ email });
	if (existingUser) {
		return res.json({ success: false, message: "User Already Exists" });
	} else {
		try {
			const salt = await bcrypt.genSalt(12);
			const hash = await bcrypt.hash(password, salt);
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
		} catch (error) {
			console.error("Signup error:", error);
			return res.json({ success: false, message: "Error creating user" });
		}
	}
});

router.post("/login", async (req, res) => {
	let { email, password } = req.body;
	let user = await userModel.findOne({ email });
	if (user) {
		try {
			const result = await bcrypt.compare(password, user.password);
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
		} catch (error) {
			console.error("Login error:", error);
			return res.json({ success: false, message: "Error during login" });
		}
	} else {
		return res.json({ success: false, message: "Invalid email or password" });
	}
});

router.post("/getUserDetails", async (req, res) => {
	let { userId } = req.body;
	try {
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
	} catch (error) {
		console.error("Get user details error:", error);
		return res.json({ success: false, message: "Error fetching user details" });
	}
});

router.post("/createProject", async (req, res) => {
	let { userId, title } = req.body;
	try {
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
	} catch (error) {
		console.error("Create project error:", error);
		return res.json({ success: false, message: "Error creating project" });
	}
});

router.post("/getProjects", async (req, res) => {
	let { userId } = req.body;
	try {
		let user = await userModel.findById(userId);
		if (user) {
			let projects = await projectModel.find({ createdBy: userId });
			return res.json({
				success: true,
				message: "Projects fetched successfully",
				projects,
			});
		} else {
			return res.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Get projects error:", error);
		return res.json({ success: false, message: "Error fetching projects" });
	}
});

router.post("/deleteProject", async (req, res) => {
	let { userId, projectId } = req.body;
	try {
		let user = await userModel.findById(userId);
		if (user) {
			let project = await projectModel.findOneAndDelete({
				_id: projectId,
				createdBy: userId,
			});
			if (project) {
				return res.json({
					success: true,
					message: "Project deleted successfully",
				});
			} else {
				return res.json({
					success: false,
					message: "Project not found or not authorized",
				});
			}
		} else {
			return res.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Delete project error:", error);
		return res.json({ success: false, message: "Error deleting project" });
	}
});

router.post("/getProjectCode", async (req, res) => {
	let { userId, projectId } = req.body;
	try {
		let user = await userModel.findOne({ _id: userId });
		if (user) {
			let project = await projectModel.findOne({
				_id: projectId,
				createdBy: userId,
			});
			if (project) {
				return res.json({
					success: true,
					message: "Project code fetched successfully",
					project: project,
				});
			} else {
				return res.json({
					success: false,
					message: "Project not found or not authorized",
				});
			}
		} else {
			return res.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Get project code error:", error);
		return res.json({ success: false, message: "Error fetching project code" });
	}
});

router.post("/updateProject", async (req, res) => {
	let { userId, projectId, htmlCode, cssCode, jsCode } = req.body;
	try {
		let user = await userModel.findOne({ _id: userId });
		if (user) {
			const project = await projectModel.findOneAndUpdate(
				{ _id: projectId, createdBy: userId },
				{ htmlCode, cssCode, jsCode },
				{ new: true }
			);

			if (!project) {
				return res.json({
					success: false,
					message: "Project not found or not authorized",
				});
			}

			return res.json({
				success: true,
				message: "Project code updated successfully",
				project,
			});
		} else {
			return res.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Update project error:", error);
		return res.json({ success: false, message: "Error updating project" });
	}
});

router.post("/getProjectDetails", async (req, res) => {
	let { userId, projectId } = req.body;
	try {
		let user = await userModel.findOne({ _id: userId });
		if (user) {
			let project = await projectModel.findOne({
				_id: projectId,
				createdBy: userId,
			});
			if (project) {
				return res.json({
					success: true,
					message: "Project details fetched successfully",
					project: {
						title: project.title,
						// Add other project details as needed
					},
				});
			} else {
				return res.json({
					success: false,
					message: "Project not found or not authorized",
				});
			}
		} else {
			return res.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Get project details error:", error);
		return res.json({
			success: false,
			message: "Error fetching project details",
		});
	}
});

module.exports = router;
