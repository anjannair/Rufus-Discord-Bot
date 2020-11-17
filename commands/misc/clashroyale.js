const discord = require("discord.js");
const fetch = require("node-fetch");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'clashroyale',
            group: 'misc',
            aliases: ['cr'],
            memberName: 'clashroyale',
            description: 'Get cat facts!',
            guildOnly: true,
            args: [{
                key: 'tag',
                prompt: 'What is your Clash Royale tag (without the hashtag)?',
                type: 'string',
            }]
        });
    }

    async run(message, { tag }) {
        var userid = tag; //userid without hash
        var headers = {
            'Authorization': 'Bearer ' + process.env.CR
        };
        let idfetcher = `https://proxy.royaleapi.dev/v1/players/%23${userid}`;
        let response = await fetch(idfetcher, { method: 'GET', headers: headers });
        let data = await response.json();
        console.log(data);
        let clan = "None";
        if (data.clan) {
            clan = data.clan.name;
        }

        const embed = new discord.MessageEmbed()
            .setColor('#c8ecc7')
            .setTitle(`Clash Royale stats of ${data.name}`)
            .addField('Experience Level: ', data.expLevel)
            .addField('Current Trophies: ', data.trophies)
            .addField('Best Trophies: ', data.bestTrophies)
            .addField(`Clan: `, clan)
            .addField('Total Donations: ', data.totalDonations)
            .addField('Current Favourite Card', data.currentFavouriteCard.name)
            .setThumbnail(data.currentFavouriteCard.iconUrls.medium);
        message.channel.send(embed);
    }
};