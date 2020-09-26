const discord = require("discord.js");

//welcome was the first command I tried so I let it stay as a memory

module.exports.run = async (bot, message, args) => {
	return message.channel.send(`
		Welcome to the ${message.guild.name} server

		Total number of members are: ${message.guild.memberCount}

		Server region: ${message.guild.region}
		
		`);
};

module.exports.help = {
	name: "welcome",
    aliases: ['hello']
};