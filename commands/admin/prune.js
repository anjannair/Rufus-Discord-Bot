const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You do not have the permissions to do that");
	
	const amount = parseInt(args[0]) + 1;
	if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} 
	else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}
    message.channel.bulkDelete(amount, true).catch(err =>
	{
	console.error(err);
	message.channel.send('There was an error trying to clear messages in this channel!');
	});
	message.channel.send(`_${amount-1} messages were deleted from the channel!_`)
	.then((msg)=> {
if (msg) msg.delete({ timeout: 10000 });
	});
};
module.exports.help = {
	name: "prune",
    aliases: ['clear','clean']
};
