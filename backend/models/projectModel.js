const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	title: String,
	createdBy: String,
	date: {
		type: Date,
		default: Date.now,
	},
	htmlCode: {
		type: String,
		default: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
	},
	cssCode: {
		type: String,
		default: `* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	width: 100%;
	height: 100%;
}`,
	},
	jsCode: {
		type: String,
		default: `console.log("hello world")`,
	},
});

module.exports = mongoose.model("Project", projectSchema);
