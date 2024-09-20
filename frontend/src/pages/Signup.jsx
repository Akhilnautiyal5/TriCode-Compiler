import React, { useState } from "react";
import darklogo from "../images/darklogo.svg";
import rightimg from "../images/authPageSide.png";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Signup = () => {
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const submitform = async (e) => {
		e.preventDefault();
		setError(""); // Reset error on form submit

		// Validate if all fields are filled
		if (!username || !name || !email || !password) {
			setError("All fields are required");
			return;
		}

		try {
			const response = await fetch(api_base_url + "/signup", {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					name,
					email,
					password,
				}),
			});

			const data = await response.json();

			if (data.success) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("isLoggedIn", true);
				localStorage.setItem("userId", data.userId);
				alert("Account created successfully");
				navigate("/");
			} else {
				setError(data.message || "Signup failed");
			}
		} catch (error) {
			setError("An error occurred. Please try again later.");
		}
	};

	return (
		<div className="container relative w-full h-screen flex items-center justify-between gap-10">
			<div className="left pl-[100px] min-w-[35%]">
				<img className="w-52 mt-10 mb-10" src={darklogo} alt="logo image" />

				<form onSubmit={submitform} method="POST" className="w-full mb-3">
					<div className="mb-3 w-full md:w-96">
						<input
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							required
							className="bg-zinc-900 rounded-md mb-3 w-full p-3 outline-none"
							type="text"
							placeholder="Username"
						/>
					</div>

					<div className="mb-3 w-full md:w-96">
						<input
							onChange={(e) => setName(e.target.value)}
							value={name}
							required
							className="bg-zinc-900 rounded-md mb-3 w-full p-3 outline-none"
							type="text"
							placeholder="Name"
						/>
					</div>

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

					<div className="mb-3 w-full md:w-96 relative">
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
							className="absolute right-3 top-4 text-gray-500"
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
							login
						</Link>
					</p>

					{/* Display Error Message */}
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
					className="h-screen object-cover w-[100%]"
					src={rightimg}
					alt="Right side image"
				/>
			</div>
		</div>
	);
};

export default Signup;
