import {printWinner} from '../utils/printer.js';

export default function Match(players) {
	this.players = players || [];


	this.computeMatch = (printResults) => {
		const scoresDescendant = this.computeScores(),
			winnerScore = this.getWinner(scoresDescendant);

		if (printResults) {
			printWinner(winnerScore);
		}
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
			if (currScore.points === nextScore.points) {
				tiePlayersScores.push(currScore);
				tiePlayersScores.push(nextScore);
				idx++;
			} else {
				return currScore;
			}
		}
		return this.compareTies(tiePlayersScores);
	}

	this.compareTies = (tiePlayersScores) => {
		const tieType = tiePlayersScores[0].key;
		return this.computeTieWinner[tieType].apply(this, [tiePlayersScores]);
	}

	this.helperFn = {
		getPlayerWithHighestCard: (playersScores) => {
			
			playersScores.forEach(score => {
				score.player.cards.sort((cardA, cardB) => cardB.getFigureValue() - cardA.getFigureValue())
			});

			for (let idx = 0; idx < playersScores[0].player.cards.length; idx++) {
				const higherCardValue = playersScores
					.reduce((higherCardValue, currScore) => Math.max(higherCardValue, currScore.player.cards[idx].getFigureValue()), 0);

				const playersWithHighestCard = playersScores.filter(score => score.player.cards[idx].getFigureValue() === higherCardValue);
				if (playersWithHighestCard.length === 1) {
					return playersWithHighestCard[0];
				}
			}
			return null;
		},
		getPlayerWithHighestPair: (playersScores) => {
			playersScores.forEach(score => {
				score.scoringCards.sort((pairA, pairB) => {
					return pairB[0].getFigureValue() - pairA[0].getFigureValue();
				})
			})

			for (let idx = 0; idx < playersScores[0].scoringCards.length; idx++) {
				const higherPairValue = playersScores
					.reduce((higherPairValue, currScore) => {
						return Math.max(higherPairValue, currScore.scoringCards[idx][0].getFigureValue());
					}, 0);

				const playersWithHighestCard = playersScores.filter(score => score.scoringCards[idx][0].getFigureValue() === higherPairValue);
				if (playersWithHighestCard.length === 1) {
					return playersWithHighestCard[0];
				}
			}
			return null;
		},
		getPlayersWithHighestTris: (playersScores, isFullHouse = false) => {
			const higherTrisValue = playersScores
				.reduce((higherTrisValue, currScore) => {
					let currScoreTrisValue = isFullHouse ? currScore.scoringCards.tris[0].getFigureValue() : currScore.scoringCards[0].getFigureValue();
					return Math.max(higherTrisValue, currScoreTrisValue);
				}, 0);

			return playersScores.filter(score => 
				isFullHouse ? score.scoringCards.tris[0].getFigureValue() === higherTrisValue : score.scoringCards[0].getFigureValue() === higherTrisValue
			);
		}
	}

	this.computeTieWinner = {
		highestCard: (playersScores) => {
			return this.helperFn.getPlayerWithHighestCard(playersScores);
		},
		pair: (playersScores) => {
			const playerWithHighestPair = this.helperFn.getPlayerWithHighestPair(playersScores);

			if (!playerWithHighestPair) {
				playersScores.forEach(score => {
					const pairedCards = score.scoringCards.flat().map(card => card.stringValue);
					score.player.cards.filter(card => pairedCards.indexOf(card.stringValue) === -1)
				});
			
				return this.helperFn.getPlayerWithHighestCard(playersScores);
			}
			
			return playerWithHighestPair;
		},
		twoPairs: (playersScores) => {
			return this.computeTieWinner.pair(playersScores);
		},
		tris: (playersScores) => {
			const playerWithHighestTris = this.helperFn.getPlayersWithHighestTris(playersScores);
			if (playerWithHighestTris.length > 1) {
				playersScores.forEach(score => {
					const pairedCards = score.scoringCards.flat().map(card => card.stringValue);
					score.player.cards.filter(card => pairedCards.indexOf(card.stringValue) === -1)
				});

				return this.helperFn.getPlayerWithHighestCard(playersScores);
			}
			return playerWithHighestTris;
		},
		straight: (playersScores) => {
			let highestScore = {
				score: null,
				points: 0
			};
			for (const score of playersScores) {
				const playerStraightPoint = score.scoringCards.reduce((sum, card) => sum + card.getFigureValue(), 0);
				if (highestScore.points < playerStraightPoint) {
					highestScore.points = playerStraightPoint;
					highestScore.score = score;
				}
			}
			return highestScore.score;
		},
		flush: (playersScores) => {
			return this.helperFn.getPlayerWithHighestCard(playersScores);
		},
		fullHouse: (playersScores) => {
			return this.helperFn.getPlayersWithHighestTris(playersScores, true)[0];
		},
		poker: (playersScores) => {
			const highestPokerValue = playersScores
				.reduce((highestPokerValue, currScore) => Math.max(highestPokerValue, currScore.scoringCards[0].getFigureValue()), 0);

			return playersScores.find(score => score.scoringCards[0].getFigureValue() === highestPokerValue);
		},
		straightFlush: (playersScores) => {
			return this.helperFn.getPlayerWithHighestCard(playersScores);
		}
	}

}