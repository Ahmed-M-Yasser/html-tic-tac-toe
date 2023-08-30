var chancesInfo = {
	herozental: 0,
	herozentalX: null,
	vertical: 0,
	verticalY: null,
	diagonalTopLeft: 0,
	diagonalTopLeftXminusY: null,
	diagonalTopRight: 0,
	diagonalTopRightXminusY: null
};

function chanceFound(computerTurn) {
	chancesInfo.herozental = 0;
	chancesInfo.herozentalX = null;
	chancesInfo.vertical = 0;
	chancesInfo.verticalY = null;
	chancesInfo.diagonalTopLeft = 0;
	chancesInfo.diagonalTopLeftXminusY = null;
	chancesInfo.diagonalTopRight = 0;
	chancesInfo.diagonalTopRightXminusY = null;

	for (var i = 1; i <= 3; i++) {
		if (chancesInfo.herozental < twoMatches) {		//because it should start from 0 if no matches were found
			chancesInfo.herozental = 0;
		}
		if (chancesInfo.vertical < twoMatches) {
			chancesInfo.vertical = 0;
		}
		for (var j = 1; j <= 3; j++) {
			if ($('[data-position=' + i + '-' + j + ']').text() === computerTurn) {		//Horizontally
				if (chancesInfo.herozental !== twoMatches) {
					chancesInfo.herozental++;
				}
				if (chancesInfo.herozental > 1 && chancesInfo.herozentalX === null) {		//matches found
					chancesInfo.herozentalX = i;
				}
			}
	
			if ($('[data-position=' + j + '-' + i + ']').text() === computerTurn) {		//Vertically
				if (chancesInfo.vertical !== twoMatches) {
					chancesInfo.vertical++;
				}
				if (chancesInfo.vertical > 1 && chancesInfo.verticalY === null) {
					chancesInfo.verticalY = i;
				}
			}

			if ((i - j == 0) &&		//Can be Diagonal
				($('[data-position=' + i + '-' + j + ']').text() == computerTurn)) {								//1,1 2,2 3,3
				chancesInfo.diagonalTopLeft++;
				if (chancesInfo.diagonalTopLeft > 1 && chancesInfo.diagonalTopLeftXminusY === null) {
					chancesInfo.diagonalTopLeftXminusY = (i - j);
				}
			}
			if (((i - j == 2) ||		//Can be Diagonal
				(i - j == -2) ||		//Can be Diagonal
				(i === 2 && j === 2)) &&		//Can be Diagonal
				($('[data-position=' + i + '-' + (3 - (i - 1)) + ']').text() == computerTurn)) {					//1,3 2,2 3,1
				chancesInfo.diagonalTopRight++;
				if (chancesInfo.diagonalTopRight > 1 && chancesInfo.diagonalTopRightXminusY === null) {
					chancesInfo.diagonalTopRightXminusY = (i - j);
				}
			}
		}
	}
	if (takeTheChance()) {		//found chance, and took it (won)
		return true;
	}
}

function takeTheChance() {
	if (chancesInfo.herozental === twoMatches) {
		for(var i = 1; i <= 3; i++) {
			if ($('[data-position=' + chancesInfo.herozentalX + '-' + i + ']').text() === '') {
				$('[data-position=' + chancesInfo.herozentalX + '-' + i + ']').click();
				return true;
			}
		}
	}
	if (chancesInfo.vertical === twoMatches) {
		for(var i = 1; i <= 3; i++) {
			if ($('[data-position=' + i + '-' + chancesInfo.verticalY + ']').text() === '') {
				$('[data-position=' + i + '-' + chancesInfo.verticalY + ']').click();
				return true;
			}
		}
	}
	if (chancesInfo.diagonalTopLeft === twoMatches && chancesInfo.diagonalTopLeftXminusY === 0) {
		for(var i = 1; i <= 3; i++) {
			for(var j = 1; j <= 3; j++) {
				if ((i - j == 0) && ($('[data-position=' + i + '-' + j + ']').text() === '')) {		//Can be Diagonal
					$('[data-position=' + i + '-' + j + ']').click();
					return true;
				}
			}
		}
	}
	if (chancesInfo.diagonalTopRight === twoMatches && (chancesInfo.diagonalTopRightXminusY === 2 ||
		chancesInfo.diagonalTopRightXminusY === -2 || chancesInfo.diagonalTopRightXminusY === 0)) {
		for(var i = 1; i <= 3; i++) {
			for(var j = 1; j <= 3; j++) {
				if (((i - j == 2) || (i - i == -2)) && ($('[data-position=' + i + '-' + (3 - (i - 1)) + ']').text() === '')) {		//Can be Diagonal
					$('[data-position=' + i + '-' + (3 - (i - 1)) + ']').click();
					return true;
				}
			}
		}
	}
}