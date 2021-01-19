const discord = require("discord.js");
const { Command } = require('discord.js-commando');

const gifs = ["https://media.tenor.com/images/2787aa841c08a878f6587f3fafc2d33e/tenor.gif", "https://media1.tenor.com/images/5ce5df9f69751134c5bf45b65c0f7d00/tenor.gif?itemid=13565963", "https://media1.tenor.com/images/f97cc2229e49cf8237efcea5b8ef9812/tenor.gif?itemid=14977067", "https://media.tenor.com/images/d90712f645f16d8a3f6b04fc1de9aa66/tenor.gif", "https://media1.tenor.com/images/9c780c2f3de3f736db00ea61f4ad6c18/tenor.gif?itemid=10940769"];

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Kicks a user from the server',
			guildOnly: true,
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
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

		var useri = user;

		let jad;
		var embs = new discord.MessageEmbed()
			.setColor('#E7A700')
			.setFooter(`${user.user.tag} was kicked by ${message.author.tag}\n\nReason: ${reason}`, `${message.author.avatarURL({ dynamic: true })}`);
		var embs1 = new discord.MessageEmbed()
			.setColor('#E7A700')
			.setFooter(`You were kicked from ${message.guild.name} for reason: ${reason}`, `${message.author.avatarURL({ dynamic: true })}`);
		if (!useri.user.bot) {
			await useri.send(embs1);
		}
		await useri.kick(reason+` , By: ${message.author.tag}`).catch(err => {
			jad = err;
		});
		await message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
		if (!jad) {
			await message.channel.send(embs);
			return message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
		}
		else {
			return message.channel.send("An error occured. This may happen when my heirachy is lower\nHandy Link: https://discordcaptcha.xyz/hc/doku.php?id=captchabot:role_hierarchy");
		}
	}
};