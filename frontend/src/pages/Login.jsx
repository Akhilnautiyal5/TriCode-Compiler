import React, { useState, useEffect } from "react";
import axios from "axios";
import darklogo from "../images/darklogo.svg";
import rightimg from "../images/authPageSide.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { api_base_url } from "../helper";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const response = await axios.post(
				`${api_base_url}/login`,
				{ email, password },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const { success, token, userId, message } = response.data;
			if (success) {
				localStorage.setItem("token", token);
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("userId", userId);
				window.location.href = "/";
			} else {
				setError(message || "Login failed. Please try again.");
			}
		} catch (err) {
			if (err.code === 'ERR_NETWORK') {
				setError("Unable to connect to the server. Please check your internet connection and try again.");
			} else {
				setError("An error occurred while logging in. Please try again later.");
			}
			console.error("Login error:", err);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			window.location.href = "/";
		}
	}, []);

	return (
		<div className="container relative w-full h-screen flex items-center justify-between gap-10">
			<div className="left pl-[100px] min-w-[35%]">
				<img className="w-52 mt-10 mb-10" src={darklogo} alt="logo" />
				<form onSubmit={handleSubmit} className="w-full mb-3">
					<div className="mb-3 w-full md:w-96">
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className="bg-zinc-900 rounded-md mb-3 w-full p-3 outline-none"
							type="email"
							placeholder="Email"
						/>
					</div>
					<div className="relative mb-3 w-full md:w-96">
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="bg-zinc-900 rounded-md w-full p-3 outline-none"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="flex absolute top-4 right-3 items-center px-3 text-gray-500"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
						</button>
					</div>
					<p>
						Don't have an account?{" "}
						<Link className="text-blue-500" to="/signup">
							Create account
						</Link>
					</p>
					{error && <p className="text-red-500 text-[14px] my-2">{error}</p>}
					<button
						className="bg-blue-600 mt-5 cursor-pointer active:bg-blue-500 rounded-md w-full md:w-96 h-10 text-center"
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
			<div className="right w-[65%] pr-3 justify-end md:h-fit md:w-fit">
				<img
					className="h-screen object-cover w-full"
					src={rightimg}
					alt="Right side"
				/>
			</div>
		</div>
	);
};

export default Login;
