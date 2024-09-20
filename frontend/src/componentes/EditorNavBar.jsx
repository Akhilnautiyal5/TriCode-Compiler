import React, { useState } from "react";
import darklogo from "../images/darklogo.svg";
import lightlogo from "../images/lightlogo.svg";

import { FiDownload } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { RiSave3Line } from "react-icons/ri";

const EditorNavBar = ({ toggletheme, isLightMode, render, save, downloadFiles }) => {



	return (
		<>
			<div
				className={`EditorNavBar flex items-center justify-between px-24 h-20 shadow-md  ${
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
				<p>
					File /<span className="text-[grey]">My First Project</span>
				</p>
				<div className="flex items-center justify-between gap-3">
					<div
							onClick={async () => {
							  const result = await save();
							  if (result) {
							    alert("Code saved successfully.");
							  }
							}}
						className={`p-2 bg-blue-600 rounded-md w-fit px-3 font-semibold flex items-center justify-center gap-2  active:bg-blue-400 cursor-pointer`}
					>
						Save
						<RiSave3Line />
					</div>
					<div
						onClick={render}
						className={`p-2 bg-blue-600 rounded-md w-fit px-3 font-semibold flex items-center justify-center gap-2  active:bg-blue-400 cursor-pointer`}
					>
						Run
						<FaPlay />
					</div>
					<div
						onClick={downloadFiles}
						className={`p-2 ${
							isLightMode ? `bg-white text-black` : `bg-black text-white`
						} rounded-md text-xl cursor-pointer ${
							isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
						} `}
						style={{ color: isLightMode ? "#000" : "#fff" }}
					>
						<FiDownload />
					</div>
					<div
						onClick={toggletheme}
						className={`p-2 ${
							isLightMode ? `bg-white text-black` : `bg-black text-white`
						} rounded-md text-xl cursor-pointer ${
							isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
						}  `}
						style={{ color: isLightMode ? "#000" : "#fff" }}
					>
						<MdLightMode className="text-[20px]" />
					</div>
				</div>
			</div>
		</>
	);
};

export default EditorNavBar;
