const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'rule',
      aliases: ['r', 'rulesetup'],
      group: 'admin',
      memberName: 'rule',
      description: 'Set up default rules for your server',
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      args: [{
        key: 'channel',
        prompt: 'Which channel do you want to send it to?',
        type: 'channel',
      }]
    });
  }

  async run(message,{channel}) {

    const emote = '📍';
    var chnl = channel;
        const default_rules=`${emote}\`1\`\nNo spamming, trolling or advertising. Lets build a healthy server and have a blast!\n${emote}\`2\`\nNo NSFW (18+) content to be shared. A direct ban will be awarded.\n${emote}\`3\`\nDo not direct message anyone unless you already know them personally\n${emote}\`4\`\nAbusing is allowed but stay in your limits\n${emote}\`5\`\nLast but not the least, be respectful of others! This includes but not limited to, refrain from being toxic, using hate speech, racism and sexual harassment.`;
        const embs = new discord.MessageEmbed()
            .setTitle(`${chnl.guild.name}'s Rules`)
            .setColor("#E7A700")
            .setDescription(default_rules)
            .setTimestamp()
            .setFooter("Sincerely, Your Admin","https://emoji.gg/assets/emoji/9192_random_tick.png");
        this.client.channels.cache.get(chnl.id).send(embs);
  }
};