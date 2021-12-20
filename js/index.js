'use strict';
const startButton = document.querySelector('.start-b');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const difficulties = document.querySelectorAll('.difficulty');
const difficultiesList = {
	noob: [500, 1600],
	normal: [400, 1400],
	hard: [300, 1200],
	semigod: [200, 800],
	good: [140, 450],
}
let difficulty = 'noob';
let gameTimer;
let lastHole = null;
let isPlay = false;
let counter = 0;

startButton.addEventListener('click', toggleGame);
moles.forEach(mole => mole.addEventListener('click', hitMole));
difficulties.forEach(difficulty => difficulty.addEventListener('click', changeDifficulty))

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
		showGreetings();
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
	counter = 0;
	showCurrentPoints();
	startButtonText();
	clearTimeout(gameTimer);
}
function changeDifficulty() {
	changeActiveInMenu(this);
	changeGameDifficulty(this);
}
function changeActiveInMenu(active) {
	difficulties.forEach(difficulty => difficulty.classList.remove('active'));
	active.classList.add('active');
}
function changeGameDifficulty(userDifficulty) {
	difficulty = userDifficulty.textContent.toLowerCase();
	finishGame();
}
function showGreetings() {
	let letter = (!counter) ? `Ups.. Seems like it's realy hard for you. Try another difficulty` :
		(counter <= 2) ? `Your result is ${counter}! Definitely you can better` :
			(counter <= 7) ? `Your result is ${counter}! Impressive, don't you won't to show us more?` : `WOW! Your result is ${counter}! You a ROCK ; ) Try another difficulty`;
	alert(letter);
}