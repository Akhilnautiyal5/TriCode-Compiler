"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var userModel = require("../models/userModel");
var projectModel = require("../models/projectModel");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var jwtSecretKey = process.env.JWT_SECRET;
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});
router.post("/signup", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, name, email, password, existingUser, salt, hash, user, token;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return userModel.findOne({
            email: email
          });
        case 3:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.json({
            success: false,
            message: "User Already Exists"
          }));
        case 8:
          _context.prev = 8;
          _context.next = 11;
          return bcrypt.genSalt(12);
        case 11:
          salt = _context.sent;
          _context.next = 14;
          return bcrypt.hash(password, salt);
        case 14:
          hash = _context.sent;
          _context.next = 17;
          return userModel.create({
            username: username,
            name: name,
            email: email,
            password: hash
          });
        case 17:
          user = _context.sent;
          token = jwt.sign({
            email: email,
            userId: user._id
          }, jwtSecretKey);
          return _context.abrupt("return", res.json({
            success: true,
            message: "User created successfully",
            token: token,
            userId: user._id
          }));
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](8);
          console.error("Signup error:", _context.t0);
          return _context.abrupt("return", res.json({
            success: false,
            message: "Error creating user"
          }));
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 22]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/login", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, user, result, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return userModel.findOne({
            email: email
          });
        case 3:
          user = _context2.sent;
          if (!user) {
            _context2.next = 23;
            break;
          }
          _context2.prev = 5;
          _context2.next = 8;
          return bcrypt.compare(password, user.password);
        case 8:
          result = _context2.sent;
          if (!result) {
            _context2.next = 14;
            break;
          }
          token = jwt.sign({
            email: email,
            userId: user._id
          }, jwtSecretKey);
          return _context2.abrupt("return", res.json({
            success: true,
            message: "User logged in successfully",
            token: token,
            userId: user._id
          }));
        case 14:
          return _context2.abrupt("return", res.json({
            success: false,
            message: "Invalid email or password"
          }));
        case 15:
          _context2.next = 21;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](5);
          console.error("Login error:", _context2.t0);
          return _context2.abrupt("return", res.json({
            success: false,
            message: "Error during login"
          }));
        case 21:
          _context2.next = 24;
          break;
        case 23:
          return _context2.abrupt("return", res.json({
            success: false,
            message: "Invalid email or password"
          }));
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 17]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/getUserDetails", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.userId;
          _context3.prev = 1;
          _context3.next = 4;
          return userModel.findOne({
            _id: userId
          });
        case 4:
          user = _context3.sent;
          if (!user) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.json({
            success: true,
            message: "User details fetched successfully",
            user: user
          }));
        case 9:
          return _context3.abrupt("return", res.json({
            success: false,
            message: "User not found"
          }));
        case 10:
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          console.error("Get user details error:", _context3.t0);
          return _context3.abrupt("return", res.json({
            success: false,
            message: "Error fetching user details"
          }));
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/createProject", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body3, userId, title, user, project;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, userId = _req$body3.userId, title = _req$body3.title;
          _context4.prev = 1;
          _context4.next = 4;
          return userModel.findOne({
            _id: userId
          });
        case 4:
          user = _context4.sent;
          if (!user) {
            _context4.next = 12;
            break;
          }
          _context4.next = 8;
          return projectModel.create({
            title: title,
            createdBy: userId
          });
        case 8:
          project = _context4.sent;
          return _context4.abrupt("return", res.json({
            success: true,
            message: "Project created successfully",
            projectId: project._id
          }));
        case 12:
          return _context4.abrupt("return", res.json({
            success: false,
            message: "User not found"
          }));
        case 13:
          _context4.next = 19;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](1);
          console.error("Create project error:", _context4.t0);
          return _context4.abrupt("return", res.json({
            success: false,
            message: "Error creating project"
          }));
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 15]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/getProjects", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userId, user, projects;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.body.userId;
          _context5.prev = 1;
          _context5.next = 4;
          return userModel.findById(userId);
        case 4:
          user = _context5.sent;
          if (!user) {
            _context5.next = 12;
            break;
          }
          _context5.next = 8;
          return projectModel.find({
            createdBy: userId
          });
        case 8:
          projects = _context5.sent;
          return _context5.abrupt("return", res.json({
            success: true,
            message: "Projects fetched successfully",
            projects: projects
          }));
        case 12:
          return _context5.abrupt("return", res.json({
            success: false,
            message: "User not found"
          }));
        case 13:
          _context5.next = 19;
          break;
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](1);
          console.error("Get projects error:", _context5.t0);
          return _context5.abrupt("return", res.json({
            success: false,
            message: "Error fetching projects"
          }));
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 15]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.post("/deleteProject", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body4, userId, projectId, user, project;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, userId = _req$body4.userId, projectId = _req$body4.projectId;
          _context6.prev = 1;
          _context6.next = 4;
          return userModel.findById(userId);
        case 4:
          user = _context6.sent;
          if (!user) {
            _context6.next = 16;
            break;
          }
          _context6.next = 8;
          return projectModel.findOneAndDelete({
            _id: projectId,
            createdBy: userId
          });
        case 8:
          project = _context6.sent;
          if (!project) {
            _context6.next = 13;
            break;
          }
          return _context6.abrupt("return", res.json({
            success: true,
            message: "Project deleted successfully"
          }));
        case 13:
          return _context6.abrupt("return", res.json({
            success: false,
            message: "Project not found or not authorized"
          }));
        case 14:
          _context6.next = 17;
          break;
        case 16:
          return _context6.abrupt("return", res.json({
            success: false,
            message: "User not found"
          }));
        case 17:
          _context6.next = 23;
          break;
        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](1);
          console.error("Delete project error:", _context6.t0);
          return _context6.abrupt("return", res.json({
            success: false,
            message: "Error deleting project"
          }));
        case 23:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 19]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.post("/getProjectCode", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body5, userId, projectId, user, project;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body5 = req.body, userId = _req$body5.userId, projectId = _req$body5.projectId;
          _context7.prev = 1;
          _context7.next = 4;
          return userModel.findOne({
            _id: userId
          });
        case 4:
          user = _context7.sent;
          if (!user) {
            _context7.next = 16;
            break;
          }
          _context7.next = 8;
          return projectModel.findOne({
            _id: projectId,
            createdBy: userId
          });
        case 8:
          project = _context7.sent;
          if (!project) {
            _context7.next = 13;
            break;
          }
          return _context7.abrupt("return", res.json({
            success: true,
            message: "Project code fetched successfully",
            project: project
          }));
        case 13:
          return _context7.abrupt("return", res.json({
            success: false,
            message: "Project not found or not authorized"
          }));
        case 14:
          _context7.next = 17;
          break;
        case 16:
          return _context7.abrupt("return", res.json({
            success: false,
            message: "User not found"
          }));
        case 17:
          _context7.next = 23;
          break;
        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](1);
          console.error("Get project code error:", _context7.t0);
          return _context7.abrupt("return", res.json({
            success: false,
            message: "Error fetching project code"
          }));
        case 23:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 19]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.post("/updateProject", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body6, userId, projectId, htmlCode, cssCode, jsCode, user, project;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$body6 = req.body, userId = _req$body6.userId, projectId = _req$body6.projectId, htmlCode = _req$body6.htmlCode, cssCode = _req$body6.cssCode, jsCode = _req$body6.jsCode;
          _context8.prev = 1;
          _context8.next = 4;
          return userModel.findOne({
            _id: userId
          });
        case 4:
          user = _context8.sent;
          if (!user) {
            _context8.next = 14;
            break;
          }
          _context8.next = 8;
          return projectModel.findOneAndUpdate({
            _id: projectId,
            createdBy: userId
          }, {
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode
          }, {
            "new": true
          });
        case 8:
          project = _context8.sent;
          if (project) {
            _context8.next = 11;
            break;
          }
          return _context8.abrupt("return", res.json({
            success: false,
            message: "Project not found or not authorized"
          }));
        case 11:
          return _context8.abrupt("return", res.json({
            success: true,
            message: "Project code updated successfully",
            project: project
          }));
        case 14:
          return _context8.abrupt("return", res.json({
            success: false,
            message: "User not found"
          }));
        case 15:
          _context8.next = 21;
          break;
        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](1);
          console.error("Update project error:", _context8.t0);
          return _context8.abrupt("return", res.json({
            success: false,
            message: "Error updating project"
          }));
        case 21:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 17]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.post("/getProjectDetails", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body7, userId, projectId, user, project;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _req$body7 = req.body, userId = _req$body7.userId, projectId = _req$body7.projectId;
          _context9.prev = 1;
          _context9.next = 4;
          return userModel.findOne({
            _id: userId
          });
        case 4:
          user = _context9.sent;
          if (!user) {
            _context9.next = 16;
            break;
          }
          _context9.next = 8;
          return projectModel.findOne({
            _id: projectId,
            createdBy: userId
          });
        case 8:
          project = _context9.sent;
          if (!project) {
            _context9.next = 13;
            break;
          }
          return _context9.abrupt("return", res.json({
            success: true,
            message: "Project details fetched successfully",
            project: {
              title: project.title
              // Add other project details as needed
            }
          }));
        case 13:
          return _context9.abrupt("return", res.json({
            success: false,
            message: "Project not found or not authorized"
          }));
        case 14:
          _context9.next = 17;
          break;
        case 16:
          return _context9.abrupt("return", res.json({
            success: false,
            message: "User not found"
          }));
        case 17:
          _context9.next = 23;
          break;
        case 19:
          _context9.prev = 19;
          _context9.t0 = _context9["catch"](1);
          console.error("Get project details error:", _context9.t0);
          return _context9.abrupt("return", res.json({
            success: false,
            message: "Error fetching project details"
          }));
        case 23:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 19]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
module.exports = router;