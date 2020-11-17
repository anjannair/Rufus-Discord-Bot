const discord = require("discord.js");
const request = require('node-superfetch');
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
  const { body } = await request.get('https://thisartworkdoesnotexist.com/');
  return message.channel.send('AI-Generated Artwork', { files: [{ attachment: body, name: 'ai-artwork.jpg' }] });
};

module.exports.help = {
  name: "rimage",
  aliases: ['randomimage']
};
