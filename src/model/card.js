const figureValues = {
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"T": 10,
	"J": 11,
	"Q": 12,
	"K": 13,
	"A": 14,
}

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
		return figureValues[this.figure];
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