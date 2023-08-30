var middleSquare = $('[data-position=2-2]'),
	herozentalCounter = 0,
	verticalCounter = 0,
	diagonalTopLeftCounter = 0,
	diagonalTopRightCounter = 0,
	wasCornersFull = false,
	didntPlayAtCorner;

function computerPlay(playerTurn, thisSquare) {
	herozentalCounter = 0;
	verticalCounter = 0;
	diagonalTopLeftCounter = 0;
	diagonalTopRightCounter = 0;

	if (playerTurn === 'X') {
		if (chanceFound(playerTurn)) {		//chance for "computer" found
			return;
		}

		if (middleSquare.text() === '') {		//2,2 is empty
			middleSquare.click();
		}
		else if (numberOfHerozintalMatches < twoMatches && numberOfVerticalMatches < twoMatches &&
			numberOfDiagonalTopLeftMatches < twoMatches && numberOfDiagonalTopRightMatches < twoMatches) {
			playAtCorners();																								//No matches yet, so play at corner
		}
		else if (numberOfHerozintalMatches === twoMatches) {																			//Herozntal matches found
			for(var i = 1; i <= 3; i++) {
				if ($('[data-position='+ thisSquare.data('position').split('-')[0] +'-'+ i +']').text() === '') {			//fill the empty one
					$('[data-position='+ thisSquare.data('position').split('-')[0] +'-'+ i +']').click();
					break;
				}
				else if ($('[data-position='+ thisSquare.data('position').split('-')[0] +'-'+ i +']').text() !== '') {
					herozentalCounter++;
				}
				if (herozentalCounter === 3) {																				//current herozntal is full
					for(var j = 1; j <= 3; j++) {
						if (defendVertical(thisSquare, j)) {
							return;
						}
						if (defendDiagonalTopLeft(thisSquare, j)) {
							return;
						}
						if (defendDiagonalTopRight(thisSquare, j)) {
							return;
						}
					}
					didntPlayAtCorner = playAtCorners();																	//play at corner
					if (didntPlayAtCorner) {																				//check if all corners are filled
						fillEmpty();																				//play at 1,2 2,1 2,3 3,2 (empty)
					}
					break;
				}
			}//alert(thisSquare.data('position'));
		}
		else if (numberOfVerticalMatches === twoMatches) {
			for(var i = 1; i <= 3; i++) {
				if ($('[data-position='+ i +'-'+ thisSquare.data('position').split('-')[1] +']').text() === '') {
					$('[data-position='+ i +'-'+ thisSquare.data('position').split('-')[1] +']').click();
					break;
				}
				else if ($('[data-position='+ i +'-'+ thisSquare.data('position').split('-')[1] +']').text() !== '') {
					verticalCounter++;
				}
				if (verticalCounter === 3) {
					for(var j = 1; j <= 3; j++) {
						if (defendHerozental(thisSquare, j)) {
							return;
						}
						if (defendDiagonalTopLeft(thisSquare, j)) {
							return;
						}
						if (defendDiagonalTopRight(thisSquare, j)) {
							return;
						}
					}
					didntPlayAtCorner = playAtCorners();
					if (didntPlayAtCorner) {
						fillEmpty();
					}
					break;
				}
			}
		}
		else if (numberOfDiagonalTopLeftMatches === twoMatches) {
			for(var i = 1; i <= 3; i++) {
				if ($('[data-position=' + i + '-' + i + ']').text() === '') {
					$('[data-position=' + i + '-' + i + ']').click();
					break;
				}
				else if ($('[data-position=' + i + '-' + i + ']').text() !== '') {
					diagonalTopLeftCounter++;
				}
				if (diagonalTopLeftCounter === 3) {
					for(var j = 1; j <= 3; j++) {
						if (defendHerozental(thisSquare, j)) {
							return;
						}
						if (defendVertical(thisSquare, j)) {
							return;
						}
						if (defendDiagonalTopRight(thisSquare, j)) {
							return;
						}
					}
					didntPlayAtCorner = playAtCorners();
					if (didntPlayAtCorner) {
						fillEmpty();
					}
					break;
				}
			}
		}
		else if (numberOfDiagonalTopRightMatches === twoMatches) {
			for(var i = 1; i <= 3; i++) {
				if ($('[data-position=' + i + '-' + (3 - (i - 1)) + ']').text() === '') {
					$('[data-position=' + i + '-' + (3 - (i - 1)) + ']').click();
					break;
				}
				else if ($('[data-position=' + i + '-' + (3 - (i - 1)) + ']').text() !== '') {
					diagonalTopRightCounter++;
				}
				if (diagonalTopRightCounter === 3) {
					for(var j = 1; j <= 3; j++) {
						if (defendHerozental(thisSquare, j)) {
							return;
						}
						if (defendVertical(thisSquare, j)) {
							return;
						}
						if (defendDiagonalTopLeft(thisSquare, j)) {
							return;
						}
					}
					didntPlayAtCorner = playAtCorners();
					if (didntPlayAtCorner) {
						fillEmpty();
					}
					break;
				}
			}
		}
	}
}

function defendHerozental(thisSquare, i) {
	if ($('[data-position='+ thisSquare.data('position').split('-')[0] +'-'+ i +']').text() === '') {			//fill the empty one
		$('[data-position='+ thisSquare.data('position').split('-')[0] +'-'+ i +']').click();
		return true;
	}
}
function defendVertical(thisSquare, i) {
	if ($('[data-position='+ i +'-'+ thisSquare.data('position').split('-')[1] +']').text() === '') {
		$('[data-position='+ i +'-'+ thisSquare.data('position').split('-')[1] +']').click();
		return true;
	}
}
function defendDiagonalTopLeft(thisSquare, i) {
	if ($('[data-position=' + i + '-' + i + ']').text() === '') {
		$('[data-position=' + i + '-' + i + ']').click();
		return true;
	}
}
function defendDiagonalTopRight(thisSquare, i) {
	if ($('[data-position=' + i + '-' + (3 - (i - 1)) + ']').text() === '') {
		$('[data-position=' + i + '-' + (3 - (i - 1)) + ']').click();
		return true;
	}
}

function playAtCorners() {
	wasCornersFull = true;
	for(var i = 1; i <= 3; i++) {
		if ($('[data-position=' + i + '-' + i + ']').text() === '') {
			$('[data-position=' + i + '-' + i + ']').click();
			wasCornersFull = false;
			break;
		}
		else if ($('[data-position=' + i + '-' + (3 - (i - 1)) + ']').text() === '') {
			$('[data-position=' + i + '-' + (3 - (i - 1)) + ']').click();
			wasCornersFull = false;
			break;
		}
	}
	return wasCornersFull;
}

function fillEmpty() {
	for(var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			if ($('[data-position=' + i + '-' + j + ']').text() === '') {
				$('[data-position=' + i + '-' + j + ']').click();
				return;
			}
		}
	}
}