const discord = require("discord.js");
//the youtube video was meant for indians. You can accordingly change it your liking
module.exports.run = async (bot, message, args) => {
	const discordmesembed = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle('DISCORD MANUAL')
		.setDescription(`How to use the interface?\nIt's simple.\nThe names you see with the # is called the text channel and the one with the speaker is called the voice channel.\n\nFor a better understanding see this [video](https://youtu.be/dvHgASyhPSY)`);	    
		message.channel.send(discordmesembed);
};

module.exports.help = {
	name: "discord",
    aliases: ['aboutdiscord']
};