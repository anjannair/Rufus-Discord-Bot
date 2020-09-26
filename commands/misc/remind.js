const discord = require("discord.js");

/*One issue here is if this is on it will not stop unless
the bot is restarted. This can be applied for probably reminding 
people to drink water*/

module.exports.run = async (bot, message, args) => {
	var interval = setInterval (function () {
            message.channel.send("@everyone Hi").catch(console.error); // add error handling here
        }, 1 * 600000); 
};

module.exports.help = {
	name: "remind",
    aliases: []
};