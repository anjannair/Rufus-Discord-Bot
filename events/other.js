const config = require('../config.json');
const discord = require("discord.js");
const { Command } = require('discord.js-commando');
var memjs = require('memjs');
var store = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
  username: process.env.MEMCACHEDCLOUD_USERNAME,
  password: process.env.MEMCACHEDCLOUD_PASSWORD
});

module.exports = async message => {

  let check;
  try {
    if (message.content.toLowerCase().includes("https://discord.gg") || message.content.toLowerCase().includes("http://discord.gg" || message.content.toLowerCase().includes("https://discord.com/invite/")) || message.content.toLowerCase().includes("http://discord.com/invite/") || message.content.toLowerCase().includes("discord.gg") || message.content.toLowerCase().includes("discord.com/invite/")) {
      if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.delete({ timeout: 10 });
        message.reply("Only Admins are authorized to send invite links").then(msg => msg.delete({ timeout: 10000 }));
        message.author.send("Only admins are authorized to send invite links!!");
      }
    }
    if (message.mentions.members.first()) {
      if (message.author.bot) return;
      store.get(message.mentions.members.first().id, async function (err, value, key) {
        if (value != null) {
          if (value.toString().toLowerCase() == "on") {
            const embed = new discord.MessageEmbed()
              .setTitle("New message when you were AFK")
              .setColor('#228B22')
              .setDescription(message.content)
              .setFooter(`Message from ${message.author.tag} in ${message.guild.name}`, `${message.author.avatarURL({ dynamic: true })}`);

            await message.mentions.members.first().send(embed).catch(err => {
              check = err;
              return message.reply(message.mentions.members.first().user.tag + " is currently AFK!\n\nError: Message could not be forwarded to him").then(msg => msg.delete({ timeout: 10000 }));
            });
            if (!check) {
              message.reply(message.mentions.members.first().user.tag + " is currently AFK!\nBut your message has been forwarded to him").then(msg => msg.delete({ timeout: 10000 }));
            }
          }
          else {
            return;
          }
        }
      });
    }
  }catch(err){
    return err;
  }
};
module.exports.help = {
	event: 'message'
};