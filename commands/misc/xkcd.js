const discord = require("discord.js");
const request = require("request");

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */

module.exports.run = async (bot, message, args) => {
    const a = Math.floor(Math.random()*2350);
    const url = "https://xkcd.com/"+a+"/info.0.json";
    return request(url, (err, response, body) => {
        if (err) throw(err);
			var data = JSON.parse(body);

        let xkcd = new discord.MessageEmbed()
            .setTitle(data.title)
            .setImage(data.img)
            .setFooter("Alt: "+data.alt);
        message.channel.send(xkcd).catch(console.err);

    });
    
	
};

module.exports.help = {
	name: "xkcd",
    aliases: ['comic','comics','xkcds']
};