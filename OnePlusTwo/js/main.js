

var gameover = document.querySelector("#gameover");
var game = document.querySelector('#game');
var playgame = document.querySelector('#playgame');



var sum;
var score = 0;
var high_scores = document.querySelector(".high-scores")
var timeOut;
var timerId;

var liquid1 = document.getElementById("liquid1");
var liquid2 = document.getElementById("liquid2");
var liquid3 = document.getElementById("liquid3");

playgame.style.display = "block";
game.style.display = "none";
gameover.style.display = "none";

var playevents = document.getElementsByClassName('play');
playevents[0].addEventListener('click', function () {
	oneplustwo();
}, false);
playevents[1].addEventListener('click', function () {
	clearscore();
}, false);


function clearscore() {

	var clearresulttext = document.getElementById('result');

	clearresulttext.innerHTML = "";
	score = 0;
	console.log('clearscore');
	liquid1.style.width = '100%';
	liquid2.style.width = '100%';
	liquid3.style.width = '100%';
	//	liquid1.style.transition = 'width 0s';
	//	liquid2.style.transition = 'width 0s';
	//	liquid3.style.transition = 'width 0s';
	oneplustwo();
}

function oneplustwo() {
	var startagain = document.getElementById('result');
	startagain.innerHTML = "Start!";
	

	console.log(score);
	playgame.style.display = "none";
	game.style.display = "block";
	gameover.style.display = "none";

	var operators;

	operators = ["+", "-"];

	var sumCorrect = false;

	do {
		var firstnum = Math.floor((Math.random() * 3) + 1);
		var secondnum = Math.floor((Math.random() * 3) + 1);
		var i = Math.round(Math.random() * 1);
		var operator = operators[i];


		if (operator == "+") {
			sum = firstnum + secondnum;

		} else if (operator == "-") {
			sum = firstnum - secondnum;
		}


		if ((score > 2 && score < 5) || (score > 7 && score < 12) || (score > 14 && score < 20)){

			console.log("abc1");
			var thirdnum = Math.floor((Math.random() * 3) + 1);
			i = Math.round(Math.random() * 1);
			var operator2 = operators[i];
			if (operator2 == "+") {
				sum += thirdnum;

			} else if (operator2 == "-") {
				sum -= thirdnum;

			}

			document.getElementById("operator2").innerHTML = operator2;
			document.getElementById("thirdnum").innerHTML = thirdnum;

		} else {
			document.getElementById("operator2").innerHTML = "";
			document.getElementById("thirdnum").innerHTML = "";

		}


		if (sum == 1 || sum == 2 || sum == 3) {
			console.log("abc2");
			sumCorrect = true;

		}

	}
	while (sumCorrect == false);

	document.getElementById("cheating").innerHTML = sum;

	document.getElementById("firstnum").innerHTML = firstnum;
	document.getElementById("secondnum").innerHTML = secondnum;
	document.getElementById("operator").innerHTML = operator;


	document.getElementsByClassName("score")[0].innerHTML = score;


	if (score > 0) {

		liquid1.style.transition = 'width 0s';
		liquid2.style.transition = 'width 0s';
		liquid3.style.transition = 'width 0s';
		liquid1.style.width = '0%';
		liquid2.style.width = '0%';
		liquid3.style.width = '0%';

		var timeLeft = 5;
		var elem = document.getElementById('timer');
		timerId = setInterval(countdown, 1000);


		function countdown() {

			setInterval(function () {
				liquid1.style.transition = 'width 5s';
				liquid1.style.width = '100%';
			}, 1000);

			setInterval(function () {
				liquid2.style.transition = 'width 5s';
				liquid2.style.width = '100%';
			}, 1000);

			setInterval(function () {
				liquid3.style.transition = 'width 5s';
				liquid3.style.width = '100%';
			}, 1000);

			if (timeLeft == 0) {

				clearTimeout(timerId);


				setTimeout(function () {

					playgame.style.display = "none";
					game.style.display = "none";
					gameover.style.display = "block";


				}, 3000);


				document.getElementById("result").innerHTML = "Game over!";
				scores[1].innerHTML = "Score: " + score;
				UpdateScore();
				console.log(high_scores);
				console.log(score);


			} else {

				elem.innerHTML = timeLeft;
				timeLeft--;


			}
		};
	}


}

//oneplustwo();

var events = document.getElementsByClassName('x');

events[0].addEventListener('click', function () {
	Answer(events[0].value);
}, false);

events[1].addEventListener('click', function () {
	Answer(events[1].value);
}, false);

events[2].addEventListener('click', function () {
	Answer(events[2].value);
}, false);

var scores = document.getElementsByClassName('score');



function Answer(userAnswer) {

	if (userAnswer == sum) {

		clearTimeout(timerId);
		score++;

		oneplustwo();

		document.getElementById("result").innerHTML = "Correct!";
		scores[0].innerHTML = score;

	} else {

		clearTimeout(timerId);


		setTimeout(function () {

			playgame.style.display = "none";
			game.style.display = "none";
			gameover.style.display = "block";


		}, 2000);


		document.getElementById("result").innerHTML = "Game over!";
		scores[1].innerHTML = "Score: " + score;
		UpdateScore();
		console.log(high_scores);
		console.log(score);


	}

}

function HighScores() {
	if (typeof (Storage) !== "undefined") {
		var scores = false;
		if (localStorage["high-scores"]) {
			high_scores.style.display = "block";
			high_scores.innerHTML = '';
			scores = JSON.parse(localStorage["high-scores"]);
			scores = scores.sort(function (a, b) {
				return parseInt(b) - parseInt(a)
			});

			for (var i = 0; i < 5; i++) {
				var s = scores[i];
				var fragment = document.createElement('li');
				fragment.innerHTML = (typeof (s) != "undefined" ? s : "");
				high_scores.appendChild(fragment);
			}
		}
	} else {
		high_scores.style.display = "none";
	}
}

function UpdateScore() {
	if (typeof (Storage) !== "undefined") {
		var current = score;

		var scores = false;
		if (localStorage["high-scores"]) {

			scores = JSON.parse(localStorage["high-scores"]);
			scores = scores.sort(function (a, b) {
				return parseInt(b) - parseInt(a)
			});

			for (var i = 0; i < 5; i++) {
				var s = parseInt(scores[i]);

				var val = (!isNaN(s) ? s : 0);
				if (current > val) {
					val = current;
					scores.splice(i, 0, parseInt(current));
					break;
				}
			}

			scores.length = 5;
			localStorage["high-scores"] = JSON.stringify(scores);

		} else {
			var scores = new Array();
			scores[0] = current;
			localStorage["high-scores"] = JSON.stringify(scores);
		}

		HighScores();

	}



}
