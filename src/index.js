import Card from './model/card.js';
import Player from './model/player.js';

console.log("Started");

const playerFive = new Player("Mario", ["2D", "JH", "4C", "5S", "6H"]);
const playerSix = new Player("Francesco", ["3H", "3C", "3S", "8H", "4H"]);
console.log(playerFive.getBestHandScore().player.name + ': ' + playerFive.getBestHandScore().key + ': ' + playerFive.getBestHandScore().points)
console.log(playerSix.getBestHandScore().player.name + ': ' + playerSix.getBestHandScore().key + ': ' + playerSix.getBestHandScore().points)