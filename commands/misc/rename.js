const discord = require("discord.js");

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */

module.exports.run = async (bot, message, args) => {
  var a = message.id;
  var nickname = args.join(' ');
  if(!message.member.hasPermission('CHANGE_NICKNAME')) return message.reply("You do not have the permission to do that!");
  message.member.setNickname(nickname).catch(err =>{
    return message.reply("Sorry cannot do that at this time");
  }); 
  await message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
};

module.exports.help = {
  name: "rename",
  aliases: ['setnick','nick']
};
