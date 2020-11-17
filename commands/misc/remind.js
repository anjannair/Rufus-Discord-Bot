const discord = require("discord.js");

/*One issue here is if this is on it will not stop unless
the bot is restarted. This can be applied for probably reminding 
people to drink water*/


//You can clear an interval with another command or if this command is run again in the same guild it is cleared
//Check docs for clearInterval

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    var interval = setInterval(function () {
        message.channel.send("@everyone Hi").catch(console.error); // add error handling here
    }, 1 * 600000);
};

module.exports.help = {
    name: "remind",
    aliases: []
};