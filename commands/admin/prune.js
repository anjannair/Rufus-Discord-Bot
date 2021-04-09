const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'prune',
			aliases: ['clear'],
			group: 'admin',
			memberName: 'prune',
			description: 'Clears the number of messages mentioned',
			guildOnly: true,
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			args: [{
				key: 'amount',
				prompt: 'How many messages do you want to clear? (Should be less than 99)',
				type: 'integer',
				validate: amount => amount < 99,
			}]
		});
	}

	async run(message, { amount }) {
		amount += 1;
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to clear messages in this channel!');
		});
		message.channel.send(`_${amount - 1} messages were deleted from the channel!_`)
			.then((msg) => {
				if (msg) msg.delete({ timeout: 3000 });
			});
	}
};
