const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'discord',
			group: 'newbie',
			memberName: 'discord',
			description: 'A mini user manual about Discord',
			guildOnly: true,
		});
	}

	async run(message) {
		const discordmesembed = new discord.MessageEmbed()
			.setColor('#E7A700')
			.setTitle('DISCORD MANUAL')
			.setDescription(`How to use the interface?\nIt's simple.\n${message.guild.name} is called the server.\nThe names you see with the # is called the text channel and the one with the speaker is called the voice channel.\n\nFor a better understanding see this [video](https://youtu.be/dvHgASyhPSY)`);
		message.channel.send(discordmesembed);
	}
};