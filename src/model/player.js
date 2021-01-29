import Hand from "./hand.js";
import constants from '../constants.js'

function Score(key, scoringCards, points, player) {
	this.key = key || '';
	this.scoringCards = scoringCards || '';
	this.points = points || '';
	this.player = player || {};
}

export default function Player(name, cards) {
	this.name = name || 'Mario';
	this.cards = cards || [];
	this.hand = new Hand(this.cards);

	this.getBestHandScore = () => {
		const scores = [
			new Score('highestCard', this.hand.getHighestCard(), constants.handPoints['highestCard'], this),
			new Score('pair', this.hand.hasPair(), constants.handPoints['pair'], this),
			new Score('twoPairs', this.hand.hasTwoPairs(), constants.handPoints['twoPairs'], this),
			new Score('tris', this.hand.hasTris(), constants.handPoints['tris'], this),
			new Score('straight', this.hand.hasStraight(), constants.handPoints['straight'], this),
			new Score('flush', this.hand.hasFlush(), constants.handPoints['flush'], this),
			new Score('fullHouse', this.hand.hasFullHouse(), constants.handPoints['fullHouse'], this),
			new Score('poker', this.hand.hasPoker(), constants.handPoints['poker'], this),
			new Score('straightFlush', this.hand.hasStraightFlush(), constants.handPoints['straightFlush'], this),
		]
		return scores
			.filter(score => score.scoringCards)
			.sort((handA, handB) => handB.points - handA.points)[0];
	}
}