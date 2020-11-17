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
        key:'reason',
        prompt:'What is the reason of the warn?',
        type:'string',
      }
    ]
    });
  }

  async run(message,{user,reason}) {
    var a = message.id;
    
    var reas = reason;
    var embs = new discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`WARNED`)
        .addField('User: ',user,true)
        .addField('By: ',message.author,true)
        .addField('Reason: ',reas);
      
      message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
      message.channel.send(embs);
  }
};