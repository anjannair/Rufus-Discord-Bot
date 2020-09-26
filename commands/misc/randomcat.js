const discord = require("discord.js");
const request = require('node-superfetch');
module.exports.run = async (bot, message, args) => {
    const { body } = await request.get('https://thiscatdoesnotexist.com/');
	return message.channel.send('AI-Generated Cat', { files: [{ attachment: body, name: 'ai-artwork.jpg' }] });
  };
  
  module.exports.help = {
    name: "cat",
    aliases: ['randomcat']
  };
  