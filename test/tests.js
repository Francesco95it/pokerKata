// const Card = require('../src/model/card');
import Card from '../src/model/card.js';
import Hand from '../src/model/hand.js';
import assert from 'assert';

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
		it('Should return the figure of the pair if a pair is present, null otherwise', function () {
			const handOne = new Hand(["4C", "3H", "AH", "8C", "4C"]);
			const handTwo = new Hand(["2D", "3H", "5C", "9S", "KH"]);
			assert.strictEqual(handOne.hasPair().figure, "4");
			assert.strictEqual(handTwo.hasPair(), null);
		})
	})
})