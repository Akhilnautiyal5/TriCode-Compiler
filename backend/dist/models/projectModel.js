"use strict";

var mongoose = require("mongoose");
var projectSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  date: {
    type: Date,
    "default": Date.now
  },
  htmlCode: {
    type: String,
    "default": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>"
  },
  cssCode: {
    type: String,
    "default": "* {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n}\n\nbody {\n\twidth: 100%;\n\theight: 100%;\n}"
  },
  jsCode: {
    type: String,
    "default": "console.log(\"hello world\")"
  }
});
module.exports = mongoose.model("Project", projectSchema);