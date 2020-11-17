/* eslint-disable no-undef */
const discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {
    var search = args.join(' ');
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

        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");

        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
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
            var end2 = Math.floor(Math.random() * 2);
            message.channel.send(urls[end2]);
        }
    });
};

module.exports.help = {
    name: "img",
    aliases: ['image']
};