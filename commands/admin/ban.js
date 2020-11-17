const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
			description: 'Bans a user from the server',
			guildOnly: true,
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			args: [{
				key: 'user',
				prompt: 'Whom do you want to ban?',
				type: 'member',
			},
			{
				key: 'reason',
				prompt: 'What is the reason?',
				type: 'string',
			}
			]
		});
	}

	async run(message, { reason, user }) {
		var a = message.id;
		var reas = reason;
		let jad;

		var embs = new discord.MessageEmbed()
			.setColor('#E7A700')
			.setTitle(`BANNED`)
			.addField('User: ', user, true)
			.addField('By: ', message.author, true)
			.addField('Reason: ', reas);
		message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
		await user.send(`You were banned from ${user.guild} for: ${reas}`);
		await user.ban({ reason: reason }).catch(err => {
			jad = err;
		});
		if (!jad) {
			return message.channel.send(embs);
		}
		else {
			return message.channel.send("An error occured. This may happen when my heirachy is lower\nHandy Link: https://discordcaptcha.xyz/hc/doku.php?id=captchabot:role_hierarchy");
		}
	}
};