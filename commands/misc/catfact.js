const discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'catfact',
      group: 'misc',
      memberName: 'catfact',
      description: 'Get cat facts!',
      guildOnly: true,
    });
  }

  async run(message) {
    const req = await fetch('https://catfact.ninja/fact');
    // Parse the request's JSON body:
    const data = await req.json();
    // Reply to the command with the random cat fact. It's very important we call `await` here,
    // as this will keep the command handler running until the message is sent. You can also reply
    // with rich embeds, to make your message replies look awesome!
    const embed = new discord.MessageEmbed()
      .setTitle("😺 A random cat fact 🐈")
      .setColor("0x00ff00")
      .setDescription(data['fact']);

    await message.reply(embed);
  }
};