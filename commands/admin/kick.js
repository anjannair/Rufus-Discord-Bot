const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
	var a = message.id;
	if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("You do not have the permission to do that!");

	var useri = message.mentions.members.first();

	if (!useri) return message.reply("You did not mention anyone");

	var reas = args.splice(1).join(' ');
	if (!reas) {
		reas = "Well, no reason given"; //you can make reason compulsory by returning a message asking the author to give a reason
	}

	if (useri.hasPermission('ADMINISTRATOR')) return message.reply("Sadly you cannot kick an admin");
	var jad = "";
	var embs = new discord.MessageEmbed()
		.setColor('#E7A700') //hex color
		.setTitle(`KICKED`)
		.addField('User: ', useri, true)
		.addField('By: ', message.author, true)
		.addField('Reason: ', reas);
	await message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));

	if (!useri.user.bot) {
		await useri.send(`You were kicked from ${useri.guild} for: ${reas}`);
	}
	await useri.kick().catch(err => {
		jad = err;
	});
	if (!jad) {
		return message.channel.send(embs);
	}
	else {
		return message.channel.send("An error occured. This may happen when I don't have the neccessary permissions!!\n\nTip: Bots have complicated permissions. Kick them manually.");
	}
};

module.exports.help = {
	name: "kick",
	aliases: ['remove']
};
