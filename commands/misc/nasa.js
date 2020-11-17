const Discord = require("discord.js");
const fetch = require("node-fetch");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'nasa',
            group: 'misc',
            memberName: 'nasa',
            description: 'Search the NASA website on Discord',
            guildOnly: true,
            args: [{
                key: 'query',
                prompt: 'What do you want to search?',
                type: 'string',
            }]
        });
    }

    async run(message, { query }) {
        let term = query;
        let response = await fetch(`https://images-api.nasa.gov/search?q=${term}`);
        let data = await response.json();
        if (!data.collection.items[0].data[0].description) {
            let msg = await message.channel.send(`Couldn't find any results for ${term}`);
            msg.delete({ timeout: 10000 });
            return message.react('❌');
        }
        let nasasearchembed = new Discord.MessageEmbed()
            .setColor('#00ffbb')
            .setTitle(data.collection.items[0].data[0].title)
            .setDescription(data.collection.items[0].data[0].description)
            .setImage(data.collection.items[0].links[0].href.split(' ').join('%20'))
            .setTimestamp();
        await message.channel.send(nasasearchembed);
        message.react('✔️');
    }
};