import Card from '../src/model/card.js';
import Hand from '../src/model/hand.js';
import Player from '../src/model/player.js';
import assert from 'assert';
import Match from '../src/model/match.js';

describe('Card', function () {
	describe('Create card from AH', function () {
		it('should return A for card value and H for suit', function () {
			const card = new Card().fromString('AH');
			assert.strictEqual(card.figure, 'A');
			assert.strictEqual(card.suit, 'H');
		});
	});
	describe('Card equals another card', function () {
		it('Should return true only for same card', function () {
			const cardOne = new Card().fromString('AH');
			const cardTwo = new Card().fromString('AH');
			assert.strictEqual(cardOne.equals(cardTwo), true)
			const cardThree = new Card().fromString('3C');
			const cardFour = new Card().fromString('5D');
			assert.strictEqual(cardThree.equals(cardFour), false)
		});
	});
});

describe('Hand', function () {
	describe('Highest card in hand', function() {
		it('Should return the highest card for each hand', function () {
			const handOne = new Hand(["2C","3H","AH","8C","4C"]);
			const handTwo = new Hand(["2D","3H","5C","9S","KH"]);
			assert.strictEqual(handOne.getHighestCard().stringValue, "AH");
			assert.strictEqual(handTwo.getHighestCard().stringValue, "KH");
		})
	})
	describe('Has pair in hand', function () {
		it('Should return an array of cards which forms the pair if a pair is present, null otherwise', function () {
			const handOne = new Hand(["4C", "3H", "AH", "8C", "4C"]);
			const handTwo = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasPair().length, 1);
			assert.strictEqual(handTwo.hasPair(), null);
		})
	})
	describe('Has two pairs in hand', function () {
		it('Should return an array of cards with the two pairs if exists, null otherwise', function () {
			const handOne = new Hand(["4C", "3H", "AH", "3C", "4H"]);
			const handTwo = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasTwoPairs().length, 2);
			assert.strictEqual(handTwo.hasTwoPairs(), null);
		})
	})
	describe('Has a tris in hand', function () {
		it('Should return an array of cards with the three cards of the tris if exists, null otherwise', function () {
			const handOne = new Hand(["4C", "3H", "3C", "3S", "4H"]);
			const handTwo = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasTris().length, 3);
			assert.strictEqual(handTwo.hasTris(), null);
		})
	})
	describe('Has a straight in hand', function () {
		it('Should return an array of cards forming the straight if exists, null otherwise', function () {
			const handOne = new Hand(["3C", "4H", "5C", "6S", "7H"]);
			const handTwo = new Hand(["9C", "TH", "JC", "QS", "KH"]);
			const handThree = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasStraight().length, 5);
			assert.strictEqual(handTwo.hasStraight().length, 5);
			assert.strictEqual(handThree.hasStraight(), null);
		})
	})
	describe('Has a flush in hand', function () {
		it('Should return an array of cards forming the flush if exists, null otherwise', function () {
			const handOne = new Hand(["AH", "4H", "9H", "6H", "7H"]);
			const handTwo = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasFlush().length, 5);
			assert.strictEqual(handTwo.hasFlush(), null);
		})
	})
	describe('Has a full house in hand', function () {
		it('Should return an object containing tris and pair forming the full house if exists, null otherwise', function () {
			const handOne = new Hand(["AH", "4H", "AC", "AS", "4C"]);
			const handTwo = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasFullHouse().pair.length, 2);
			assert.strictEqual(handOne.hasFullHouse().tris.length, 3);
			assert.strictEqual(handTwo.hasFullHouse(), null);
		})
	})
	describe('Has a poker in hand', function () {
		it('Should return an array of cards forming the poker if exists, null otherwise', function () {
			const handOne = new Hand(["4H", "4H", "4S", "4C", "7H"]);
			const handTwo = new Hand(["4H", "7H", "4H", "4S", "4C"]);
			const handThree = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasPoker().length, 4);
			assert.strictEqual(handTwo.hasPoker().length, 4);
			assert.strictEqual(handThree.hasPoker(), null);
		})
	})
	describe('Has a straight flush in hand', function () {
		it('Should return an array of cards forming the straight flush if exists, null otherwise', function () {
			const handOne = new Hand(["4H", "5H", "6H", "7H", "8H"]);
			const handTwo = new Hand(["AH", "QH", "TH", "KH", "JH"]);
			const handThree = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasStraightFlush().length, 5);
			assert.strictEqual(handTwo.hasStraightFlush().length, 5);
			assert.strictEqual(handThree.hasStraightFlush(), null);
		})
	})
})

describe('Player', function () {
	describe('Get score for player', function () {
		it('Should return the correct hand name based on players cards', function () {
			const playerOne = new Player("Francesco", ["2H", "3H", "AH", "8H", "4H"]);
			const playerTwo = new Player("Mario", ["2D", "3H", "4C", "5S", "6H"]);
			assert.strictEqual(playerOne.getBestHandScore().key, "flush");
			assert.strictEqual(playerTwo.getBestHandScore().key, "straight");
			assert.strictEqual(playerOne.getBestHandScore().points > playerTwo.getBestHandScore().points, true);
		})
	})
})

describe('Match', function () {
	describe('Get the match winner', function () {
		it('Should return the correct winner without having a tie', function () {
			// Flush vs Straight
			const playerOne = new Player("Francesco", ["2H", "3H", "AH", "8H", "4H"]);
			const playerTwo = new Player("Mario", ["2D", "3H", "4C", "5S", "6H"]);
			const matchOne = new Match([playerOne, playerTwo]);
			assert.strictEqual(matchOne.computeMatch().player.name, "Francesco");

			// Straight vs Tris
			const playerThree = new Player("Francesco", ["2D", "3H", "4C", "5S", "6H"]);
			const playerFour = new Player("Mario", ["3H", "3C", "3S", "8H", "4H"]);
			const matchTwo = new Match([playerThree, playerFour]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");

			// High Card vs Tris
			const playerFive = new Player("Mario", ["2D", "JH", "4C", "5S", "6H"]);
			const playerSix = new Player("Francesco", ["3H", "3C", "3S", "8H", "4H"]);
			const matchThree = new Match([playerFive, playerSix]);
			assert.strictEqual(matchThree.computeMatch().player.name, "Francesco");
		})
	})
})