import React, { useState, useEffect } from "react";
import "./App.css";
import "lenis/dist/lenis.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Editor from "./pages/Editor";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => 
		localStorage.getItem("isLoggedIn") === "true"
	);

	useEffect(() => {
		const checkLoginStatus = () => {
			const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
			setIsLoggedIn(loggedInStatus);
		};

		// Initial check
		checkLoginStatus();

		// Use the 'storage' event to listen for changes in localStorage
		const handleStorageChange = (e) => {
			if (e.key === "isLoggedIn") {
				checkLoginStatus();
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
				/>
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/editor/:projectId"
					element={isLoggedIn ? <Editor /> : <Navigate to="/login" />}
				/>
				<Route path="*" element={<Nopage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
