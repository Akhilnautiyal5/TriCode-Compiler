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
  const [isLoggedIn, setIsLoggedIn] = useState(
		localStorage.getItem("isLoggedIn") === "true" // Ensuring it's a boolean
	);

  useEffect(() => {
		const checkLoginStatus = () => {
			// Again, make sure to convert the value to a boolean
			const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
			setIsLoggedIn(loggedInStatus); // Update state when the login status changes
		};

		// Listen for changes to localStorage (useful for when login status changes in other tabs)
		window.addEventListener("storage", checkLoginStatus);

		return () => {
			window.removeEventListener("storage", checkLoginStatus);
		};
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						// element={<Home/>}
					element = {isLoggedIn ? <Home /> : <Navigate to="/login" />}
					/>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/editor/:projectId"
						element={isLoggedIn ? <Editor /> : <Navigate to="/login" />}
						// element={<Editor />}
					/>
					<Route path="*" element={<Nopage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
