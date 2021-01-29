import constants from '../constants.js'

export default function Card (figure, suit) {
	this.figure = figure || '';
	this.suit = suit || '';
	this.stringValue = this.figure + this.suit;

	this.fromString = (figureSuit) => {
		this.figure = figureSuit[0];
		this.suit = figureSuit[1];
		this.stringValue = figureSuit;
		return this;
	}

	this.getFigureValue = () => {
		return constants.figureValues[this.figure];
	}

	this.equals = (card) => {
		if (card instanceof Card) {
			return (card.stringValue === this.stringValue);
		}
		return false;
	}

	this.equalsFigure = (card) => {
		if (card instanceof Card) {
			return (card.figure === this.figure);
		}
		return false;
	}

}