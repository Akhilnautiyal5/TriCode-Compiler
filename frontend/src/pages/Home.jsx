import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../componentes/Navbar";
import ListCard from "../componentes/ListCard";
import GridCard from "../componentes/GridCard";
import { FaListUl } from "react-icons/fa6";
import { BsFillGridFill } from "react-icons/bs";
import Lenis from "@studio-freight/lenis";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";

const Home = () => {
	const [isGridLayout, setIsGridLayout] = useState(true);
	const [isLightMode, setIsLightMode] = useState(false);
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
	const [projectTitle, setProjectTitle] = useState("");
	const [projects, setProjects] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	const filterProjects = projects.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const createProject = async (e) => {
		e.preventDefault();
		if (projectTitle.trim() === "") {
			setError("Please enter a project title");
			return;
		}

		try {
			const response = await axios.post(`${api_base_url}/createProject`, {
				title: projectTitle.trim(),
				userId: localStorage.getItem("userId"),
			});

			const { data } = response;
			if (data.success) {
				setShowNewProjectModal(false);
				setProjectTitle("");
				setError("");
				await getProjects();
				window.location.href = `/editor/${data.projectId}`;
			} else {
				setError(data.message || "Failed to create project");
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
			console.error("Create project error:", err);
		}
	};

	const getProjects = async () => {
		try {
			const response = await axios.post(`${api_base_url}/getProjects`, {
				userId: localStorage.getItem("userId"),
			});

			const { data } = response;
			if (data.success) {
				setProjects(data.projects);
			} else {
				setError(data.message);
			}
		} catch (err) {
			setError("Failed to fetch projects");
			console.error("Get projects error:", err);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	useEffect(() => {
		const lenis = new Lenis();

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	const toggletheme = (lightTheme) => {
		if (lightTheme === false) setIsLightMode(true);
		else setIsLightMode(false);
	};

	return (
		<>
			<div className={`${isLightMode ? "bg-[#e6e6e6] text-black" : "bg-[#0d0c0c]"}`}>
				<Navbar toggletheme={toggletheme} isLightMode={isLightMode} />
				<div className={`mx-[100px] my-5 border-b-[1px] ${
					isLightMode ? "border-zinc-400" : "border-white text-white"
				}`}>
					<h2 className="text-3xl font-light">Hi, Akhil 👋</h2>
					<div className="flex mt-10 items-center justify-between">
						<div className="flex items-center">
							<button
								className={`p-3 ${isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"}`}
								onClick={() => setIsGridLayout(true)}
							>
								<BsFillGridFill size={25} />
							</button>
							<button
								className={`p-3 ${isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"}`}
								onClick={() => setIsGridLayout(false)}
							>
								<FaListUl size={25} />
							</button>
						</div>
						<div className="inputbox w-[350px] flex gap-3 items-center">
							<input
								onChange={(e) => setSearchQuery(e.target.value)}
								value={searchQuery}
								className={`rounded-md mb-3 outline-none w-full p-3 ${
									isLightMode ? "bg-[#e6e6e6] text-black" : "bg-[#141414] text-white"
								}`}
								type="text"
								placeholder="Search your projects"
							/>
							<button
								onClick={() => setShowNewProjectModal(true)}
								className="bg-blue-500 active:bg-blue-400 rounded w-10 h-10 text-3xl font-bold text-center pb-2"
							>
								+
							</button>
						</div>
					</div>
				</div>
				<div className="cards min-h-screen mt-10">
					{isGridLayout ? (
						<div className="gridCard flex flex-wrap items-center justify-start gap-10 px-[100px]">
							{filterProjects.length > 0 ? (
								filterProjects.map((project) => (
									<GridCard
										key={project._id}
										isLightMode={isLightMode}
										project={project}
										getProjects={getProjects}
									/>
								))
							) : (
								<p>No projects found</p>
							)}
						</div>
					) : (
						<div className="listCard px-[100px]">
							{filterProjects.length > 0 ? (
								filterProjects.map((project) => (
									<ListCard
										key={project._id}
										isLightMode={isLightMode}
										project={project}
										getProjects={getProjects}
									/>
								))
							) : (
								<p>No projects found</p>
							)}
						</div>
					)}
				</div>
			</div>
			{showNewProjectModal && (
				<div className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center flex-col ${
					isLightMode ? "bg-[rgba(255,255,255,0.2)]" : "bg-[rgba(0,0,0,0.2)]"
				}`}>
					<div className={`w-[413px] h-[210px] flex items-center justify-center flex-col gap-6 rounded-md px-5 py-10 ${
						isLightMode ? "bg-[#dadada]" : "bg-[#141414]"
					}`}>
						<h3 className="text-3xl">Create New Project</h3>
						<form onSubmit={createProject} className="w-full flex flex-col items-center">
							<input
								onChange={(e) => setProjectTitle(e.target.value)}
								value={projectTitle}
								required
								className={`rounded-md mb-3 w-full md:w-96 p-3 outline-none ${
									isLightMode ? "bg-zinc-200" : "bg-zinc-900"
								}`}
								type="text"
								placeholder="Enter project title here..."
							/>
							{error && <p className="text-red-500 mb-2">{error}</p>}
							<div className="flex items-center w-full justify-center gap-3">
								<button
									type="submit"
									className="bg-blue-500 text-white w-[49%] h-10 rounded-md active:bg-blue-400"
								>
									Create
								</button>
								<button
									type="button"
									onClick={() => setShowNewProjectModal(false)}
									className="bg-zinc-500 text-white w-[49%] h-10 rounded-md active:bg-zinc-400"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
