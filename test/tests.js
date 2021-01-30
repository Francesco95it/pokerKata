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
		it('Should return the correct winner having a tie of higher cards', function () {
			// High Card J vs A 
			const playerOne = new Player("Mario", ["2D", "JH", "4C", "5S", "6H"]);
			const playerTwo = new Player("Francesco", ["7H", "AC", "3S", "8H", "4H"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// High Card A - J vs A - K 
			const playerThree = new Player("Mario", ["2D", "JH", "AC", "5S", "6H"]);
			const playerFour = new Player("Francesco", ["7H", "AC", "KS", "8H", "4H"]);
			const matchTwo = new Match([playerThree, playerFour]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of pairs', function () {
			// Pair 6 vs Pair of 8 
			const playerOne = new Player("Mario", ["6D", "2H", "4C", "5S", "6H"]);
			const playerTwo = new Player("Francesco", ["2H", "8C", "3S", "8H", "4H"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Pairs of 2 - Wins High card 8 
			const playerThree = new Player("Mario", ["2D", "2H", "4C", "5S", "6H"]);
			const playerFour = new Player("Francesco", ["2H", "2C", "3S", "8H", "4H"]);
			const matchTwo = new Match([playerThree, playerFour]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
			// Pairs of J - same A - wins K 
			const playerFive = new Player("Mario", ["JD", "JH", "AC", "5S", "6H"]);
			const playerSix = new Player("Francesco", ["JH", "AC", "KS", "JH", "4H"]);
			const matchThree = new Match([playerFive, playerSix]);
			assert.strictEqual(matchThree.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of two pairs', function () {
			// Pair of J and 2 vs Pair of 6 and 3 
			const playerOne = new Player("Francesco", ["JD", "JH", "2C", "2S", "6H"]);
			const playerTwo = new Player("Mario", ["6H", "6C", "3S", "3H", "4H"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Two Pairs of J and 2 - wins K 
			const playerThree = new Player("Mario", ["JD", "JH", "2C", "2S", "6H"]);
			const playerFour = new Player("Francesco", ["JC", "KC", "2S", "JH", "2H"]);
			const matchTwo = new Match([playerThree, playerFour]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
			// Pair of J and 5 vs Pair of J and 9 
			const playerFive = new Player("Mario", ["JD", "JH", "5C", "5S", "6H"]);
			const playerSix = new Player("Francesco", ["JH", "JC", "9S", "9H", "4H"]);
			const matchThree = new Match([playerFive, playerSix]);
			assert.strictEqual(matchThree.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of two tris', function () {
			// Tris of 3 vs Tris of J 
			const playerOne = new Player("Francesco", ["JD", "JH", "2C", "2S", "6H"]);
			const playerTwo = new Player("Mario", ["6H", "6C", "3S", "3H", "4H"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Two Tris of J - wins K high card 
			const playerThree = new Player("Mario", ["JD", "JH", "JC", "2S", "6H"]);
			const playerFour = new Player("Francesco", ["JC", "KC", "JS", "JH", "2H"]);
			const matchTwo = new Match([playerThree, playerFour]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of straights', function () {
			// Straight to J vs Straight to A
			const playerOne = new Player("Mario", ["7D", "8H", "TC", "9S", "JH"]);
			const playerTwo = new Player("Francesco", ["AH", "KC", "JS", "QH", "TH"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Straight to A vs Straight to J
			const matchTwo = new Match([playerTwo, playerOne]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of flushes', function () {
			// Flush of H with high J vs of C with high A
			const playerOne = new Player("Mario", ["7H", "8H", "3H", "TH", "JH"]);
			const playerTwo = new Player("Francesco", ["AC", "KC", "3C", "QC", "4C"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Flush of H with high A vs of C with high J
			const matchTwo = new Match([playerTwo, playerOne]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of full house', function () {
			// Full house of T over 3 vs K over 7
			const playerOne = new Player("Mario", ["TC", "3C", "3H", "TH", "TD"]);
			const playerTwo = new Player("Francesco", ["KC", "7C", "7H", "KH", "KD"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Full house of K over 7 vs T over 3
			const matchTwo = new Match([playerTwo, playerOne]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of pokers', function () {
			// Poker of 4 vs Poker of J
			const playerOne = new Player("Mario", ["4C", "4H", "4D", "4S", "TD"]);
			const playerTwo = new Player("Francesco", ["KC", "JC", "JH", "JS", "JD"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Poker of J vs Poker of 4
			const matchTwo = new Match([playerTwo, playerOne]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
		})
		it('Should return the correct winner having a tie of straight flushes', function () {
			// Straight flush of C to J vs D to A
			const playerOne = new Player("Mario", ["JC", "8C", "TC", "9C", "7C"]);
			const playerTwo = new Player("Francesco", ["TD", "KD", "QD", "AD", "JD"]);
			const match = new Match([playerOne, playerTwo]);
			assert.strictEqual(match.computeMatch().player.name, "Francesco");
			// Straight flush of D to A vs C to J
			const matchTwo = new Match([playerTwo, playerOne]);
			assert.strictEqual(matchTwo.computeMatch().player.name, "Francesco");
		})
	})
})