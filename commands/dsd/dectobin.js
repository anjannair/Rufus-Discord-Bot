const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'dectobin',
			group: 'dsd',
			memberName: 'dectobin',
			description: 'Convert decimal to binary',
			guildOnly: true,
			args: [{
				key: 'decimal',
				prompt: 'Input the decimal to convert',
				type: 'integer',
			}]
		});
	}

	async run(message, { decimal }) {
		var ant = decimal;
		var boy = "" + ant;
		var cat = "";
		var lol = 0;
		for (var i = 0; i < boy.length; i++) {
			if (boy.charAt(i) == ".") {
				lol++;//counter for demcial
				break;
			}
			cat = cat + boy.charAt(i);
		}
		var fur = "";
		var goat = "";
		var dog = parseInt(cat);
		var hat = (ant % 1).toFixed(2);//calculates 2 decimal places
		var ice = Math.floor(hat * 2);
		var joke = (ant % 1).toFixed(1);//calculates 1 decimal place
		var king = Math.floor(joke * 2);

		while (dog >= 1) {
			var ear = dog % 2;
			fur = fur + ear;
			dog = Math.floor(dog / 2);
		}

		for (var i = fur.length; i >= 0; i--) {
			goat = goat + fur.charAt(i);
		}

		if (lol == 0) message.channel.send(goat);//if no decimal
		if (lol == 1) message.channel.send(goat + "." + ice + "" + king);//if decimal
	}
};