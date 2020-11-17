const discord = require("discord.js");

//welcome was the first command I tried so I let it stay as a memory
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
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