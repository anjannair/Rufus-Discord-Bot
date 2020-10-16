const discord = require("discord.js");
var memjs = require('memjs');
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You do not have the permissions to do that");
    if(!args) return message.reply("You have to input a perfix");
    var finprefix = args.join('').trim();
	var client = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
        username: process.env.MEMCACHEDCLOUD_USERNAME,
        password: process.env.MEMCACHEDCLOUD_PASSWORD
      });
    client.set(message.guild.id, finprefix, function(err, val) {
 });
 return message.reply(`\nYour prefix has been changed to: **${finprefix}**`);
    
};
module.exports.help = {
	name: "prefix",
    aliases: []
};
