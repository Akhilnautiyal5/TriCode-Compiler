import React, { useState } from "react";
import darklogo from "../images/darklogo.svg";
import rightimg from "../images/authPageSide.png";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";

const Login = () => {
	const [username, setUsername] = useState("");
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const submitform = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(api_base_url + "/login", {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const data = await response.json();
			if (data.success) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("userId", data.userId);
				setError("");
				window.location.href = "/";
				// setTimeout(() => { 
				// }, 50)
			} else {
				setError(data.message);
			}
		} catch (err) {
			setError("An error occurred while logging in. Please try again later.");
		}
	};

	return (
		<>
			<div className="container relative w-full h-screen flex items-center justify-between gap-10">
				<div className="left pl-[100px] min-w-[35%]">
					<img className="w-52 mt-10 mb-10" src={darklogo} alt="logo image" />
					<form onSubmit={submitform} className="w-full mb-3" action="">
						<div className=" mb-3 w-full md:w-96">
						<input
							onChange={(e) => setemail(e.target.value)}
							value={email}
							required
							className="bg-zinc-900 rounded-md mb-3 w-full p-3 outline-none"
							type="email" // Changed to email type for better validation
							placeholder="Email"
						/>
						</div>
						<div className="mb-3 w-full md:w-96">
							<input
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								required
								className="bg-zinc-900 rounded-md w-full p-3 outline-none"
								type={showPassword ? "text" : "password"} // Toggle input type based on state
								placeholder="Password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
								className="flex items-center px-3 text-gray-500"
							>
								{showPassword ? (
									<span role="img" aria-label="hide">
										🙈
									</span>
								) : (
									<span role="img" aria-label="show">
										👁️
									</span>
								)}
							</button>
						</div>
						<p>
							Don't have an account?{" "}
							<Link className="text-blue-500" to="/signup">
								{" "}
								Create account
							</Link>
						</p>
						<p className="text-red-500 text-[14px] my-2">{error}</p>
						<button
							className="bg-blue-600 mt-5 cursor-pointer active:bg-blue-500 rounded-md w-full md:w-96 h-10 text-center"
							type="submit"
						>
							Login
						</button>
					</form>
				</div>
				<div className="right w-[65%] pr-3 justify-end md:{h-fit w-fit}">
					<img
						className="h-screen object-cover w-[100%]"
						src={rightimg}
						alt="Right side image"
					/>
				</div>
			</div>
		</>
	);
};

export default Login;
