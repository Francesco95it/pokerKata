import constants from "../constants.js";


export function printWinner (playerScore) {
	if (!playerScore) {
		console.log("Tie.");
	} else {
		let compositeString = playerScore.player.name + " wins. - with " + constants.combinationsNames[playerScore.key];
		switch (playerScore.key) {
			case "highestCard": 
				compositeString+=": " + constants.figureNames[playerScore.scoringCards.figure];
				break;
			case "pair": 
				compositeString += " of " + constants.figureNames[playerScore.scoringCards[0][0].figure];
				break;
			case "twoPairs": 
				compositeString += " of " + constants.figureNames[playerScore.scoringCards[0][0].figure] + " and " + constants.figureNames[playerScore.scoringCards[1][0].figure];
				break;
			case "tris": 
				compositeString += " of " + constants.figureNames[playerScore.scoringCards[0].figure];
				break;
			case "flush": 
				compositeString += " of " + constants.suitNames[playerScore.scoringCards[0].suit];
				break;
			case "fullHouse": 
				compositeString += ": " + constants.figureNames[playerScore.scoringCards.tris[0].figure] + " over " + constants.figureNames[playerScore.scoringCards.pair[0].figure] ;
				break;
			case "poker": 
				compositeString += " of " + constants.figureNames[playerScore.scoringCards[0].figure];
				break;
			case "straightFlush": 
				compositeString += " to " + constants.figureNames[playerScore.scoringCards[0].figure] + " of " + constants.suitNames[playerScore.scoringCards[0].suit];
				break;
		}
		console.log(compositeString);
	}
}