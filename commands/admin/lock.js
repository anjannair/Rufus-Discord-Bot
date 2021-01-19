const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'lock',
			group: 'admin',
			memberName: 'lock',
			description: 'Locks a channel',
			guildOnly: true,
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(message) {
		message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
		message.reply("Locked channel");
	}
};