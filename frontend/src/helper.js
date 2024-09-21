export const toggleClass = (elem, className) => {
	let element = document.querySelector(elem);
	element.classList.toggle(className);
};

export const removeClass = (elem, className) => {
	let element = document.querySelector(elem);
	element.classList.remove(className);
};

export const api_base_url = "https://tri-code-compiler-backend.vercel.app";
// export const api_base_url = "http://localhost:3000";
