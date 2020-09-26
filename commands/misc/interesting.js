const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {

	let urls = ["https://meme-api.herokuapp.com/gimme/mildlyinteresting","https://meme-api.herokuapp.com/gimme/interestingasfuck","https://meme-api.herokuapp.com/gimme/damnthatsinteresting"];

	let subreddit = urls[Math.floor(Math.random() * urls.length)];
	return request(subreddit, (err, response, body) => {
			if (err) throw(err);
			var data = JSON.parse(body);

			let inter = new Discord.MessageEmbed()
			.setColor('#E7A700')
			.setTitle(data.title)
			.setImage(data.url);

			message.channel.send(inter).catch(console.error);			
		});
};

module.exports.help = {
	name: "interesting",
    aliases: []
};