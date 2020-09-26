const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var a = message.id;
	if (message.member.hasPermission('MANAGE_ROLES')) {
        var mentionedRole = message.mentions.roles.first();
        var roleMember = message.mentions.members.first();
        message.channel.bulkDelete(1, true).catch(err =>
            {
            console.error(err);
            });
        if (!mentionedRole) return message.reply(`I am unable to find role: ${mentionedRole}`);
        message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
       roleMember.roles.add(mentionedRole).then(message.channel.send("Role successfully added.")).catch(err =>{
           message.channel.send("An error occured. This may happen when I dont have the appropriate permissions");
       });
    } else {
        message.reply('You do not have permission to do this');
    }
};

module.exports.help = {
    name: "addrole",
    aliases: ['ar']
};
