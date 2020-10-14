const discord = require("discord.js");

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
	const tutembed = new discord.MessageEmbed()
		.setColor('#E7A700')
		.setTitle('MISCELLANEOUS')
		.setDescription(`
		The default prefix for this bot is * 
		\`\`\`*dankbot\`\`\` Gives you the instructions to use Dank Memer Bot
		\`\`\`*rythm\`\`\` Gives you the instructions to use the music bot Rythm
		\`\`\`*discord\`\`\` Will give you a short intro on how to use discord and its features
		\`\`\`*urban <search term>\`\`\` You can search terms from the urban dictionary too!
		\`\`\`*catfact\`\`\` A random cat fact for ya'll
		\`\`\`*qrcode <link>\`\`\` Generate QR codes for your links in one command
		\`\`\`*fact\`\`\` Random facts on numbers
		\`\`\`*nasa <search term>\`\`\` Search NASA for space stuff!
		\`\`\`*img <search term>\`\`\` Search Images!
		\`\`\`*gif <search term\`\`\` Search GIFs!`);
	message.channel.send(tutembed);
};

module.exports.help = {
	name: "misc",
    aliases: ['others','other']
};