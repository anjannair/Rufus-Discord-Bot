const discord = require('discord.js');
const fetch = require('node-fetch');
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    const req = await fetch('https://catfact.ninja/fact');
    const data = await req.json();
    const embed = new discord.MessageEmbed()
      .setTitle("😺 A random cat fact 🐈")
      .setColor("0x00ff00")
      .setDescription(data['fact']);

    await message.reply(embed);
};
module.exports.help = {
    name: "catfact",
    aliases: []
};