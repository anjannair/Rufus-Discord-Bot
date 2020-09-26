const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	const tutembed = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle('GAMES')
		.setDescription(`
		The default prefix for this bot is * 
		\`\`\`*8ball <question>\`\`\` Ask 8ball your questions!
		\`\`\`*ttt\`\`\` Play tictactoe with the bot or with friends by tagging them! If you win against the bot you have grand prize waiting!`);	//this is in the index.js file
		message.channel.send(tutembed);
};

module.exports.help = {
	name: "games",
    aliases: ['fun']
};