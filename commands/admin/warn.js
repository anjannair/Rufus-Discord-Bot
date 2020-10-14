const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You do not have the permission to do that!");

var user = message.mentions.users.first();
var a = message.id;

if(!user) return message.reply("You did not mention anyone");

var reas = args.splice(1).join('');
if(!reas) return message.reply("You need to give a reason");

var embs = new discord.MessageEmbed()
    .setColor('#FF0000') //hex color
    .setTitle(`WARNED`)
    .addField('User: ',user,true)
    .addField('By: ',message.author,true)
    .addField('Reason: ',reas);
  
  message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
  message.channel.send(embs);
};


module.exports.help = {
  name: "warn",
  aliases: []
};
