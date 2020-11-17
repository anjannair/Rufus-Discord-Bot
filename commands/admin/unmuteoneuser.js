const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'funmute',
      aliases: ['funm', 'funmu'],
      group: 'admin',
      memberName: 'funmute',
      description: 'Unmutes mentioned user in the voice channel',
      guildOnly: true,
      clientPermissions: ['MUTE_MEMBERS'],
      userPermissions: ['MUTE_MEMBERS'],
      args: [{
        key: 'user',
        prompt: 'Whom do you wanna unmute?',
        type: 'member',
      }]
    });
  }

  async run(message, { user }) {
    var a = message.id;
    if (!message.member.voice.channel) return message.reply("You are not in a voice channel!");
    let channel = message.member.voice.channel;
    var found = 0;

    for (let memberi of channel.members) {
      if (memberi[1] == user) {
        found++;
      }
    }
    if (found == 1) {
      await user.voice.setMute(false);
      message.channel.send(`${user} unmuted by ${message.author}`);
      message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    }
    else {
      message.channel.send("You are not in the same channel!!");
      message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    }
  }
};