const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    try {
        message.channel.messages.fetch().then(messages => {
            const botMessages = messages.filter(msg => msg.author.bot);
            message.channel.bulkDelete(botMessages);
        });
    } catch (err) {
        return;
    }
    message.delete();
};
module.exports.help = {
    name: "bprune",
    aliases: ['bclear', 'bclean']
};
