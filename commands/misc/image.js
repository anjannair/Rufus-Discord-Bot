/* eslint-disable no-undef */
const discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");
const { Command } = require('discord.js-commando');

module.exports = class rufus extends Command {
    constructor(client) {
        super(client, {
            name: 'img',
            group: 'misc',
            memberName: 'img',
            description: 'Get the image you searched for!',
            guildOnly: true,
            args: [{
                key: 'query',
                prompt: 'Which image do you want?',
                type: 'string',
            }],
            clientPermissions: ['ATTACH_FILES'],
            userPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, { query }) {
        var search = query;
        var options = {
            url: "https://www.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        request(options, function (error, response, responseBody) {
            if (error) {
                // handle error
                return;
            }

            /* Extract image URLs from responseBody using cheerio */

            const $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

            // In this search engine they use ".image a.link" as their css selector for image links
            var links = $(".image a.link");

            // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
            // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            // console.log(urls);
            if (!urls.length) {
                // Handle no results
                return;
            }

            // Send result
            var size = urls.length;
            if (size > 5) {
                var end = Math.floor(Math.random() * 5);
                message.channel.send(urls[end]);
            }
            else {
                var end2 = Math.floor(Math.random() * 5);
                message.channel.send(urls[end]);
            }
        });
    }
};