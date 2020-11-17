const discord = require("discord.js");
const request = require('node-superfetch');
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
  const { body } = await request.get('https://uselessfacts.jsph.pl/random.json?language=en');
  return message.channel.send(`Fact: ${body.text}`);
};

module.exports.help = {
  name: "randomfact",
  aliases: ['rfact']
};
