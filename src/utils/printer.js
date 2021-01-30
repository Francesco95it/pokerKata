import constants from "../constants.js";


export function printWinner (playerScore) {
	if (!playerScore) {
		console.log("Tie.");
	} else {
		let basicString = `${playerScore.player.name} wins. - with ${constants.combinationsNames[playerScore.key]}`;
		switch (playerScore.key) {
			case "highestCard": 
				basicString = `${basicString} ${constants.figureNames[playerScore.scoringCards.figure]}`;
				break;
			case "pair": 
				basicString = `${basicString} of ${constants.figureNames[playerScore.scoringCards[0][0].figure]}`;
				break;
			case "twoPairs": 
				basicString = `${basicString} of ${constants.figureNames[playerScore.scoringCards[0][0].figure]} and ${constants.figureNames[playerScore.scoringCards[1][0].figure]}`;
				break;
			case "tris": 
				basicString = `${basicString} of ${constants.figureNames[playerScore.scoringCards[0].figure]}`;
				break;
			case "flush": 
				basicString = `${basicString} of ${constants.suitNames[playerScore.scoringCards[0].suit]}`;
				break;
			case "fullHouse": 
				basicString = `${basicString}: ${constants.figureNames[playerScore.scoringCards.tris[0].figure]} over ${constants.figureNames[playerScore.scoringCards.pair[0].figure]}` ;
				break;
			case "poker": 
				basicString = `${basicString} of ${constants.figureNames[playerScore.scoringCards[0].figure]}`;
				break;
			case "straightFlush": 
				basicString = `${basicString} to ${constants.figureNames[playerScore.scoringCards[0].figure]} of ${constants.suitNames[playerScore.scoringCards[0].suit]}`;
				break;
		}
		console.log(basicString);
	}
}