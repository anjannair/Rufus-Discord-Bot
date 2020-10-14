const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    var neb = args.join('_');
    if(!neb) return message.channel.send("Input something to search for!");
    message.channel.send("https://among-us-wiki.fandom.com/wiki/"+neb);
	
};

module.exports.help = {
	name: "amonguswiki",
    aliases: ['auwiki','amwiki']
};