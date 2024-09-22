import React, { useState, useEffect } from "react";
import axios from "axios";
import darklogo from "../images/darklogo.svg";
import rightimg from "../images/authPageSide.png";
import { Link } from "react-router-dom";
import { api_base_url } from "../helper";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Signup = () => {
	const [formData, setFormData] = useState({
		username: "",
		name: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			window.location.href = "/";
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const submitForm = async (e) => {
		e.preventDefault();
		setError("");

		if (Object.values(formData).some((field) => field === "")) {
			setError("All fields are required");
			return;
		}

		try {
			const response = await axios.post(`${api_base_url}/signup`, formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const { success, token, userId, message } = response.data;

			if (success) {
				localStorage.setItem("token", token);
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("userId", userId);
				alert("Account created successfully");
				window.location.href = "/";
			} else {
				setError(message || "Signup failed");
			}
		} catch (error) {
			setError("An error occurred. Please try again later.");
			console.error("Signup error:", error);
		}
	};

	return (
		<div className="container relative w-full h-screen flex items-center justify-between gap-10">
			<div className="left pl-[100px] min-w-[35%]">
				<img className="w-52 mt-10 mb-10" src={darklogo} alt="logo" />

				<form onSubmit={submitForm} className="w-full mb-3">
					{["username", "name", "email"].map((field) => (
						<div key={field} className="mb-3 w-full md:w-96">
							<input
								name={field}
								onChange={handleChange}
								value={formData[field]}
								required
								className="bg-zinc-900 rounded-md mb-3 w-full p-3 outline-none"
								type={field === "email" ? "email" : "text"}
								placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
							/>
						</div>
					))}

					<div className="mb-3 w-full md:w-96 relative">
						<input
							name="password"
							onChange={handleChange}
							value={formData.password}
							required
							className="bg-zinc-900 rounded-md w-full p-3 outline-none"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-4 text-gray-500"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<FaEye className="w-5 h-5" />
							) : (
								<FaEyeSlash className="w-5 h-5" />
							)}
						</button>
					</div>

					<p>
						Already have an account?{" "}
						<Link className="text-blue-500" to="/login">
							Login
						</Link>
					</p>

					{error && <p className="text-red-500 text-[14px] my-2">{error}</p>}

					<button
						className="bg-blue-600 mt-5 cursor-pointer active:bg-blue-500 rounded-md w-full md:w-96 h-10 text-center"
						type="submit"
					>
						Signup
					</button>
				</form>
			</div>

			<div className="right w-[65%] mr-3 justify-end">
				<img
					className="h-screen object-cover w-full"
					src={rightimg}
					alt="Right side"
				/>
			</div>
		</div>
	);
};

export default Signup;
