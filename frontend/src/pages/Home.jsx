import React, { useState, useEffect, useRef } from "react";
import Navbar from "../componentes/Navbar";
import ListCard from "../componentes/ListCard";
import GridCard from "../componentes/GridCard";
import { FaListUl } from "react-icons/fa6";
import { BsFillGridFill } from "react-icons/bs";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";

const Home = () => {
	const [isGridLayout, setisGridLayout] = useState(true);
	const [isLightMode, setisLightMode] = useState(false);
	const [NewProject, setNewProject] = useState(false);
	const [projectTitle, setprojectTitle] = useState("");
	const [projects, setProjects] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	//filter projects based on search query
	const filterProjects = projects
		? projects.filter((item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: [];

	const createProject = async (e) => {
		if (projectTitle === "") {
			alert("Please Enter Project Title");
		} else {
			const response = await fetch(api_base_url + "/createProject", {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: projectTitle,
					userId: localStorage.getItem("userId"),
				}),
			});
			const data = await response.json();
			if (data.success) {
				setNewProject(false);
				setprojectTitle("");
				alert("Project created successfully");
				await getProjects();
				navigate(`/editor/${data.projectId}`);
			} else {
				alert("Failed to create project");
			}
		}
	};

	const getProjects = async () => {
		const response = await fetch(api_base_url + "/getProjects", {
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: localStorage.getItem("userId"),
			}),
		});

		const data = await response.json();
		if (data.success) {
			setProjects(data.projects);
		} else {
			setError(data.message);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	useEffect(() => {
		const lenis = new Lenis();

		lenis.on("scroll", (e) => {});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);

	const toggletheme = (lightTheme) => {
		if (lightTheme === false) setisLightMode(true);
		else setisLightMode(false);
	};

	// Effect to toggle the class on the body element
	useEffect(() => {
		if (isLightMode) {
			document.body.classList.add("light-mode");
		} else {
			document.body.classList.remove("light-mode");
		}
	}, [isLightMode]);

	return (
		<>
			<div
				className={`${
					isLightMode ? `bg-[#e6e6e6] text-black` : `bg-[#0d0c0c]`
				}`}
			>
				<Navbar toggletheme={toggletheme} isLightMode={isLightMode} />
				<div
					className={`mx-[100px] my-5 border-b-[1px] ${
						isLightMode ? `border-zinc-400` : `border-white text-white`
					}`}
				>
					<h2 className="text-3xl font-light">Hi, Akhil 👋</h2>
					<div className="flex mt-10 items-center justify-between">
						<div className="flex item-center justify-center">
							<div
								className={`p-3 flex item-center justify-center ${
									isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
								}`}
							>
								<BsFillGridFill
									size={25}
									onClick={() => setisGridLayout(true)}
								/>
							</div>
							<div
								className={`p-3 flex item-center justify-center ${
									isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
								}`}
							>
								<FaListUl size={25} onClick={() => setisGridLayout(false)} />
							</div>
						</div>
						<div className="inputbox w-[350px] flex gap-3 item-center justify-center">
							<input
								onChange={(e) => {
									setSearchQuery(e.target.value)
								}
								}
								value={searchQuery}
								className={` rounded-md mb-3 outline-none w-full p-3 ${
									isLightMode
										? `bg-[#e6e6e6]] text-black`
										: `bg-[#141414] text-white`
								}`}
								type="text"
								placeholder="Search your projects"
							/>
							<button
								onClick={() => setNewProject(true)}
								className="bg-blue-500 active:bg-blue-400 rounded w-10 h-10 text-3xl font-bold text-center pb-2"
							>
								+
							</button>
						</div>
					</div>
				</div>
				<div className="cards min-h-screen mt-10">
					{isGridLayout ? (
						<div className="gridCard flex flex-wrap item-center justify-start gap-10 px-[100px]">
							{
									filterProjects.length > 0 ? filterProjects.map((project, index) => (
										<GridCard
											key={index}
											isLightMode={isLightMode}
											project={project}
											getProjects={getProjects}
										/>
								  ))
								: <p>No project found</p>
							}
						</div>
					) : (
						<div className="listCard px-[100px]">
							{filterProjects
								? filterProjects.map((project, index) => (
										<ListCard
											key={index}
											isLightMode={isLightMode}
											project={project}
											getProjects={getProjects}
										/>
								  ))
								: ""}
						</div>
					)}
				</div>
			</div>
			<div
				className={`model ${
					NewProject ? "fixed" : "hidden"
				} top-0 left-0 w-full h-screen flex items-center justify-center flex-col ${
					isLightMode ? "bg-[rgba(255,255,255,0.2)]" : "bg-[rgba(0,0,0,0.2)]"
				}`}
			>
				<div
					className={`mainModel w-[413px] h-[210px] flex items-center justify-center flex-col gap-6 rounded-md px-5 py-10 ${
						isLightMode ? "bg-[#dadada]" : "bg-[#141414]"
					}`}
				>
					<h3 className="text-3xl">Create New Project</h3>
					<div className="mt-2">
						<input
							onChange={(e) => {
								setprojectTitle(e.target.value);
							}}
							value={projectTitle}
							required
							className={`rounded-md mb-3 w-full md:w-96 p-3 outline-none ${
								isLightMode ? "bg-zinc-200" : "bg-zinc-900"
							}`}
							type="text"
							placeholder="Enter project title here..."
						/>
					</div>
					<div className="flex items-center w-full justify-center gap-3">
						<button
							onClick={createProject}
							className="bg-blue-500 text-white w-[49%] h-10 rounded-md active:bg-red-400 "
						>
							Create
						</button>
						<button
							onClick={() => setNewProject(false)}
							className="bg-zinc-500 text-white w-[49%] h-10 rounded-md active:bg-zinc-400"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
