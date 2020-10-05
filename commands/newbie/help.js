const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	
		const tutembed = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle('COMMAND PALETTE')
		.setDescription(`
			The default prefix for this bot is *
			\`\`\`*welcome\`\`\` Welcomes you for no reason and gives you stats of the server
			\`\`\`*memes\`\`\` Hot memes from reddit!
			\`\`\`*mod\`\`\` Moderation commands for admins
			\`\`\`*games\`\`\` Games for everyone!
			\`\`\`*dev\`\`\` Information of this developer
			\`\`\`*misc\`\`\` Miscellaneous commands

			For all commands visit http://anjancodes.me/rufusbot/commands.html`);

		message.channel.send(tutembed);
	
};

module.exports.help = {
	name: "help",
    aliases: ['tutorial']
};