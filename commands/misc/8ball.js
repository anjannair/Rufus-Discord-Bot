const discord = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: '8ball',
      group: 'misc',
      memberName: '8ball',
      description: 'Predict yes or no questions using 8ball',
      guildOnly: true,
      args: [{
        key: 'question',
        prompt: 'Ask 8ball your question',
        type: 'string',
      }]
    });
  }

  async run(message, { question }) {

    const responses = [
      "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.",
      "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.",
      "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.",
      "Very doubtful.",
    ];
    const number = Math.floor(Math.random() * responses.length);
    const embed = new discord.MessageEmbed()
      .setColor('#E7A700')
      .setTitle("8ball's prediction")
      .addField("Question: ", question)
      .addField("Answer: ", responses[number]);
    message.channel.send(embed);
  }
};