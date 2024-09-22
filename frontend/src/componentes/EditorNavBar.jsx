import React, { useState, useEffect } from "react";
import axios from "axios";
import darklogo from "../images/darklogo.svg";
import lightlogo from "../images/lightlogo.svg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { RiSave3Line } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { api_base_url } from "../helper";

const EditorNavBar = ({
	toggleTheme,
	isLightMode,
	render,
	save,
	downloadFiles,
}) => {
	const { projectId } = useParams();
	const [projectTitle, setProjectTitle] = useState("My First Project");

	useEffect(() => {
		const fetchProjectTitle = async () => {
			try {
				const response = await axios.post(`${api_base_url}/getProjectDetails`, {
					userId: localStorage.getItem("userId"),
					projectId: projectId,
				});
				if (response.data.success) {
					setProjectTitle(response.data.project.title);
				}
			} catch (error) {
				console.error("Error fetching project title:", error);
			}
		};

		fetchProjectTitle();
	}, [projectId]);

	const handleSave = async () => {
		try {
			const result = await save();
			if (result) {
				alert("Code saved successfully.");
			}
		} catch (error) {
			console.error("Error saving code:", error);
			alert("Failed to save code. Please try again.");
		}
	};

	return (
		<div
			className={`EditorNavBar flex items-center justify-between pl-10 pr-48 h-20 shadow-md ${
				isLightMode ? `bg-[#f7f7f7] text-black` : `bg-[#141414] text-white`
			}`}
		>
			<Link
				to="/"
				className="p-2 bg-blue-600 rounded-md w-[75px] h-10 flex justify-center items-center active:bg-blue-400 cursor-pointer"
			>
				<FaArrowLeftLong className="w-6 h-5" />
			</Link>
			<div className="logo">
				<img
					className="w-40 cursor-pointer"
					src={isLightMode ? lightlogo : darklogo}
					alt="logo"
				/>
			</div>
			<p>
				File /<span className="text-[grey]">{projectTitle}</span>
			</p>
			<div className="flex items-center justify-between gap-5">
				<button
					onClick={handleSave}
					className="p-2 bg-blue-600 rounded-md w-fit px-3 font-semibold flex items-center justify-center gap-2 active:bg-blue-400 cursor-pointer text-white"
				>
					Save
					<RiSave3Line />
				</button>
				<button
					onClick={render}
					className="p-2 bg-blue-600 rounded-md w-fit px-3 font-semibold flex items-center justify-center gap-2 active:bg-blue-400 cursor-pointer text-white"
				>
					Run
					<FaPlay />
				</button>
				<button
					onClick={downloadFiles}
					className={`p-2 ${
						isLightMode ? `bg-white text-black` : `bg-black text-white`
					} rounded-md text-xl cursor-pointer ${
						isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
					}`}
				>
					<FiDownload />
				</button>
				<button
					onClick={toggleTheme}
					className={`p-2 ${
						isLightMode ? `bg-white text-black` : `bg-black text-white`
					} rounded-md text-xl cursor-pointer ${
						isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
					}`}
				>
					<MdLightMode className="text-[20px]" />
				</button>
			</div>
		</div>
	);
};

export default EditorNavBar;
