const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      aliases: ['m', 'mu'],
      group: 'admin',
      memberName: 'mute',
      description: 'Mutes all users in the voice channel',
      guildOnly: true,
      clientPermissions: ['MUTE_MEMBERS'],
      userPermissions: ['MUTE_MEMBERS'],
    });
  }

  async run(message) {
    var a = message.id;
    let b;
    if(!message.member.voice.channel) return message.reply("You are not in a voice channel!");
    let channel = message.member.voice.channel;
    for (let memberi of channel.members){
      await memberi[1].voice.setMute(true);
    }
    message.channel.send("Muted! Enjoy your game!!").then((msg)=> {
     b = msg.id;
    });
    await message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
    await message.channel.messages.fetch(b).then(msg => msg.delete({ timeout: 3000 }));
  }
};
