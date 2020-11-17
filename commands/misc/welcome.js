const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'welcome',
			group: 'misc',
			memberName: 'welcome',
			description: 'Gives you a welcome message for no reason',
			guildOnly: true,
		});
	}

	async run(message) {

		return message.reply(`
		Welcome to the ${message.guild.name} server

		Total number of members are: ${message.guild.memberCount}

		Server region: ${message.guild.region}
		
		`);
	}
};