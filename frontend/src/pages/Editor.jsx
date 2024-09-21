import React, { useState, useEffect } from "react";
import EditorNavBar from "../componentes/EditorNavBar";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { FaPlay } from "react-icons/fa6";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const DefaultHtmlcode = `<!DOCTYPE html>
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
	height: 100%;
}`;

const DefaultJSCode = `console.log("hello world")`;

const Editor = () => {
	const [activeTab, setActiveTab] = useState("html");
	const [isLightMode, setisLightMode] = useState(false);
	const [isExpanded, setExpand] = useState(false);
	const [htmlcode, setHtmlCode] = useState(DefaultHtmlcode);
	const [csscode, setCssCode] = useState(DefaultCssCode);
	const [jscode, setJsCode] = useState(DefaultJSCode);

	let { projectId } = useParams();

	useEffect(() => {
		// getProjectCode();
		fetch(api_base_url + "/getProjectCode", {
			mode: "cors",
			method: "POST",
			headers: {
				'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
			},
			body: JSON.stringify({
				userId: localStorage.getItem("userId"),

				projectId: projectId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setHtmlCode(data.project.htmlCode);
				setCssCode(data.project.cssCode);
				setJsCode(data.project.jsCode);
			});
	}, [projectId]);

	const toggletheme = () => {
		setisLightMode((prev) => !prev);
	};

	// Effect to toggle the class on the body element
	useEffect(() => {
		if (isLightMode) {
			document.body.classList.add("light-mode");
		} else {
			document.body.classList.remove("light-mode");
		}
	}, [isLightMode]);

	const render = () => {
		const html = htmlcode;
		const css = `<style>${csscode}</style>`;
		const js = `<script>${jscode}</script>`;
		const iframe = document.querySelector("#iframe");
		if (iframe) {
			iframe.srcdoc = `${html}${css}${js}`;
		}
	};

	const save = async () => {
		try {
			const response = await fetch(api_base_url + "/updateProject", {
				mode: "cors",
				method: "POST",
				headers: {
					'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
				},
				body: JSON.stringify({
					userId: localStorage.getItem("userId"),
					projectId: projectId,
					htmlCode: htmlcode,
					cssCode: csscode,
					jsCode: jscode,
				}),
			});
			const data = await response.json();
			if (data.success) {
				return true;
			} else {
				alert(data.message);
			}
		} catch (error) {
			throw new Error(error.message);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			render();
		}, 200);
	}, [htmlcode, csscode, jscode]);

	const downloadFiles = async () => {
		const zip = new JSZip();

		zip.file("index.html", htmlcode);
		zip.file("css.css", csscode);
		zip.file("script.js", jscode);

		zip.generateAsync({ type: "blob" }).then((content) => {
			saveAs(content, "project.zip");
		});
	};

	return (
		<div>
			<EditorNavBar
				toggletheme={toggletheme}
				isLightMode={isLightMode}
				render={render}
				save={save}
				downloadFiles={downloadFiles}
			/>
			<div className="flex">
				<div className={`left ${isExpanded ? "w-[100%]" : "w-[50%]"}`}>
					<div
						className={`flex items-center justify-between  w-full  h-14 ${
							isLightMode
								? `bg-[#e6e6e6] text-black`
								: `bg-[#1a1919] text-white`
						}`}
					>
						<div className="flex justify-start gap-3 w-full h-full">
							<div
								className={`tab ${
									activeTab === "html"
										? `border-b-2 ${
												isLightMode ? `border-b-blue-800` : `border-b-white`
										  }`
										: ""
								} pt-[16px] px-[15px] w-36 ${
									isLightMode ? "active:bg-zinc-100" : "active;bg-zinc-600"
								} text-center cursor-pointer text-[14px] tracking-wider`}
								onClick={() => setActiveTab("html")}
							>
								index.html
							</div>
							<div
								className={`tab ${
									activeTab === "css"
										? `border-b-2 ${
												isLightMode ? `border-b-blue-800` : `border-b-white`
										  }`
										: ""
								} px-[15px] pt-[16px] w-36 ${
									isLightMode ? "active:bg-zinc-100" : "active;bg-zinc-600"
								} text-center cursor-pointer text-[14px] tracking-wider`}
								onClick={() => setActiveTab("css")}
							>
								style.css
							</div>
							<div
								className={`tab ${
									activeTab === "javascript"
										? `border-b-2 ${
												isLightMode ? `border-b-blue-800` : `border-b-white`
										  }`
										: ""
								} px-[15px] pt-[16px] w-36 ${
									isLightMode ? "active:bg-zinc-100" : "active;bg-zinc-600"
								} text-center cursor-pointer text-[14px] tracking-wider`}
								onClick={() => setActiveTab("javascript")}
							>
								script.js
							</div>
						</div>
						<RiExpandDiagonalLine
							onClick={() => setExpand((prev) => !prev)}
							className={`size-9 cursor-pointer rounded-full p-2 mr-8 ${
								isLightMode ? "active:bg-zinc-100" : "active:bg-zinc-600"
							}`}
						/>
					</div>

					<MonacoEditor
						key={activeTab}
						options={{
							fontSize: 16,
						}}
						height="80vh"
						theme={`${isLightMode ? `vs-light` : `vs-dark`}`}
						language={activeTab}
						value={
							activeTab === "html"
								? htmlcode
								: activeTab === "css"
								? csscode
								: jscode
						}
						onChange={(value) => {
							if (activeTab === "html") {
								setHtmlCode(value);
								render();
								save();
							} else if (activeTab === "css") {
								setCssCode(value);
								render();
								save();
							} else {
								setJsCode(value);
								render();
								save();
							}
						}}
					/>
				</div>
				<iframe
					id="iframe"
					className={`utput ml-1 bg-white text-black min-h-fit ${
						isExpanded ? "w-[0%]" : "w-[50%]"
					}`}
				>
					iframe
				</iframe>
			</div>
		</div>
	);
};

export default Editor;
