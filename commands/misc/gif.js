const discord = require("discord.js");
const fetch = require("node-fetch");
require('dotenv').config();
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'gif',
      group: 'misc',
      memberName: 'gif',
      description: 'Get GIFs from Tenor',
      guildOnly: true,
      args: [{
        key: 'query',
        prompt: 'Which GIF do you want?',
        type: 'string',
      }],
      clientPermissions: ['ATTACH_FILES'],
      userPermissions: ['ATTACH_FILES'],
    });
  }

  async run(message, { query }) {
    fetch(`https://api.tenor.com/v1/search?q=${query}&key=${process.env.TENOR}&contentfilter=low`)
      .then(res => res.json())
      .then(json => message.channel.send(json.results[0].url))
      .catch(e => {
        message.channel.send('Failed to find a gif that matched your query');
        // console.error(e);
        return;
      });
  }
};