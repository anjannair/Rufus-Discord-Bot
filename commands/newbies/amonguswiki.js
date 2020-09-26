const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var neb = args.join('_');
    if(!neb) return message.channel.send("Input something to search for!");
    message.channel.send("https://among-us-wiki.fandom.com/wiki/"+neb);
	
};

module.exports.help = {
	name: "amonguswiki",
    aliases: ['auwiki','amwiki']
};