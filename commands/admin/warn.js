const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'warn',
      group: 'admin',
      memberName: 'warn',
      description: 'Warns the user in the server',
      guildOnly: true,
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      args: [{
        key: 'user',
        prompt: 'Whom do you wanna warn?',
        type: 'member',
      },
      {
        key: 'reason',
        prompt: 'What is the reason of the warn?',
        type: 'string',
      }
      ]
    });
  }

  async run(message, { user, reason }) {
    var a = message.id;
    if (user.hasPermission('ADMINISTRATOR')) return message.reply("Bruh you are warning an admin! Get a life...");
    var reas = reason;

    var embs = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setFooter(`${message.author.tag} warned ${user.user.tag}\n\nReason: ${reas}`, user.user.avatarURL({ dynamic: true }));
    user.send(`__**You have been warned on ${message.guild.name}**__\n\nReason: ${reas}`);

    message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    message.channel.send(embs);
  }
};