const discord = require("discord.js");
const request = require('node-superfetch');
module.exports.run = async (bot, message, args) => {
    const { body } = await request.get('https://thisartworkdoesnotexist.com/');
	return message.channel.send('AI-Generated Artwork', { files: [{ attachment: body, name: 'ai-artwork.jpg' }] });
  };
  
  module.exports.help = {
    name: "rimage",
    aliases: ['randomimage']
  };
  