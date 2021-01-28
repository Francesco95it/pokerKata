import Card from './model/card.js';
import Hand from './model/hand.js';

const cardFromString = new Card().fromString('AH');
const newCard = new Card('A', 'H');

const handOne = new Hand(["2D", "3H", "5C", "9S", "3H"]);
console.log(handOne.hasPair());