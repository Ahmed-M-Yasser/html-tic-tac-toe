var player = 'O',
	thisSquarePosition,
	numberOfHerozintalMatches = 0,
	numberOfVerticalMatches = 0,
	numberOfDiagonalTopLeftMatches = 0,
	numberOfDiagonalTopRightMatches = 0,
	gameOver = false,
	filledSquares = 0,

	turn = $('#turn'),
	square = $('.square'),
	draw = $('#draw'),

	threeMatches = 3,
	twoMatches = 2;

turn.text(player);

square.on('click', function() {
	if ($(this).text() === '') {
		$(this).text(player);
		filledSquares++;

		if(vectory($(this))) {
			alert('Player ' + player + ' Won');
			$('#' + player).text(parseInt($('#' + player).text()) + 1);		//increasing winner score
			restart();
			gameOver = true;
		}
		else if (filledSquares === 9) {				//there are no empty squares and no one won
			alert('Draw');
			draw.text(parseInt(draw.text()) + 1);
			restart();
		}

		if (!gameOver) {
			turn.text((player == 'O' ? player = 'X' : player = 'O'));		//change turn
		}
	}
	gameOver = false;
	
	if ($('input[value=onePlayer]').is(':checked')) {
		computerPlay(player, $(this));
	}
});

$('#reset').on('click', function() {
	restart();
});

$('input[name=mode]').on('click', function() {
	restart();
	$('.score').text(0);
});

function vectory(thisElement) {
	thisSquarePosition = thisElement.data('position');
	
	numberOfHerozintalMatches = 0;
	numberOfVerticalMatches = 0;
	numberOfDiagonalTopLeftMatches = 0;
	numberOfDiagonalTopRightMatches = 0;

	for(var i = 1; i <= 3; i++) {
		if($('[data-position='+ thisSquarePosition.split('-')[0] +'-'+ i +']').text() == thisElement.text()) {		//Horizontally
			numberOfHerozintalMatches++;
		}
		
		if ($('[data-position='+ i +'-'+ thisSquarePosition.split('-')[1] +']').text() == thisElement.text()) {		//Vertically
			numberOfVerticalMatches++;
		}

		if ((parseInt(thisSquarePosition.split('-')[0]) - parseInt(thisSquarePosition.split('-')[1]) == 0) &&		//Can be Diagonal
			($('[data-position=' + i + '-' + i + ']').text() == thisElement.text())) {								//1,1 2,2 3,3
				numberOfDiagonalTopLeftMatches++;
		}
		if ((parseInt(thisSquarePosition.split('-')[0]) - parseInt(thisSquarePosition.split('-')[1]) == 2 ||		//Can be Diagonal
			parseInt(thisSquarePosition.split('-')[0]) - parseInt(thisSquarePosition.split('-')[1]) == -2 ||		//Can be Diagonal
			parseInt(thisSquarePosition.split('-')[0]) - parseInt(thisSquarePosition.split('-')[1]) == 0) &&		//Can be Diagonal
			($('[data-position=' + i + '-' + (3 - (i - 1)) + ']').text() == thisElement.text())) {					//1,3 2,2 3,1
				numberOfDiagonalTopRightMatches++;
		}
	}

	if (numberOfHerozintalMatches === threeMatches || numberOfVerticalMatches === threeMatches ||
		numberOfDiagonalTopLeftMatches === threeMatches || numberOfDiagonalTopRightMatches === threeMatches) {
		return true;
	}
}

function restart() {
	square.text('');
	filledSquares = 0;
}