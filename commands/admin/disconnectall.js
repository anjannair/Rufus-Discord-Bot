const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'disconnect',
      aliases: ['disc', 'dct'],
      group: 'admin',
      memberName: 'disconnect',
      description: 'Disconnects all users in the voice channel',
      guildOnly: true,
      clientPermissions: ['MOVE_MEMBERS'],
      userPermissions: ['MOVE_MEMBERS'],
    });
  }

  async run(message) {
    var a = message.id;
    if (!message.member.voice.channel) return message.reply("You are not in a voice channel!");
    let channel = message.member.voice.channel;
    for (let memberi of channel.members) {
      await memberi[1].voice.kick();
    }
    await message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
  }
};
