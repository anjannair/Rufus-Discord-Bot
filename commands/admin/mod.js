//Contains only the important help commands. You can add more later

const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
	const tutembed = new discord.MessageEmbed()
		.setColor('#E7A700') //hex color
		.setTitle('MODERATOR')
		.setDescription(`
		The default prefix for this bot is * 
		\`\`\`*prune NUMBER\`\`\` Users having appropriate permissions can clear messages
		\`\`\`*bprune\`\`\` Clears all the bot messages only
		\`\`\`*kick @USER\`\`\` Users with appropriate permissions can kick
		\`\`\`*ban @USER\`\`\` Users with appropriate permissions can ban
		\`\`\`*warn @USER\`\`\` Warn someone using the bot
		\`\`\`*mute\`\`\` Mutes everyone on the server
		\`\`\`*unmute\`\`\` Unmutes everyone if you used the mute command
		\`\`\`*fmute @USER\`\`\` Force mutes the user
		\`\`\`*funmute @USER\`\`\` Unmutes the user if you used the command above
		\`\`\`*deafen\`\`\` Deafens everyone in the voice channel
		\`\`\`*undeafen\`\`\` Undeafens everyone in the voice channel
		\`\`\`*transcript\`\`\` Gets the transcript of the channel messages (still in beta)\n\n
		Same for deafening and undeafening a user. Just mention them eg: *deafen @USER`);
	message.channel.send(tutembed);
};

module.exports.help = {
	name: "mod",
	aliases: ['admin']
};