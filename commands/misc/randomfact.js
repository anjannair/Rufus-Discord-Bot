const discord = require("discord.js");
const request = require('node-superfetch');
module.exports.run = async (bot, message, args) => {
    const { body } = await request.get('https://uselessfacts.jsph.pl/random.json?language=en');
	return message.channel.send(`Fact: ${body.text}`);
  };
  
  module.exports.help = {
    name: "randomfact",
    aliases: ['rfact']
  };
  