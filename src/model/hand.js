import Card from "./card.js"

export default function Hand (cardsArray) {
	this.cards = cardsArray.map(card => {
		if (!(card instanceof Card)) {
			return new Card().fromString(card)
		}
		return card;
	})
	
	this.helperFn = {
		getHighestCard: (cardsArray) => {
			return cardsArray.reduce((cardOne, cardTwo) => {
				if (cardOne.getFigureValue() > cardTwo.getFigureValue()) {
					return cardOne;
				}
				return cardTwo;
			})
		},
		getPairs: (cardsArray) => {
			let foundPairs = [];
			const sortedCards = cardsArray.sort((a, b) => a.getFigureValue() - b.getFigureValue());
			for (let idx = 0; idx < (sortedCards.length - 1); idx++) {
				const currCard = sortedCards[idx],
					nextCard = sortedCards[idx + 1];
				if (currCard.equalsFigure(nextCard)) {
					idx++;
					foundPairs.push([currCard, nextCard]);
				}
			}
			return foundPairs.length ? foundPairs : null;
		},
		getTris: (cardsArray) => {
			for (let idx = 0; idx < (cardsArray.length - 2); idx++) {
				const currCard = cardsArray[idx],
					filteredCards = cardsArray.filter(card => card.figure === currCard.figure);

				if (filteredCards.length === 3) return filteredCards;
			}
			return null;
		}
	}

	this.getHighestCard = () => {
		return this.helperFn.getHighestCard(this.cards);
	}
	
	this.hasPair = () => {
		return this.helperFn.getPairs(this.cards);
	}

	this.hasTwoPairs = () => {
		const cardsPaired = this.helperFn.getPairs(this.cards);
		return cardsPaired && cardsPaired.length === 2 ? cardsPaired : null;
	}
	this.hasTris = () => {
		return this.helperFn.getTris(this.cards);
	}
	this.hasStraight = () => {
		const sortedCards = this.cards.sort((a, b) => a.getFigureValue() - b.getFigureValue());
		for (let idx = 0; idx < (sortedCards.length - 1); idx++) {
			const currCard = sortedCards[idx],
				nextCard = sortedCards[idx + 1];
			if(currCard.getFigureValue()+1 !== nextCard.getFigureValue()) return null;
		}
		return this.cards;
	}
	this.hasFlush = () => {
		return this.cards.filter(card => card.suit === this.cards[0].suit).length === 5 ? this.cards : null;
	}
	this.hasFullHouse = () => {
		const trisCards = this.helperFn.getTris(this.cards);
		if (trisCards) {
			const pairCards = this.helperFn.getPairs(this.cards.filter(card => trisCards.map(trisCard => trisCard.stringValue).indexOf(card.stringValue)===-1));
			if (pairCards) {
				return {
					tris: trisCards,
					pair: pairCards[0]
				}
			}
		}
		return null;
	}
	this.hasPoker = () => {
		// To review
		// Change card equalities to .equals
		const firstCardSimilarity = this.cards.filter(card => card.figure === this.cards[0].figure),
			secondCardSimilarity = this.cards.filter(card => card.figure === this.cards[1].figure);
		
		if (firstCardSimilarity.length === 4) return firstCardSimilarity;
		if (secondCardSimilarity.length === 4) return secondCardSimilarity;
		return null;
	}
	this.hasStraightFlush = () => {
		return this.hasStraight() && this.hasFlush() ? this.cards : null;
	}
}