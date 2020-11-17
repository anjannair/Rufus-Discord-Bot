const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
	constructor(client) {
		super(client, {
			name: 'dev',
			group: 'misc',
			memberName: 'dev',
			description: 'Get to know the developer',
			guildOnly: true,
		});
	}

	async run(message) {
		const devembed = new discord.MessageEmbed()
			.setColor('#E7A700')
			.setTitle('BOT DEVELOPER')
			.setDescription(`
			This bot has been developed by agentmurphy#6969
	    	
			If you have suggestions do ping him!

			`);
		message.channel.send(devembed);
	}
};