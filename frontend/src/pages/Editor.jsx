import React, { useState, useEffect } from "react";
import axios from "axios";
import EditorNavBar from "../componentes/EditorNavBar";
import { RiExpandDiagonalLine } from "react-icons/ri";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const DefaultHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`;

const DefaultCssCode = `* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	width: 100%;
	height: 100vh;
}`;

const DefaultJsCode = `console.log("Hello world");`;

const Editor = () => {
	const [activeTab, setActiveTab] = useState("html");
	const [isLightMode, setIsLightMode] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [htmlCode, setHtmlCode] = useState(DefaultHtmlCode);
	const [cssCode, setCssCode] = useState(DefaultCssCode);
	const [jsCode, setJsCode] = useState(DefaultJsCode);

	const { projectId } = useParams();

	useEffect(() => {
		const fetchProjectCode = async () => {
			try {
				const response = await axios.post(`${api_base_url}/getProjectCode`, {
					userId: localStorage.getItem("userId"),
					projectId: projectId,
				});
				const { htmlCode, cssCode, jsCode } = response.data.project;
				setHtmlCode(htmlCode);
				setCssCode(cssCode);
				setJsCode(jsCode);
			} catch (error) {
				console.error("Error fetching project code:", error);
			}
		};

		fetchProjectCode();
	}, [projectId]);

	const toggleTheme = () => {
		setIsLightMode((prev) => !prev);
	};

	useEffect(() => {
		document.body.classList.toggle("light-mode", isLightMode);
	}, [isLightMode]);

	const render = () => {
		const iframe = document.querySelector("#iframe");
		if (iframe) {
			const content = `
				${htmlCode}
				<style>${cssCode}</style>
				<script>${jsCode}</script>
			`;
			iframe.srcdoc = content;
		}
	};

	const save = async () => {
		try {
			const response = await axios.post(`${api_base_url}/updateProject`, {
				userId: localStorage.getItem("userId"),
				projectId: projectId,
				htmlCode,
				cssCode,
				jsCode,
			});
			if (response.data.success) {
				return true;
			} else {
				console.error("Failed to save project:", response.data.message);
				return false;
			}
		} catch (error) {
			console.error("Error saving project:", error);
			return false;
		}
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			render();
		}, 500);

		return () => clearTimeout(debounce);
	}, [htmlCode, cssCode, jsCode]);

	const downloadFiles = async () => {
		const zip = new JSZip();

		zip.file("index.html", htmlCode);
		zip.file("styles.css", cssCode);
		zip.file("script.js", jsCode);

		const content = await zip.generateAsync({ type: "blob" });
		saveAs(content, "project.zip");
	};

	const handleCodeChange = (value, language) => {
		switch (language) {
			case "html":
				setHtmlCode(value);
				break;
			case "css":
				setCssCode(value);
				break;
			case "javascript":
				setJsCode(value);
				break;
			default:
				console.error("Unknown language:", language);
		}
		save();
	};

	return (
		<div>
			<EditorNavBar
				toggleTheme={toggleTheme}
				isLightMode={isLightMode}
				render={render}
				save={save}
				downloadFiles={downloadFiles}
			/>
			<div className="flex">
				<div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
					<div
						className={`flex items-center justify-between w-full h-14 ${
							isLightMode ? "bg-[#e6e6e6] text-black" : "bg-[#1a1919] text-white"
						}`}
					>
						<div className="flex justify-start gap-3 w-full h-full">
							{["html", "css", "javascript"].map((tab) => (
								<div
									key={tab}
									className={`tab ${
										activeTab === tab
											? `border-b-2 ${
													isLightMode ? "border-b-blue-800" : "border-b-white"
											  }`
											: ""
									} pt-4 px-4 w-36 ${
										isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
									} text-center cursor-pointer text-sm tracking-wider`}
									onClick={() => setActiveTab(tab)}
								>
									{tab === "html"
										? "index.html"
										: tab === "css"
										? "styles.css"
										: "script.js"}
								</div>
							))}
						</div>
						<RiExpandDiagonalLine
							onClick={() => setIsExpanded((prev) => !prev)}
							className={`size-9 cursor-pointer rounded-full p-2 mr-8 ${
								isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
							}`}
						/>
					</div>

					<MonacoEditor
						key={activeTab}
						options={{
							fontSize: 16,
							minimap: { enabled: false },
						}}
						height="calc(100vh - 112px)"
						theme={isLightMode ? "vs-light" : "vs-dark"}
						language={activeTab}
						value={
							activeTab === "html"
								? htmlCode
								: activeTab === "css"
								? cssCode
								: jsCode
						}
						onChange={(value) => handleCodeChange(value, activeTab)}
					/>
				</div>
				<iframe
					id="iframe"
					title="Output"
					className={`output ml-1 bg-white text-black min-h-fit ${
						isExpanded ? "w-0" : "w-1/2"
					}`}
				>
					iframe
				</iframe>
			</div>
		</div>
	);
};

export default Editor;
