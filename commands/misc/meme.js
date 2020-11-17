const Discord = require("discord.js");
const request = require("request");
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
module.exports.run = async (bot, message, args) => {

	/*The commented code can be uncommented if you want to
	set an equal time interval memes sending bot*/

	//var interval = setInterval (function () {
	let urls = ["https://meme-api.herokuapp.com/gimme/dankmemes", "https://meme-api.herokuapp.com/gimme/wholesomememes", "https://meme-api.herokuapp.com/gimme/memes"];

	let subreddit = urls[Math.floor(Math.random() * urls.length)];
	return request(subreddit, (err, response, body) => {
		if (err) throw (err);
		var data = JSON.parse(body);

		let meme = new Discord.MessageEmbed()
			.setColor('#E7A700')
			.setTitle(data.title)
			.setImage(data.url);

		message.channel.send(meme).catch(console.error);
	});
	// }, 1 * 3600000);
};

module.exports.help = {
	name: "memes",
	aliases: ['meme']
};
