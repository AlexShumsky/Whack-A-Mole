'use strict';
const startButton = document.querySelector('.start-b');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

let gameTimer;
let lastHole = null;
let isPlay = false;
let counter = 0;

startButton.addEventListener('click', toggleGame);
moles.forEach(mole => mole.addEventListener('click', hitMole));

function toggleGame() {
	(isPlay) ? finishGame() : startGame();
}
function startGame() {
	initGame();
	showMoles();
}
/**INIT**/
function initGame() {
	counter = 0;
	isPlay = true;
	gameTimer = setTimeout(() => {
		finishGame();
	}, 10000);
	startButtonText();
}
/**SHOWMOLES**/
function getRandomTime(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function getRandomHole(holes) {
	const randomIndex = Math.floor(Math.random() * holes.length);
	if (holes[randomIndex] === lastHole) {
		return getRandomHole(holes);
	}
	lastHole = holes[randomIndex];
	return holes[randomIndex];
}
function showMoles() {
	const hole = getRandomHole(holes);
	const time = getRandomTime(300, 1200);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if (isPlay) showMoles();
	}, time)
}
/**HITMOLE**/
function hitMole() {
	if (this.parentNode.classList.contains('up')) {
		counter++;
		showCurrentPoints();
		this.parentNode.classList.remove('up');
	}
}
/**STARTBUTTON**/
function startButtonText() {
	(isPlay) ? startButton.textContent = 'Finish' : startButton.textContent = 'Start';
}
/**COUNTER**/
function showCurrentPoints() {
	const countSpan = document.querySelector('span');
	countSpan.textContent = counter;
}
function finishGame() {
	isPlay = false;
	alert(`Cool your result is ${counter}`);
	counter = 0;
	showCurrentPoints();
	startButtonText();
	clearTimeout(gameTimer);
}
