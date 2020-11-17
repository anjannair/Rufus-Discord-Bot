const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'deafen',
      aliases: ['de', 'deaf'],
      group: 'admin',
      memberName: 'deafen',
      description: 'Deafens all users in the voice channel',
      guildOnly: true,
      clientPermissions: ['DEAFEN_MEMBERS'],
      userPermissions: ['DEAFEN_MEMBERS'],
    });
  }

  async run(message) {
    var a = message.id;
    let b;
    if (!message.member.voice.channel) return message.reply("You are not in a voice channel!");
    let channel = message.member.voice.channel;
    for (let memberi of channel.members) {
      await memberi[1].voice.setDeaf(true);
    }
    message.channel.send("Deafened all!").then((msg) => {
      b = msg.id;
    });
    await message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    await message.channel.messages.fetch(b).then(msg => msg.delete({ timeout: 3000 }));
  }
};