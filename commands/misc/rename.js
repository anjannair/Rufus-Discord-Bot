const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'rename',
      group: 'misc',
      memberName: 'rename',
      aliases: ['setnick', 'nick'],
      description: 'Rename yourself using this command',
      guildOnly: true,
      clientPermissions: ['CHANGE_NICKNAME', 'MANAGE_NICKNAMES'],
      userPermissions: ['CHANGE_NICKNAME'],
      args: [{
        key: 'nickname',
        prompt: 'What would you like to name yourself?',
        type: 'string',
      }]
    });
  }

  async run(message,{nickname}) {
    var a = message.id;
    message.member.setNickname(nickname).catch(err => {
      return message.reply("Sorry cannot do that at this time");
    });
    await message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
  }
};