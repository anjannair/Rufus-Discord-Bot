const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'fdisconnect',
      aliases: ['fdisc', 'fdct'],
      group: 'admin',
      memberName: 'fdisconnect',
      description: 'Disconnects mentioned user in the voice channel',
      guildOnly: true,
      clientPermissions: ['MOVE_MEMBERS'],
      userPermissions: ['MOVE_MEMBERS'],
      args: [
        {
          key: 'user',
          prompt: 'Whom do you want to disconnect?',
          type: 'member',
        }
      ]
    });
  }

  async run(message, { user }) {
    var a = message.id;
    if (!message.member.voice.channel) return message.reply("You are not in a voice channel!");
    //console.log(user)
    let channel = message.member.voice.channel;
    var found = 0;
    //console.log(channel.members)
    for (let memberi of channel.members) {
      if (memberi[1] == user) {
        found++;
      }
    }
    if (found == 1) {
      await user.voice.kick();
      message.channel.send(`${user} disconnected by ${message.author}`);
      message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    }
    else {
      message.channel.send("You are not in the same channel!!");
      message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    }
  }
};