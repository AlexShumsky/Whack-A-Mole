'use strict';
const startButton = document.querySelector('.start-b');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const score = document.querySelector('.top-score span');
const difficulties = document.querySelectorAll('.difficulty');
const cursor = document.querySelector('.cursor');
const hammerHitSound = document.querySelector('.hammer-hit');
const mainTheme = document.querySelector('.main-theme');
const difficultiesList = {
	noob: [500, 1600],
	normal: [400, 1400],
	hard: [300, 1200],
	semigod: [200, 800],
	good: [140, 450],
}
let isPlay = false;
let counter = 0;
let lastHole = null;
startButton.addEventListener('click', startGame);

moles.forEach(mole => mole.addEventListener('click', hitMole));
difficulties.forEach(difficulty => difficulty.addEventListener('click', changeDifficulty))
window.addEventListener('load', changeUserScore);
window.addEventListener('load', getLocalUserDifficulty);
window.addEventListener('load', showCursore);
/**START GAME**/
function startGame() {
	disableStartButton();
	playSound(mainTheme);
	initGame();
	showCurrentPoints();
	showMoles();
}

function initGame() {
	counter = 0;
	isPlay = true;

	setTimeout(() => {
		stopSound(mainTheme);
		checkStorage();
		changeUserScore();
		finishGame();
	}, 10000);
}

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
	const difficulty = localStorage.getItem('difficulty');
	const timeInterval = difficultiesList[difficulty];
	const hole = getRandomHole(holes);
	const time = getRandomTime(timeInterval[0], timeInterval[1]);
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
		playSound(hammerHitSound);
		showCurrentPoints();
		this.parentNode.classList.remove('up');
	}
}
/**STORAGE**/
function checkStorage() {
	(localStorage.getItem('topScore')) ? changeStorageScore() :
		(localStorage.setItem('topScore', 0), changeStorageScore());
}
function getLocalUserDifficulty() {
	(localStorage.getItem('difficulty')) ? initDifficulty() :
		(localStorage.setItem('difficulty', 'noob'));
}
function changeStorageScore() {
	let topScore = localStorage.getItem('topScore');
	if (counter > topScore) {
		localStorage.setItem('topScore', counter);
	}
}
function changeUserScore() {
	if (localStorage.getItem('topScore')) score.textContent = localStorage.getItem('topScore');
}
/**FINISH**/
function finishGame() {
	isPlay = false;
	counter = 0;
	enableStartButton();
}
/**COUNTER**/
function showCurrentPoints() {
	const countSpan = document.querySelector('span');
	countSpan.textContent = counter;
}
/**DIFFICULTY**/
function changeDifficulty() {
	changeActiveInMenu(this);
	changeGameDifficulty(this);
	function changeActiveInMenu(active) {
		difficulties.forEach(difficulty => difficulty.classList.remove('active'));
		active.classList.add('active');
	}
	function changeGameDifficulty(userDifficulty) {
		localStorage.setItem('difficulty', userDifficulty.textContent.toLowerCase())
	}
}
function initDifficulty() {
	let localDifficulty = localStorage.getItem('difficulty');
	difficulties.forEach(difficulty => {
		if (difficulty.textContent.toLowerCase() == localDifficulty) {
			difficulties.forEach(difficulty => difficulty.classList.remove('active'));
			difficulty.classList.add('active');
		}
	});
}
/**START BUTTON**/
function disableStartButton() {
	startButton.removeEventListener('click', startGame);
};
function enableStartButton() {
	startButton.addEventListener('click', startGame);
};
function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}
function stopSound(sound) {
	sound.pause();
}
function showCursore() {
	window.addEventListener('mousemove', (e) => {
		cursor.style.top = (e.pageY - 25) + 'px';
		cursor.style.left = (e.pageX - 25) + 'px';
	})

	window.addEventListener('click', () => {
		cursor.classList.add('expand');
		cursor.style.transition = '.1s';
		cursor.addEventListener('transitionend', () => {
			cursor.classList.remove('expand');
			cursor.style.transition = '0';
		});
	});
}

