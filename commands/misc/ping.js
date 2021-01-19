const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
//basic command to test
module.exports = class ping extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'misc',
			memberName: 'ping',
			description: 'Check the ping of the bot',
			guildOnly: true
		});
	}

	async run(message) {
		var intro = new Discord.MessageEmbed()
			.setTitle('Pinging...')
			.setColor("RANDOM");
		message.channel.send(intro).then(m => {
			// The math thingy to calculate the user's ping
			var ping = m.createdTimestamp - message.createdTimestamp;

			// Basic embed
			var embed = new Discord.MessageEmbed()
				.setTitle(`Your ping is ${ping}`)
				.setColor("RANDOM");
			setTimeout(() => {
				m.edit(embed);
			}, 2000);
		});
	}
};