const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'unlock',
			group: 'admin',
			memberName: 'unlock',
			description: 'Unlocks a channel',
			guildOnly: true,
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(message) {
		message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
		message.reply("Unlocked channel");
	}
};