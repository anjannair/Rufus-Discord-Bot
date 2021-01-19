const discord = require("discord.js");
const { Command } = require('discord.js-commando');
const gifs = ["https://media.tenor.com/images/8c3f475a77bbfd45775cc8a2c76d3e18/tenor.gif", "https://media.tenor.com/images/cf14545eb4cca4533c51af41124b5028/tenor.gif", "https://media1.tenor.com/images/8271ab57eccd9de0850d0e277e2eabd0/tenor.gif", "https://media.tenor.com/images/70bc3704cd1e9e8eb196db8b5dba92d1/tenor.gif", "https://media.tenor.com/images/2665cc217c77ad710916dcdea56d8c73/tenor.gif", "https://media.tenor.com/images/86d6508b1a17c0339611a982ce3b954d/tenor.gif"];

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
				type: 'user',
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
			.setFooter(`${user.tag} was banned by ${message.author.tag}\n\nReason: ${reas}`, `${message.author.avatarURL({ dynamic: true })}`);

		var embs1 = new discord.MessageEmbed()
			.setColor('#E7A700')
			.setFooter(`You were banned from ${message.guild.name} for reason: ${reas}`, `${message.author.avatarURL({ dynamic: true })}`);
		message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
		if (message.guild.member(user.id)) {
			if (user.bot != true) {
				await user.send(embs1);
			}
		}
		await message.guild.members.ban(user.id, { reason: reas + `, By: ${message.author.tag}` }).catch(err => {
			jad = err;
		});
		if (!jad) {
			await message.channel.send(embs);
			return message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
		}
		else {
			console.log(jad);
			return message.channel.send("An error occured. This may happen when my heirachy is lower\nHandy Link: https://discordcaptcha.xyz/hc/doku.php?id=captchabot:role_hierarchy");
		}
	}
};