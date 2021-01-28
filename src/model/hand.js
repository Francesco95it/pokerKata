import Card from "./card.js"

export default function Hand (cardsArray) {
	this.cards = cardsArray.map(card => {
		if (!(card instanceof Card)) {
			return new Card().fromString(card)
		}
		return card;
	})
	
	this.getHighestCard = () => {
		return this.cards.reduce((cardOne, cardTwo) => {
			if (cardOne.getFigureValue() > cardTwo.getFigureValue()) {
				return cardOne;
			}
			return cardTwo;
		})
	}

	this.hasPair = () => {
		for (const card of this.cards) {
			const filteredArrayPerFigure = this.cards.filter(currentCard => card.figure === currentCard.figure);
			if (filteredArrayPerFigure.length > 1) {
				return filteredArrayPerFigure[0];
			}
		}
		return null;
	}

	this.hasTwoPairs = () => {

	}
	this.hasTris = () => {

	}
	this.hasStraight = () => {

	}
	this.hasFlush = () => {

	}
	this.hasFullHouse = () => {

	}
	this.hasPoker = () => {

	}
	this.hasStraightFlush = () => {

	}
}