/* eslint-disable no-useless-escape */
const Discord = require("discord.js");


/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You cannot use this command");
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I do not have the permission \`MANAGE_CHANNELS\`");
    
    let reason = args.join(" ");
    const nukeChannel = message.channel;

    if (!reason) reason = "No reason given.";

    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason).catch(err => console.log(err));


};

/***
 * Exports the nukechannel command to the help object
 */

module.exports.help = {
    name: "nukechannel",
    aliases: ['nc']
};
