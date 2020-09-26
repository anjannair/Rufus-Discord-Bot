const discord = require("discord.js");
//dev of the bot
module.exports.run = async (bot, message, args) => {
	const devembed = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle('BOT DEVELOPER')
		.setDescription(`
			This bot has been developed by <@414992506665828364>
	    	
			If you have suggestions do ping him!

			`);
	message.channel.send(devembed);
};

module.exports.help = {
	name: "dev",
    aliases: ['developer']
};