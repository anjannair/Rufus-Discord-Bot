const discord = require("discord.js");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You donot have the permissison to ban someone.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('My role does not have \`BAN_MESSAGES\` permission.');
    let reason = args.slice(1).join(" ");
    let userID = args[0]
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('You must someone to unban. \`.unban ID reason\`');
    if (isNaN(args[0])) return message.channel.send('The ID stated is not a number. \`.unban ID reason\`');
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send('This server does not have anyone banned');
      let bUser = bans.find(b => b.user.id == userID);
      if (!bUser) return message.channel.send('The user ID stated is not banned.');
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.send('Something went wrong unbanning the id.');
      }).then(() => {
        message.channel.send(`Succesfully Unbanned ${args[0]}`);
      });

};

/***
 * Exports the ban command to the help object
 */
module.exports.help = {
	name: "unban",
	aliases: []
};
