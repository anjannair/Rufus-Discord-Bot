const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'bintodec',
			group: 'dsd',
			memberName: 'bintodec',
			description: 'Convert binary to decimal',
			guildOnly: true,
			args: [{
				key: 'binary',
				prompt: 'Input the binary to convert',
				type: 'integer',
			}]
		});
	}

	async run(message, { binary }) {
		var zap = binary;
		var yam = "" + zap;
		var k = 0;
		var xek = 0;
		var work = 0;
		var uv = 0;
		for (var j = 0; j < yam.length; j++) {
			if (yam.charAt(j) == ".") {
				k = j;
				break;
			}
		}
		if (k == 0) {
			for (var i = 0; i < yam.length; i++) {
				var a = Math.pow(2, yam.length - (i + 1));
				var b = parseInt(yam.charAt(i));
				xek = xek + a * b;

			}
			message.channel.send(xek);
		}
		else {
			for (var i = 0; i < k; i++) {
				var ear = Math.pow(2, k - (i + 1));
				var nose = parseInt(yam.charAt(i));
				xek = xek + ear * nose;

			}
			var a = zap;
			var b = yam.length - k - 1;
			var c = (a % 1).toFixed(b).substring(2);
			var d = "" + c;
			for (var h = 0; h < d.length; h++) {
				var j = h + 1;
				var f = Math.pow(2, -j);
				var g = parseInt(d.charAt(h));
				work = work + f * g;
			}
			message.channel.send(xek + work);
		}
	}
};