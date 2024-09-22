import React, { useState } from "react";
import axios from "axios";
import codeicon from "../images/code.png";
import deleteicon from "../images/delete.png";
import { Link } from "react-router-dom";
import { api_base_url } from "../helper";

const ListCard = ({ isLightMode, project, getProjects }) => {
	const [deleteModalShow, setDeleteModalShow] = useState(false);

	const handleDeleteProject = async (id) => {
		try {
			const response = await axios.post(`${api_base_url}/deleteProject`, {
				projectId: id,
				userId: localStorage.getItem("userId"),
			}, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.data.success) {
				setDeleteModalShow(false);
				getProjects();
			} else {
				alert(response.data.message);
				setDeleteModalShow(false);
			}
		} catch (error) {
			console.error("Error deleting project:", error);
			alert("An error occurred while deleting the project");
			setDeleteModalShow(false);
		}
	};

	return (
		<>
			<div
				className={`listCard mb-3 w-full h-24 flex items-center justify-between px-2 cursor-pointer rounded-md 
					${
						isLightMode
							? `shadow-md hover:bg-[#ffffff] bg-[#f7f7f7f7] `
							: `bg-[#141414] hover:bg-[#1a1a1a]`
					}`}
			>
				<Link
					to={`/editor/${project._id}`}
					className="flex items-center gap-2"
				>
					<img className="w-14 cursor-pointer mr-4" src={codeicon} alt="Code icon" />
					<div>
						<h3 className="text-[20px]">{project.title}</h3>
						<p className="text-[grey] text-[14px]">
							Created on {new Date(project.date).toDateString()}
						</p>
					</div>
				</Link>
				<div>
					<img
						onClick={() => setDeleteModalShow(true)}
						className="w-12 cursor-pointer rounded-full p-2 mr-4 active:bg-zinc-400"
						src={deleteicon}
						alt="Delete icon"
					/>
				</div>
			</div>
			{deleteModalShow && (
				<div
					className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center flex-col ${
						isLightMode ? "bg-[rgba(255,255,255,0.2)]" : "bg-[rgba(0,0,0,0.2)]"
					}`}
				>
					<div
						className={`mainModal w-[413px] h-[210px] flex items-center justify-center flex-col gap-6 rounded-lg px-5 ${
							isLightMode ? "bg-[#dadada]" : "bg-[#141414]"
						}`}
					>
						<h3 className="text-3xl text-start">
							Do you want to delete this project?
						</h3>
						<div className="flex items-center w-full justify-center gap-3">
							<button
								onClick={() => handleDeleteProject(project._id)}
								className="bg-red-500 text-white w-[49%] h-12 rounded-md active:bg-red-400"
							>
								Delete
							</button>
							<button
								onClick={() => setDeleteModalShow(false)}
								className="bg-zinc-500 text-white w-[49%] h-12 rounded-md active:bg-zinc-400"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ListCard;
