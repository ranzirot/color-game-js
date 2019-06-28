$(window).on("load", function() {
	//Spinner
	preloaderFadeOutTime = 5000;
	function hidePreloader() {
		var preloader = $('.spinner-wrapper');
		preloader.fadeOut(preloaderFadeOutTime);
	}
	hidePreloader();
});

$(document).ready(function(){
	var modal = $('.modal').modal();
	let def_time = 3.0;
	let time = 3.0;
	let bartime = 100;
	let cancelled = false;
	let min = 0;
	let max = 6;
	let def_speed = 0.1;
	let timer_speed = 0.1;
	let wordColor = ["Yellow", "Red", "Orange", "Purple", "Green", "Blue", "Brown"];
	let colorCode = ["#FFFF00", "#FF0000", "#F58231", "#800080", "#008000", "#0000FF", "#a25015"];
	
	let correctAnswer = "";
	let your_score = 0;
	
	$("#play-stop-button").click(function(){
		if($("#play-stop-button").hasClass("playG")){
			startGame();
			wordTimer();
			randomWord();
		}else{
			stopGame("");
		}
	});
	
	const startGame = function () {
		cancelled = false;
		$(".material-icons").text("stop");
		$("#play-stop-button").addClass("resetG red").removeClass("playG teal");
		$("#gword").focus();
	}
		
	const stopGame = function (stop_type) {
		cancelled = true;
		clearTimeout(wordTimer);
		time = def_time;
		bartime = 100;
		timer_speed = def_speed;
		switch(stop_type){
			case "game_over":
				showGameBoard("Game Over! Your score is " + your_score +".");
				break;
			case "timeout":
				showGameBoard("You run out of time! Your score is " + your_score + ".");
				break;
			default:
				if(your_score > 0) {
					showGameBoard("Why stop?! Your score is "+ your_score + ".");
				}
				break;
		}
		$(".material-icons").text("play_arrow");
		$("#play-stop-button").addClass("playG teal").removeClass("resetG red");
		$("#gword").val("");
		$(".the-word").text("");
		$(".score").text("0");
		your_score = 0;
		$(".determinate").width(bartime+"%");
		
	}
	
	const stillGoing = function() {
		clearTimeout(wordTimer);
		time = def_time - timer_speed;
		bartime = 100;
		timer_speed += def_speed;
		$("#gword").val("");
		$(".determinate").width(bartime +"%");
		cancelled = false;
		setTimeout(wordTimer, 500);
		randomWord();
		your_score++;
		$(".score").text(your_score);
	}

	const wordTimer = function() {
		if(!cancelled){
			$(".determinate").width((((Math.round(time*10)/10) / Math.floor(def_time)) * 100 ) +"%");
			if((Math.round(time*10)/10) > -0.5 && !cancelled){
				time -= .01;
				setTimeout(wordTimer, 10);
			}else{
				setTimeout(stopGame("timeout"), 500);
			}
		}
	}
	
	const randomWord = function() {
		let randomWord = Math.floor(Math.random() * (max - min + 1) + min); 
		let randomColor = Math.floor(Math.random() * (max - min + 1) + min); 
		correctAnswer = wordColor[randomColor];
		$(".the-word").text(wordColor[randomWord]).css('color', colorCode[randomColor]);
	}

	const showGameBoard = function(message) {
		Swal.fire({
			title: message,
			animation: false,
			customClass: {
				popup: 'animated bounceInUp'
			}
		})
	}

	$(document).on('keypress',function(e) {
		let your_guess = $("#gword").val();
    if(e.which == 13 && your_guess != "") {
				cancelled = true;
				if(your_guess == correctAnswer.toLowerCase()){
					setTimeout(stillGoing, 200);
				}else{
					stopGame("game_over");
				}
    }
	});

});
