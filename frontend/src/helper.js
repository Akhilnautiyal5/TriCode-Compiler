export const toggleClass = (elem, className) => {
	let element = document.querySelector(elem);
	element.classList.toggle(className);
};

export const removeClass = (elem, className) => {
	let element = document.querySelector(elem);
	element.classList.remove(className);
};

export const api_base_url = "https://tricode-compiler-backend.onrender.com";
// export const api_base_url = "http://localhost:3000";
