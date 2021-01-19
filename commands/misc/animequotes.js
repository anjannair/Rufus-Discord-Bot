const discord = require('discord.js');
const fetch = require('node-fetch');
const Quotes = require('anime-quotes-api');
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
  constructor(client) {
    super(client, {
      name: 'anime',
      group: 'misc',
      memberName: 'anime',
      description: 'Get random anime quotes!',
      guildOnly: true,
    });
  }

  async run(message) {
    var quote = new Quotes();
    var get_quotes = await quote.quotes();
    let title;
    let quotes;
    let image;
    for(var i=0;i<get_quotes.length;i++){
      if(get_quotes[i].success == true){
        title = get_quotes[i].title;
        quotes = get_quotes[i].quote;
        image = get_quotes[i].image;
        break;
      }
    }
    const embed = new discord.MessageEmbed()
      .setTitle(title)
      .setColor("0x00ff00")
      .setDescription(`\``+quotes+`\``)
      .setThumbnail(image);

    await message.reply(embed);
  }
};