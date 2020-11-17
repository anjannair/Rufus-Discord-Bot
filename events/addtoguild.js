/* eslint-disable no-useless-escape */
const discord = require("discord.js");

module.exports = async guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });
  //defaultChannel will be the channel object that the bot first finds permissions for
  let embed = new discord.MessageEmbed()
    .setTitle("Thank You For Adding Me")
    .setDescription('My default prefix is *\n\nFor more commands use \`*help\`\n\nFor all commands visit [here](http://anjancodes.me/rufusbot/commands.html)\n\nThis bot has been developed by agentmurphy#6969')
    .setTimestamp();
  defaultChannel.send(embed);
};
module.exports.help = {
  event: 'guildCreate'
};