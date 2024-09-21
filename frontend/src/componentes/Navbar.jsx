import React, { useEffect, useState } from "react";
import darklogo from "../images/darklogo.svg";
import lightlogo from "../images/lightlogo.svg";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { toggleClass, api_base_url } from "../helper";
import { BiLogOut } from "react-icons/bi";

const Navbar = ({ toggletheme, isLightMode }) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const fetchUserDetails = async () => {
		try {
			const response = await fetch(api_base_url + "/getUserDetails", {
				mode: "cors",
				method: "POST",
				headers: {
					'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				body: JSON.stringify({
					userId: localStorage.getItem("userId"),
				}),
			});
			const data = await response.json();
			if (data.success) {
				setData(data.user);
				setError("");
			} else {
				setError(data.message);
			}
		} catch (error) {
			setError("Something went wrong");
		}
	};

	const handleLogout = async () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
		localStorage.removeItem("isLoggedIn");
		setTimeout(() => {
			window.location.href = "/";
		}, 200);
    };

	useEffect(() => {
		fetchUserDetails();
	}, []);

	return (
		<>
			<div
				className={`navbar flex items-center justify-between px-24 h-20 ${
					isLightMode ? `bg-[#f7f7f7] text-black` : `bg-[#141414] text-white`
				}`}
			>
				<div className="logo">
					<img
						className="w-40 cursor-pointer"
						src={isLightMode ? lightlogo : darklogo}
						alt="logo image"
					/>
				</div>
				<div className="links flex items-center justify-evenly gap-5">
					<Link>Home</Link>
					<Link>About</Link>
					<Link>Contact</Link>
					<Link>Services</Link>
					<Avatar
						onClick={() => {
							toggleClass(".dropdown", "hidden");
						}}
						className="rounded-full cursor-pointer ml-2"
						name={data ? data.name : ""}
						size="40"
					/>
				</div>
				<div
					className={`dropdown hidden absolute right-[60px] top-[80px] p-3 w-[160px] h-[150px] rounded shadow-md  ${
						isLightMode
							? `bg-[#f7f7f7] shadow-black/50 text-black`
							: `shadow-black/50 bg-[#1a1919] text-white`
					}`}
				>
					<div
						className={`py-[px] border-b-[1px] ${
							isLightMode ? `border-zinc-400` : `border-white `
						}`}
					>
						<h3 className="text-[20px] text-center">{data?data.name:""}</h3>
					</div>
					<i
						onClick={() => toggletheme(isLightMode)}
						className="flex items-center mt-5 mb-2 cursor-pointer gap-2"
						style={{ fontStyle: "normal" }}
					>
						<MdLightMode className="text-[20px]" />
						{isLightMode ? <p>Dark Mode</p> : <p>Light Mode</p>}
					</i>
					<p
						onClick={handleLogout}
						className="flex items-center mt-5 mb-2 cursor-pointer gap-2 text-red-500 hover:text-red-700"
						style={{ fontStyle: "normal" }}
					>
						<BiLogOut className="text-[20px]" />
						<p>Logout</p>
					</p>
				</div>
			</div>
		</>
	);
};

export default Navbar;
