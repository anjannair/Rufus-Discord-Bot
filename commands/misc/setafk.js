const discord = require("discord.js");
require('dotenv').config();
var memjs = require('memjs');

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */

var store = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
    username: process.env.MEMCACHEDCLOUD_USERNAME,
    password: process.env.MEMCACHEDCLOUD_PASSWORD
});

module.exports = async (bot, message, args) => {
    if (!args) return message.reply("You need to set it as `off` or `on`");
    if (args.toLowerCase() != "on" || args.toLowerCase() != "off") return ("You have to set it as `off` or `on`");
    store.set(message.author.id, args, function (err, val) {
    });
    message.reply("SET AS " + args.toUpperCase()).then(msg => msg.delete({ timeout: 10000 }));
    message.channel.messages.fetch(message.id).then(msg => msg.delete({ timeout: 10000 }));
};

module.exports.help = {
    name: "setafk",
    aliases: []
};