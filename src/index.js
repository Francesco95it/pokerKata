import Match from './model/match.js';
import Player from './model/player.js';
import fs from 'fs';
import readline from 'readline';
import constants from './constants.js'

console.log("Poker Kata Started");

const lineReader = readline.createInterface({
	input: fs.createReadStream('./matches.txt')
});

const lineToMatch = (line) => {

	const playersAsStrings = line.split("  "),
		players = [];
		
	for (const stringPlayer of playersAsStrings) {
		const [playerName, card1, card2, card3, card4, card5] = stringPlayer.replace(':', '').split(' ');
		players.push(new Player(
			playerName, [card1, card2, card3, card4, card5]
		))
	}
	
	new Match(players).computeMatch(true);
}

lineReader.on('line', function (line) {
	lineToMatch(line);
});