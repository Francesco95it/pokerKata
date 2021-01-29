
export default function Match(players) {
	this.players = players || [];


	this.computeMatch = () => {
		const scoresDescendant = this.computeScores(),
			winnerScore = this.getWinner(scoresDescendant);

		this.printWinner(winnerScore);
		return winnerScore;
	}
	
	this.computeScores = () => {
		return this.players
			.map(player => player.getBestHandScore())
			.sort((playerA, playerB) => playerB.points - playerA.points);
	}

	this.getWinner = (scoresDescendantArray) => {
		const tiePlayersScores = [];
		for (let idx = 0; idx < scoresDescendantArray.length -1; idx++) {
			const currScore = scoresDescendantArray[idx],
				nextScore = scoresDescendantArray[idx+1];
			if (currScore.points === nextScore) {
				tiePlayersScores.push(currScore);
				tiePlayersScores.push(nextScore);
				idx++;
			} else {
				return currScore;
			}
		}
		return compareTies(tiePlayersScores);
	}

	this.compareTies = (tiePlayersScores) => {
		const tieType = tiePlayersScores[0].key;
		return this.computeTieWinner[tieType].call(tiePlayersScores);
	}

	this.computeTieWinner = {
		highestCard: (playersScore) => {
			return playersScore.scoringCards[0].getFigureValue();
		},
		pair: (playersScore) => {

		},
		twoPairs: (playersScore) => {

		},
		tris: (playersScore) => {

		},
		straight: (playersScore) => {

		},
		flush: (playersScore) => {

		},
		fullHouse: (playersScore) => {

		},
		poker: (playersScore) => {

		},
		straightFlush: (playersScore) => {

		}
	}

	this.printWinner = (playerScore, winningCard) => {
		if (playerScore === -1) {
			return "Tie.";
		}
		return playerScore.player.name + " wins. - with " + playerScore.key;
	}

}