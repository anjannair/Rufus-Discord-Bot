const config = require('../config.json');
const index = require('../index');
const bot = index.client;


module.exports = async message => {
  if (message.content.toLowerCase() == "+clear" || message.content.toLowerCase() == "+stop") {
    message.channel.send(`Don't forget to use \`+leave\` when you're done listening so that the bot leaves the voice channel. Saves its resources!`);
  }
  if (message.content.includes("https://discord.gg") || message.content.includes("http://discord.gg" || message.content.includes("https://discord.com/invite/")) || message.content.includes("http://discord.com/invite/") || message.content.includes("discord.gg") || message.content.includes("discord.com/invite/")) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.delete({ timeout: 100 });
      message.reply("Only Admins are authorized to send invite links");
      message.author.send("Only admins are authorized to send invite links!!");
    }
  }
};
module.exports.help = {
  event: 'message'
};
