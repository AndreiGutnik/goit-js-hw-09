import { getRandomHexColor } from "./helper";

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
const { start, stop } = refs;

let startInterval = null;

startColorSwitcher();

function onStart() {	
	start.removeEventListener('click', onStart);
	startInterval = setInterval(() => {
		document.body.style.backgroundColor = getRandomHexColor();
	}, 500);
	stop.addEventListener('click', onStop);
}

function onStop() {
	stop.removeEventListener('click', onStop);
	clearInterval(startInterval);
	startColorSwitcher();
}

function startColorSwitcher() {
	start.addEventListener('click', onStart);
}