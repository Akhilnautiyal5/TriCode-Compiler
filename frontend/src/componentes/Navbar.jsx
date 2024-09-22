import React, { useEffect, useState } from "react";
import axios from "axios";
import darklogo from "../images/darklogo.svg";
import lightlogo from "../images/lightlogo.svg";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { toggleClass, api_base_url } from "../helper";
import { BiLogOut } from "react-icons/bi";

const Navbar = ({ toggletheme, isLightMode }) => {
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState("");

	const fetchUserDetails = async () => {
		try {
			const response = await axios.post(
				`${api_base_url}/getUserDetails`,
				{ userId: localStorage.getItem("userId") },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			const { success, user, message } = response.data;
			if (success) {
				setUserData(user);
				setError("");
			} else {
				setError(message);
			}
		} catch (error) {
			setError("Something went wrong");
			console.error("Error fetching user details:", error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("token");
		localStorage.removeItem("isLoggedIn");
		window.location.href = "/";
	};

	useEffect(() => {
		fetchUserDetails();
	}, []);

	return (
		<div
			className={`navbar flex items-center justify-between px-24 h-20 ${
				isLightMode ? "bg-[#f7f7f7] text-black" : "bg-[#141414] text-white"
			}`}
		>
			<div className="logo">
				<img
					className="w-40 cursor-pointer"
					src={isLightMode ? lightlogo : darklogo}
					alt="logo"
				/>
			</div>
			<div className="links flex items-center justify-evenly gap-5">
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/contact">Contact</Link>
				<Link to="/services">Services</Link>
				<Avatar
					onClick={() => toggleClass(".dropdown", "hidden")}
					className="rounded-full cursor-pointer ml-2"
					name={userData?.name || ""}
					size="40"
				/>
			</div>
			<div
				className={`dropdown hidden absolute right-[60px] top-[80px] p-3 w-[160px] h-[150px] rounded shadow-md ${
					isLightMode
						? "bg-[#f7f7f7] shadow-black/50 text-black"
						: "shadow-black/50 bg-[#1a1919] text-white"
				}`}
			>
				<div
					className={`py-[px] border-b-[1px] ${
						isLightMode ? "border-zinc-400" : "border-white"
					}`}
				>
					<h3 className="text-[20px] text-center">{userData?.name || ""}</h3>
				</div>
				<button
					onClick={() => toggletheme(isLightMode)}
					className="flex items-center mt-5 mb-2 cursor-pointer gap-2 w-full"
				>
					<MdLightMode className="text-[20px]" />
					<span>{isLightMode ? "Dark Mode" : "Light Mode"}</span>
				</button>
				<button
					onClick={handleLogout}
					className="flex items-center mt-5 mb-2 cursor-pointer gap-2 text-red-500 hover:text-red-700 w-full"
				>
					<BiLogOut className="text-[20px]" />
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
};

export default Navbar;
