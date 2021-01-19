const discord = require("discord.js");
const fetch = require("node-fetch");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            group: 'misc',
            memberName: 'xkcd',
            aliases: ['comic', 'comics'],
            description: 'Random XKCD comics!',
            guildOnly: true,
            clientPermissions: ['ATTACH_FILES'],
            userPermissions: ['ATTACH_FILES'],
        });
    }

    async run(message) {
        const a = Math.floor(Math.random() * 2350);
        const url = "https://xkcd.com/" + a + "/info.0.json";

        let datafetcher = url;
        let response = await fetch(datafetcher);
        let data = await response.json();

        let xkcd = new discord.MessageEmbed()
            .setTitle(data.title)
            .setImage(data.img)
            .setFooter("Alt: " + data.alt);
        message.channel.send(xkcd).catch(err => {
            console.log(err);
        });
    }
};