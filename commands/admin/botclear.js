const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'clean',
			group: 'admin',
			memberName: 'clean',
			description: 'Clears recent bot messages from the channel',
			guildOnly: true,
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}

	async run(message) {
		message.channel.messages.fetch().then(messages => {
			const botMessages = messages.filter(msg => msg.author.bot);
			message.channel.bulkDelete(botMessages);
		});
		message.delete();
	}
};
